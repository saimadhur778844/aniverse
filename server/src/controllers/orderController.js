import {
  createOrder as createOrderService,
  getOrderById as getOrderByIdService,
  getOrders as getOrdersService,
  updateOrderStatus as updateOrderStatusService,
  getMyOrders as getMyOrdersService,
  cancelOrder as cancelOrderService,
  reorder as reorderService,
} from "../services/orderService.js";
import {
  getReviewableOrder,
} from "../services/orderService.js";

// @desc    Create Order
// @route   POST /api/orders
// @access  Public (temporary)
export const createOrder = async (req, res, next) => {
  try {
    const order = await createOrderService(req.body);

    res.status(201).json({
      success: true,
      message: "Order created successfully.",
      order,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get All Orders (Admin)
// @route   GET /api/orders
// @access  Admin
export const getOrders = async (req, res, next) => {
  try {
    const {
      page = 1,
      limit = 10,
      search = "",
      status,
      paymentStatus,
    } = req.query;

    const result = await getOrdersService({
      page: Number(page),
      limit: Number(limit),
      search,
      status,
      paymentStatus,
    });

    res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get Order By ID
// @route   GET /api/orders/:id
// @access  Public (temporary)
export const getOrderById = async (req, res, next) => {
  try {
    const order = await getOrderByIdService(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found.",
      });
    }

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get Logged-in User Orders
// @route   GET /api/orders/my-orders
// @access  Private
export const getMyOrders = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const orders = await getMyOrdersService(req.user._id);

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Cancel Order
// @route   PATCH /api/orders/:id/cancel
// @access  Private
export const cancelOrder = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const order = await cancelOrderService(
      req.params.id,
      req.user._id
    );

    res.status(200).json({
      success: true,
      message: "Order cancelled successfully.",
      order,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Reorder
// @route   POST /api/orders/:id/reorder
// @access  Private
export const reorder = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const order = await reorderService(
      req.params.id,
      req.user._id
    );

    res.status(201).json({
      success: true,
      message: "Order created successfully.",
      order,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update Order Status
// @route   PATCH /api/orders/:id/status
// @access  Admin
export const updateOrderStatus = async (req, res, next) => {
  try {
    const { status } = req.body;

    const order = await updateOrderStatusService(
      req.params.id,
      status
    );

    res.status(200).json({
      success: true,
      message: "Order status updated successfully.",
      order,
    });
  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Can Review Product
|--------------------------------------------------------------------------
*/

export const canReviewProduct = async (
  req,
  res
) => {
  try {
    const order =
      await getReviewableOrder(
        req.user._id,
        req.params.productId
      );

    return res.json({
      success: true,

      canReview: !!order,

      orderId: order?._id ?? null,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};