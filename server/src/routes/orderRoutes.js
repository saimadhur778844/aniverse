import express from "express";
import {
  createOrder,
  getOrderById,
  getOrders,
  updateOrderStatus,
} from "../controllers/orderController.js";

const router = express.Router();

// Customer
router.post("/", createOrder);

// Admin
router.get("/", getOrders);

// Order Details
router.get("/:id", getOrderById);

// Update Order Status
router.patch("/:id/status", updateOrderStatus);

export default router;