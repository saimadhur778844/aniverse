import Order from "../models/Order.js";
// import Coupon from "../models/Coupon.js";
// import Product from "../models/Product.js";

import cashfree from "../config/cashfree.js";
import { verifyPayment } from "../services/paymentService.js";

/*
|--------------------------------------------------------------------------
| Create Cashfree Order
|--------------------------------------------------------------------------
*/

const createCashfreeOrder = async (order) => {
  const payload = {
  order_id: `ANV_${order._id}`,

  order_amount: Number(order.total),

  order_currency: "INR",

  customer_details: {
    customer_id: order.user
      ? order.user.toString()
      : "guest",

    customer_name:
      order.shippingAddress.fullName,

    customer_email:
      order.shippingAddress.email,

    customer_phone:
      order.shippingAddress.phone
        .replace(/\D/g, "")
        .replace(/^0+/, ""),
  },

 order_meta: {
  return_url: `${process.env.CLIENT_URL}/payment-success?order_id={order_id}`,
},

  order_note: order.orderNumber,
};


  try {
    const { data } = await cashfree.post(
      "/pg/orders",
      payload,
      {
        headers: {
          "Content-Type":
            "application/json",

          Accept:
            "application/json",

          "x-api-version":
            "2025-01-01",
        },
      }
    );



  
    order.payment.gatewayOrderId =
      data.order_id;

    await order.save();

    return data;
  } catch (error) {


    console.log(
      "Status:",
      error.response?.status
    );

    console.dir(
      error.response?.data,
      {
        depth: null,
      }
    );

    throw error;
  }
};


/*
|--------------------------------------------------------------------------
| Create Payment Session
|--------------------------------------------------------------------------
*/

export const createPaymentSession =
  async (req, res) => {
    try {
      const { orderId } =
        req.body;

      const order =
        await Order.findById(
          orderId
        );

      if (!order) {
        return res.status(404).json({
          success: false,
          message:
            "Order not found.",
        });
      }

      if (
        order.payment.status ===
        "Paid"
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Order already paid.",
        });
      }

      const session =
        await createCashfreeOrder(
          order
        );

      return res.json({
        success: true,

        payment_session_id:
          session.payment_session_id,

        order_id:
          session.order_id,
      });
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        success: false,

        message:
          error.response?.data
            ?.message ??
          error.message,
      });
    }
  };

/*
|--------------------------------------------------------------------------
| Verify Payment
|--------------------------------------------------------------------------
*/
console.log("VERIFY PAYMENT CONTROLLER");
export const verifyPaymentStatus = async (
  req,
  res
) => {
  try {
    const { orderId } =
      req.params;

    const order =
      await verifyPayment(
        orderId
      );

    return res.json({
      success: true,
      order,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message:
        error.message,
    });
  }
};

  /*
|--------------------------------------------------------------------------
| Retry Payment
|--------------------------------------------------------------------------
*/

export const retryPaymentSession =
  async (req, res) => {
    try {
      const { orderId } =
        req.params;

      const order =
        await Order.findById(
          orderId
        );

      if (!order) {
        return res.status(404).json({
          success: false,
          message:
            "Order not found.",
        });
      }

      const session =
        await createCashfreeOrder(
          order
        );

      return res.json({
        success: true,

        payment_session_id:
          session.payment_session_id,

        order_id:
          session.order_id,
      });
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        success: false,
        message:
          error.response?.data
            ?.message ??
          error.message,
      });
    }
  };

/*
|--------------------------------------------------------------------------
| Cashfree Webhook
|--------------------------------------------------------------------------
*/

export const paymentWebhook = async (
  req,
  res
) => {
  try {
    /*
    |--------------------------------------------------------------------------
    | Verify Signature
    |--------------------------------------------------------------------------
    */

    cashfree.PGVerifyWebhookSignature(
      req.headers["x-webhook-signature"],
      req.rawBody,
      req.headers["x-webhook-timestamp"]
    );

    /*
    |--------------------------------------------------------------------------
    | Event
    |--------------------------------------------------------------------------
    */

    const event =
      req.body.type;

    const data =
      req.body.data;

    if (!data?.order?.order_id) {
      return res.json({
        success: true,
      });
    }

    const gatewayOrderId =
      data.order.order_id;

    /*
    |--------------------------------------------------------------------------
    | Payment Success
    |--------------------------------------------------------------------------
    */

    if (
      event ===
      "PAYMENT_SUCCESS_WEBHOOK"
    ) {
      const order =
        await Order.findOne({
          "payment.gatewayOrderId":
            gatewayOrderId,
        });

      if (
        order &&
        order.payment.status !==
          "Paid"
      ) {
        order.payment.status =
          "Paid";

        order.payment.paidAt =
          new Date();

        order.orderStatus =
          "Confirmed";

        await order.save();
      }
    }

    /*
    |--------------------------------------------------------------------------
    | Payment Failed
    |--------------------------------------------------------------------------
    */

    if (
      event ===
        "PAYMENT_FAILED_WEBHOOK" ||
      event ===
        "PAYMENT_USER_DROPPED_WEBHOOK"
    ) {
      console.log(
        `Payment not completed for ${gatewayOrderId}`
      );
    }

    return res.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message:
        error.message,
    });
  }
};