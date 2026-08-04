import express from "express";

import {
  createOrder,
  getOrderById,
  getOrders,
  updateOrderStatus,
  getMyOrders,
  cancelOrder,
  reorder,
  canReviewProduct,
} from "../controllers/orderController.js";

import protect from "../middleware/protect.js";
import admin from "../middleware/admin.js";

const router = express.Router();

/*
|--------------------------------------------------------------------------
| Customer
|--------------------------------------------------------------------------
*/

router.post(
  "/",
  protect,
  createOrder
);

router.get(
  "/my-orders",
  protect,
  getMyOrders
);

router.patch(
  "/:id/cancel",
  protect,
  cancelOrder
);

router.post(
  "/:id/reorder",
  protect,
  reorder
);

router.get(
  "/reviewable/:productId",
  protect,
  canReviewProduct
);

/*
|--------------------------------------------------------------------------
| Admin
|--------------------------------------------------------------------------
*/

router.get(
  "/",
  protect,
  admin,
  getOrders
);

router.patch(
  "/:id/status",
  protect,
  admin,
  updateOrderStatus
);

/*
|--------------------------------------------------------------------------
| Shared
|--------------------------------------------------------------------------
*/

router.get(
  "/:id",
  protect,
  getOrderById
);

export default router;