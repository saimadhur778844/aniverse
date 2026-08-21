import Order from "../models/Order.js";

import cashfree from "../config/cashfree.js";

import {
  verifyPayment,
} from "../services/paymentService.js";

import verifyCashfreeWebhook from "../utils/verifyCashfreeWebhook.js";

/*
|--------------------------------------------------------------------------
| Create Cashfree Order
|--------------------------------------------------------------------------
*/

const createCashfreeOrder = async (
  order
) => {
  const payload = {
    order_id: `ANV_${order._id}`,

    order_amount: Number(
      order.total
    ),

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
      return_url:
        `${process.env.CLIENT_URL}/payment-success?order_id={order_id}`,
    },

    order_note:
      order.orderNumber,
  };

  try {
    const { data } =
      await cashfree.post(
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
    console.error(
      "Cashfree order creation failed:",
      error.response?.data ??
        error.message
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
      const {
        orderId,
      } = req.body;

      if (!orderId) {
        return res.status(400).json({
          success: false,
          message:
            "Order ID is required.",
        });
      }

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

      /*
      |--------------------------------------------------------------------------
      | Security: customer can only create payment for their own order
      |--------------------------------------------------------------------------
      */

      if (
        req.user &&
        order.user &&
        order.user.toString() !==
          req.user._id.toString()
      ) {
        return res.status(403).json({
          success: false,
          message:
            "You are not allowed to pay for this order.",
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

export const verifyPaymentStatus =
  async (req, res) => {
    try {
      const {
        orderId,
      } = req.params;

      if (!orderId) {
        return res.status(400).json({
          success: false,
          message:
            "Cashfree order ID is required.",
        });
      }

      /*
      |--------------------------------------------------------------------------
      | Find Aniverse order first
      |--------------------------------------------------------------------------
      */

      const order =
        await Order.findOne({
          "payment.gatewayOrderId":
            orderId,
        });

      if (!order) {
        return res.status(404).json({
          success: false,
          message:
            "Order not found.",
        });
      }

      /*
      |--------------------------------------------------------------------------
      | Ownership check
      |--------------------------------------------------------------------------
      */

      if (
        req.user &&
        order.user &&
        order.user.toString() !==
          req.user._id.toString()
      ) {
        return res.status(403).json({
          success: false,
          message:
            "You are not allowed to verify this order.",
        });
      }

      const verifiedOrder =
        await verifyPayment(
          orderId
        );

      return res.json({
        success: true,
        order: verifiedOrder,
      });
    } catch (error) {
      console.error(
        "Payment verification failed:",
        error
      );

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
      const {
        orderId,
      } = req.params;

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
        req.user &&
        order.user &&
        order.user.toString() !==
          req.user._id.toString()
      ) {
        return res.status(403).json({
          success: false,
          message:
            "You are not allowed to pay for this order.",
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
| Cashfree Webhook
|--------------------------------------------------------------------------
*/

export const paymentWebhook =
  async (req, res) => {
    try {
      /*
      |--------------------------------------------------------------------------
      | Verify Cashfree signature
      |--------------------------------------------------------------------------
      */

      const isValid =
        verifyCashfreeWebhook(
          req.rawBody,
          req.headers[
            "x-webhook-signature"
          ],
          req.headers[
            "x-webhook-timestamp"
          ]
        );

      if (!isValid) {
        return res.status(401).json({
          success: false,
          message:
            "Invalid webhook signature.",
        });
      }

      const event =
        req.body?.type;

      const data =
        req.body?.data;

      const gatewayOrderId =
        data?.order?.order_id;

      if (!gatewayOrderId) {
        return res.json({
          success: true,
        });
      }

      /*
      |--------------------------------------------------------------------------
      | Successful payment
      |--------------------------------------------------------------------------
      |
      | IMPORTANT:
      | We don't update the order directly here.
      |
      | We use the same verification/finalization
      | service used by the success page.
      |
      */

      if (
        event ===
        "PAYMENT_SUCCESS_WEBHOOK"
      ) {
        await verifyPayment(
          gatewayOrderId
        );
      }

      /*
      |--------------------------------------------------------------------------
      | Failed / dropped payment
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
      console.error(
        "Cashfree webhook error:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };