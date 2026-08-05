import express from "express";

import {
  createPaymentSession,
  retryPaymentSession,
  verifyPaymentStatus,
  paymentWebhook,
} from "../controllers/paymentController.js";

const router =
  express.Router();

router.post(
  "/create-session",
  createPaymentSession
);

router.post(
  "/retry/:orderId",
  retryPaymentSession
);

router.get(
  "/verify/:orderId",
  verifyPaymentStatus
);

router.post(
  "/webhook",
  paymentWebhook
);

export default router;