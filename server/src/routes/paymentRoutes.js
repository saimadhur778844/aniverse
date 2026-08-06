import express from "express";

import {
  createPaymentSession,
  retryPaymentSession,
  verifyPaymentStatus,
  paymentWebhook,
} from "../controllers/paymentController.js";
import protect from "../middleware/protect.js";

const router =
  express.Router();

router.post(
  "/create-session",
  protect,
  createPaymentSession
);

router.post(
  "/retry/:orderId",
  protect,
  retryPaymentSession
);

router.get(
  "/verify/:orderId",
  protect,
  verifyPaymentStatus
);

router.post(
  "/webhook",
  paymentWebhook
);

export default router;