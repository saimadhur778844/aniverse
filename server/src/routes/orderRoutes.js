import express from "express";
import {
  createOrder,
  getOrderById,
  getOrders,
  updateOrderStatus,
  getMyOrders,
  cancelOrder,
  reorder,
} from "../controllers/orderController.js";
import {
  canReviewProduct,
} from "../controllers/orderController.js";
import protect from "../middleware/protect.js";

const router = express.Router();

// Customer
router.post("/", createOrder);
router.get("/my-orders", getMyOrders);

// Admin
router.get("/", getOrders);

router.get(
  "/reviewable/:productId",
  protect,
  canReviewProduct
);

// Shared
router.get("/:id", getOrderById);

// Customer
router.patch("/:id/cancel", cancelOrder);
router.post("/:id/reorder", reorder);

// Admin
router.patch("/:id/status", updateOrderStatus);

export default router;