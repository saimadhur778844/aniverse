import express from "express";

import {
  createPaymentSession,
  verifyPaymentStatus,
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

export default router;