import express from "express";

import {
  createPaymentSession,
  verifyPaymentStatus,
  paymentWebhook,
} from "../controllers/paymentController.js";

const router = express.Router();

/*
|--------------------------------------------------------------------------
| Payment Session
|--------------------------------------------------------------------------
*/

router.post(
  "/create-session",
  createPaymentSession
);

/*
|--------------------------------------------------------------------------
| Verify Payment
|--------------------------------------------------------------------------
*/

router.get(
  "/verify/:orderId",
  verifyPaymentStatus
);

router.post(
  "/webhook",
  paymentWebhook
);

export default router;