import express from "express";

import {
  downloadInvoice,
} from "../controllers/invoiceController.js";

import protect from "../middleware/protect.js";

const router = express.Router();

/*
|--------------------------------------------------------------------------
| Invoice
|--------------------------------------------------------------------------
*/

router.get(
  "/:orderId",
  protect,
  downloadInvoice
);

export default router;