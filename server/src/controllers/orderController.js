import {
  createOrder as createOrderService,
  getOrderById as getOrderByIdService,
  getOrders as getOrdersService,
  updateOrderStatus as updateOrderStatusService,
} from "../services/orderService.js";

// @desc Create Order
// @route POST /api/orders
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

// @desc Get Order By ID
// @route GET /api/orders/:id
export const getOrderById = async (req, res, next) => {
  try {
    const order = await getOrderByIdService(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found.",
      });
    }

    res.json({
      success: true,
      order,
    });
  } catch (error) {
    next(error);
  }
};

// @desc Get All Orders
// @route GET /api/orders
export const getOrders = async (req, res, next) => {
  try {
    const {
      page = 1,
      limit = 10,
      search = "",
      status,
    } = req.query;

    const result = await getOrdersService({
      page: Number(page),
      limit: Number(limit),
      search,
      status,
    });

    res.json({
      success: true,
      ...result,
    });
  } catch (error) {
    next(error);
  }
};

// @desc Update Order Status
// @route PATCH /api/orders/:id/status
export const updateOrderStatus = async (req, res, next) => {
  try {
    const order = await updateOrderStatusService(
      req.params.id,
      req.body.status
    );

    res.json({
      success: true,
      message: "Order status updated successfully.",
      order,
    });
  } catch (error) {
    next(error);
  }
};