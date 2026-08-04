import mongoose from "mongoose";

import {
  generateInvoice,
} from "../services/invoiceService.js";

/*
|--------------------------------------------------------------------------
| Download Invoice
|--------------------------------------------------------------------------
*/

export const downloadInvoice = async (
  req,
  res,
  next
) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized.",
      });
    }

    const { orderId } = req.params;

    if (
      !mongoose.isValidObjectId(orderId)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid order id.",
      });
    }

    res.setHeader(
      "Content-Type",
      "application/pdf"
    );

    res.setHeader(
      "Content-Disposition",
      `attachment; filename=Invoice-${orderId}.pdf`
    );

    await generateInvoice(
      orderId,
      req.user,
      res
    );
  } catch (error) {
    if (!res.headersSent) {
      next(error);
    }
  }
};