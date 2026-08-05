import mongoose from "mongoose";

import cashfree from "../config/cashfree.js";

import Order from "../models/Order.js";
import Product from "../models/Product.js";
import Coupon from "../models/Coupon.js";

/*
|--------------------------------------------------------------------------
| Verify Payment
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
    | Verify Payment with Cashfree
    |--------------------------------------------------------------------------
    */

    const response =
      await cashfree.PGFetchOrder(
        gatewayOrderId
      );

    const payment =
      response.data;

    const order =
      await Order.findOne({
        "payment.gatewayOrderId":
          gatewayOrderId,
      }).session(session);

    if (!order) {
      throw new Error(
        "Order not found."
      );
    }

    /*
    |--------------------------------------------------------------------------
    | Duplicate Protection
    |--------------------------------------------------------------------------
    */

    if (
      order.payment.status ===
      "Paid"
    ) {
      await session.commitTransaction();

      return order;
    }

    /*
    |--------------------------------------------------------------------------
    | Payment Not Completed
    |--------------------------------------------------------------------------
    |
    | Keep the order pending.
    | Customer can retry payment.
    |
    */

    if (
      payment.order_status !==
      "PAID"
    ) {
      await session.commitTransaction();

      return order;
    }

    /*
    |--------------------------------------------------------------------------
    | Update Payment
    |--------------------------------------------------------------------------
    */

    /*
|--------------------------------------------------------------------------
| Payment Details
|--------------------------------------------------------------------------
*/

order.payment.status = "Paid";

/*
|--------------------------------------------------------------------------
| Save Cashfree Payment ID
|--------------------------------------------------------------------------
*/

let gatewayPaymentId = "";

try {
  const payments =
    await cashfree.PGOrderFetchPayments(
      gatewayOrderId
    );

  if (
    Array.isArray(payments.data) &&
    payments.data.length
  ) {
    const successfulPayment =
      payments.data.find(
        (p) =>
          p.payment_status ===
          "SUCCESS"
      );

    if (successfulPayment) {
      gatewayPaymentId =
        successfulPayment.cf_payment_id;
    }
  }
} catch (error) {
  console.log(
    "Unable to fetch Cashfree payment id."
  );
}

order.payment.gatewayPaymentId =
  gatewayPaymentId;

order.payment.paidAt =
  new Date();

order.orderStatus =
  "Confirmed";
    /*
    |--------------------------------------------------------------------------
    | Reduce Inventory
    |--------------------------------------------------------------------------
    */

    for (const item of order.items) {
      await Product.findByIdAndUpdate(
        item.product,
        {
          $inc: {
            stock:
              -item.quantity,
          },
        },
        {
          session,
        }
      );
    }

    /*
    |--------------------------------------------------------------------------
    | Consume Coupon
    |--------------------------------------------------------------------------
    */

    if (
      order.coupon?.code
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
    }

    /*
    |--------------------------------------------------------------------------
    | Save Order
    |--------------------------------------------------------------------------
    */

    await order.save({
      session,
    });

    await session.commitTransaction();

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

  /*
  |--------------------------------------------------------------------------
  | Already Paid
  |--------------------------------------------------------------------------
  */

  if (
    order.payment.status ===
    "Paid"
  ) {
    throw new Error(
      "Order is already paid."
    );
  }

  /*
  |--------------------------------------------------------------------------
  | Already Confirmed
  |--------------------------------------------------------------------------
  */

  if (
    order.orderStatus ===
    "Confirmed"
  ) {
    throw new Error(
      "Order has already been confirmed."
    );
  }

  /*
  |--------------------------------------------------------------------------
  | Cancelled Orders
  |--------------------------------------------------------------------------
  */

  if (
    order.orderStatus ===
    "Cancelled"
  ) {
    throw new Error(
      "Cancelled orders cannot be paid."
    );
  }

  return order;
};