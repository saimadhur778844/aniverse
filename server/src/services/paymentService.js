import cashfree from "../config/cashfree.js";

import Order from "../models/Order.js";
import Coupon from "../models/Coupon.js";

/*
|--------------------------------------------------------------------------
| Verify Payment
|--------------------------------------------------------------------------
*/

export const verifyPayment = async (
  gatewayOrderId
) => {
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
    });

  if (!order) {
    throw new Error(
      "Order not found."
    );
  }

  if (
    payment.order_status ===
    "PAID"
  ) {
    order.payment.status =
      "Paid";

    order.payment.gatewayPaymentId =
      payment.cf_payment_id;

    order.payment.paidAt =
      new Date();

    order.orderStatus =
      "Confirmed";

    /*
    |--------------------------------------------------------------------------
    | Coupon Usage
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
        }
      );
    }

    await order.save();
  }

  return order;
};
