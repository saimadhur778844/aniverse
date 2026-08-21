import mongoose from "mongoose";

import cashfree from "../config/cashfree.js";

import Order from "../models/Order.js";
import Product from "../models/Product.js";
import Coupon from "../models/Coupon.js";

import {
  sendOrderConfirmationEmail,
} from "./email/emailService.js";

/*
|--------------------------------------------------------------------------
| Verify & Finalize Payment
|--------------------------------------------------------------------------
|
| This is the ONLY function that should finalize a successful payment.
|
| It:
|
| 1. Verifies payment directly with Cashfree
| 2. Finds the Aniverse order
| 3. Prevents duplicate processing
| 4. Updates payment information
| 5. Deducts inventory
| 6. Consumes coupon
| 7. Confirms order
| 8. Sends confirmation email
|
|--------------------------------------------------------------------------
*/

export const verifyPayment = async (
  gatewayOrderId
) => {
  const session =
    await mongoose.startSession();

  session.startTransaction();

  try {
    /*
    |--------------------------------------------------------------------------
    | Validate gateway order ID
    |--------------------------------------------------------------------------
    */

    if (!gatewayOrderId) {
      throw new Error(
        "Cashfree order ID is required."
      );
    }

    /*
    |--------------------------------------------------------------------------
    | Ask Cashfree for the REAL payment status
    |--------------------------------------------------------------------------
    */

    const {
      data: payment,
    } = await cashfree.get(
      `/pg/orders/${gatewayOrderId}`
    );

    /*
    |--------------------------------------------------------------------------
    | Find Aniverse order
    |--------------------------------------------------------------------------
    */

    const order =
      await Order.findOne({
        "payment.gatewayOrderId":
          gatewayOrderId,
      }).session(session);

    if (!order) {
      throw new Error(
        "Aniverse order not found."
      );
    }

    /*
    |--------------------------------------------------------------------------
    | Already successfully processed
    |--------------------------------------------------------------------------
    */

    if (
      order.payment.status === "Paid" &&
      order.payment.inventoryProcessed
    ) {
      await session.commitTransaction();

      return order;
    }

    /*
    |--------------------------------------------------------------------------
    | Payment not completed
    |--------------------------------------------------------------------------
    */

    if (
      payment.order_status !== "PAID"
    ) {
      await session.commitTransaction();

      return order;
    }

    /*
    |--------------------------------------------------------------------------
    | Get Cashfree payment details
    |--------------------------------------------------------------------------
    */

    let gatewayPaymentId = "";
    let paymentMode = "";

    try {
      const {
        data: payments,
      } = await cashfree.get(
        `/pg/orders/${gatewayOrderId}/payments`
      );

      if (
        Array.isArray(payments) &&
        payments.length
      ) {
        const successfulPayment =
          payments.find(
            (item) =>
              item.payment_status ===
              "SUCCESS"
          );

        if (successfulPayment) {
          gatewayPaymentId =
            successfulPayment.cf_payment_id ??
            "";

          const method =
            successfulPayment.payment_method ??
            {};

          if (method.card) {
            paymentMode = `${method.card.card_type} (${method.card.card_network})`;
          } else if (method.upi) {
            paymentMode = "UPI";
          } else if (method.netbanking) {
            paymentMode = "Net Banking";
          } else if (method.wallet) {
            paymentMode = "Wallet";
          } else {
            paymentMode = "Unknown";
          }
        }
      }
    } catch (error) {
      console.error(
        "Unable to fetch Cashfree payment details:",
        error.message
      );
    }

    /*
    |--------------------------------------------------------------------------
    | Mark payment as paid
    |--------------------------------------------------------------------------
    */

    order.payment.status = "Paid";

    order.payment.gatewayOrderId =
      gatewayOrderId;

    order.payment.gatewayPaymentId =
      gatewayPaymentId;

    order.payment.paymentMode =
      paymentMode;

    order.payment.paidAt =
      order.payment.paidAt ??
      new Date();

    order.payment.verifiedAt =
      new Date();

/*
|--------------------------------------------------------------------------
| Convert reservation → sold inventory
|--------------------------------------------------------------------------
*/

if (
  !order.payment.inventoryProcessed
) {
  for (const item of order.items) {
    const product =
      await Product.findOneAndUpdate(
        {
          _id: item.product,

          reservedStock: {
            $gte: item.quantity,
          },

          stock: {
            $gte: item.quantity,
          },
        },
        {
          $inc: {
            stock:
              -item.quantity,

            reservedStock:
              -item.quantity,
          },

          $push: {
            stockHistory: {
              quantity:
                -item.quantity,

              type: "ORDER",

              reason:
                "Order payment completed",

              user:
                order.user ?? null,
            },
          },
        },
        {
          session,
          new: true,
        }
      );

    if (!product) {
      throw new Error(
        `Unable to finalize inventory for ${item.name}.`
      );
    }
  }

  order.payment.inventoryProcessed =
    true;

  order.inventoryReservationActive =
    false;

  order.reservationExpiresAt =
    null;
}

    /*
    |--------------------------------------------------------------------------
    | Consume coupon
    |--------------------------------------------------------------------------
    */

    if (
      order.coupon?.code &&
      !order.payment.couponProcessed
    ) {
      await Coupon.findOneAndUpdate(
        {
          code:
            order.coupon.code,
        },
        {
          $inc: {
            usedCount: 1,
          },
        },
        {
          session,
        }
      );

      order.payment.couponProcessed =
        true;
    }

    /*
    |--------------------------------------------------------------------------
    | Confirm order
    |--------------------------------------------------------------------------
    */

    order.orderStatus =
      "Confirmed";

    /*
    |--------------------------------------------------------------------------
    | Save order
    |--------------------------------------------------------------------------
    */

    await order.save({
      session,
    });

    /*
    |--------------------------------------------------------------------------
    | Commit transaction
    |--------------------------------------------------------------------------
    */

    await session.commitTransaction();

    /*
    |--------------------------------------------------------------------------
    | Send confirmation email
    |--------------------------------------------------------------------------
    |
    | Email failure must NOT roll back a successful payment.
    |
    */

    if (
      !order.payment.confirmationEmailSent
    ) {
      try {
        await sendOrderConfirmationEmail(
          order
        );

        await Order.findByIdAndUpdate(
          order._id,
          {
            $set: {
              "payment.confirmationEmailSent":
                true,
            },
          }
        );
      } catch (error) {
        console.error(
          "Order confirmation email failed:",
          error.message
        );
      }
    }

    return order;
  } catch (error) {
    await session.abortTransaction();

    throw error;
  } finally {
    session.endSession();
  }
};

/*
|--------------------------------------------------------------------------
| Retry Payment
|--------------------------------------------------------------------------
*/

export const retryPayment = async (
  orderId
) => {
  const order =
    await Order.findById(orderId);

  if (!order) {
    throw new Error(
      "Order not found."
    );
  }

  if (
    order.payment.status === "Paid"
  ) {
    throw new Error(
      "Order is already paid."
    );
  }

  if (
    order.orderStatus === "Confirmed"
  ) {
    throw new Error(
      "Order has already been confirmed."
    );
  }

  if (
    order.orderStatus === "Cancelled"
  ) {
    throw new Error(
      "Cancelled orders cannot be paid."
    );
  }

  return order;
};