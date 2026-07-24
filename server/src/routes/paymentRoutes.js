import express from "express";

import { createPaymentSession } from "../controllers/paymentController.js";

const router = express.Router();

router.post("/create-session", createPaymentSession);

export default router;