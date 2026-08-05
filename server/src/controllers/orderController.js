import {
  createOrder as createOrderService,
  getOrderById as getOrderByIdService,
  getOrders as getOrdersService,
  updateOrderStatus as updateOrderStatusService,
  getMyOrders as getMyOrdersService,
  cancelOrder as cancelOrderService,
  reorder as reorderService,
  getReviewableOrder,
} from "../services/orderService.js";

/*
|--------------------------------------------------------------------------
| Create Order
|--------------------------------------------------------------------------
*/

export const createOrder = async (
  req,
  res,
  next
) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized.",
      });
    }

    const order =
      await createOrderService({
        ...req.body,
        user: req.user._id,
      });

    res.status(201).json({
      success: true,
      message:
        "Order created successfully.",
      order,
    });
  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Get Orders (Admin)
|--------------------------------------------------------------------------
*/

export const getOrders = async (
  req,
  res,
  next
) => {
  try {
    const {
      page = 1,
      limit = 10,
      search = "",
      status,
      paymentStatus,
    } = req.query;

    const result =
      await getOrdersService({
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

/*
|--------------------------------------------------------------------------
| Get Order By ID
|--------------------------------------------------------------------------
*/

export const getOrderById = async (
  req,
  res,
  next
) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({
        success: false,
        message:
          "Order id is required.",
      });
    }

    const order =
      await getOrderByIdService(
        req.params.id
      );

    if (!order) {
      return res.status(404).json({
        success: false,
        message:
          "Order not found.",
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

/*
|--------------------------------------------------------------------------
| My Orders
|--------------------------------------------------------------------------
*/

export const getMyOrders = async (
  req,
  res,
  next
) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message:
          "Unauthorized.",
      });
    }

    const orders =
      await getMyOrdersService(
        req.user._id
      );

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Cancel Order
|--------------------------------------------------------------------------
*/

export const cancelOrder = async (
  req,
  res,
  next
) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message:
          "Unauthorized.",
      });
    }

    if (!req.params.id) {
      return res.status(400).json({
        success: false,
        message:
          "Order id is required.",
      });
    }

    const order =
      await cancelOrderService(
        req.params.id,
        req.user._id
      );

    res.status(200).json({
      success: true,
      message:
        "Order cancelled successfully.",
      order,
    });
  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Reorder
|--------------------------------------------------------------------------
*/

export const reorder = async (
  req,
  res,
  next
) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message:
          "Unauthorized.",
      });
    }

    if (!req.params.id) {
      return res.status(400).json({
        success: false,
        message:
          "Order id is required.",
      });
    }

    const order =
      await reorderService(
        req.params.id,
        req.user._id
      );

    res.status(201).json({
      success: true,
      message:
        "Order created successfully.",
      order,
    });
  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Update Order Status
|--------------------------------------------------------------------------
*/

export const updateOrderStatus =
  async (req, res, next) => {
    try {
      if (!req.params.id) {
        return res.status(400).json({
          success: false,
          message:
            "Order id is required.",
        });
      }

      const allowedStatuses = [
        "Pending",
        "Confirmed",
        "Packed",
        "Shipped",
        "Delivered",
        "Cancelled",
      ];

      const { status } = req.body;

      if (
        !allowedStatuses.includes(
          status
        )
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Invalid order status.",
        });
      }

      const order =
        await updateOrderStatusService(
          req.params.id,
          status
        );

      res.status(200).json({
        success: true,
        message:
          "Order status updated successfully.",
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

export const canReviewProduct =
  async (req, res, next) => {
    try {
      const order =
        await getReviewableOrder(
          req.user._id,
          req.params.productId
        );

      res.status(200).json({
        success: true,
        canReview: !!order,
        orderId:
          order?._id ?? null,
      });
    } catch (error) {
      next(error);
    }
  };