import cashfree from "../config/cashfree.js";
import Order from "../models/Order.js";

export const createPaymentSession = async (req, res) => {
  try {
    const { orderId } = req.body;

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    const request = {
    //   order_id: order._id.toString(),
      order_id: `ANV_${order._id}`,
      order_amount: order.total,
      order_currency: "INR",

      customer_details: {
        customer_id: order.user
          ? order.user.toString()
          : `guest_${order._id}`,

        customer_name: order.shippingAddress.fullName,

        customer_email: order.shippingAddress.email,

        customer_phone: order.shippingAddress.phone,
      },

      order_meta: {
        return_url:
        process.env.CLIENT_URL +
        "/payment-success?order_id={order_id}",
    },

      order_note: `Order ${order._id}`,
    };

    const response = await cashfree.PGCreateOrder(request);

    order.payment.gatewayOrderId = response.data.order_id;

    await order.save();

    return res.json({
      success: true,
      payment_session_id: response.data.payment_session_id,
      order_id: response.data.order_id,
    });
  } catch (error) {
    console.error(error.response?.data || error);

    return res.status(500).json({
      success: false,
      message: "Unable to create payment session.",
    });
  }
};