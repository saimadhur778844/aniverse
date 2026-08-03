import { generateInvoice } from "../services/invoiceService.js";

export const downloadInvoice = async (
  req,
  res
) => {
  try {
    const { orderId } = req.params;

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
      res
    );
  } catch (error) {
    console.error(error);

    if (!res.headersSent) {
      res.status(500).json({
        success: false,
        message:
          error.message ||
          "Unable to generate invoice.",
      });
    }
  }
};