import express from "express";

import {
  downloadInvoice,
} from "../controllers/invoiceController.js";

const router = express.Router();

/*
|--------------------------------------------------------------------------
| Download Invoice
|--------------------------------------------------------------------------
*/

router.get(
  "/:orderId",
  downloadInvoice
);

export default router;