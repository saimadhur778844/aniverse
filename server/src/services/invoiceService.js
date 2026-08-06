import PDFDocument from "pdfkit";

import Order from "../models/Order.js";

export const generateInvoice = async (
  orderId,
  user,
  stream
) => {  
  const order = await Order.findById(orderId)
      .populate(
        "user",
        "name email"
      )
      .populate(
        "items.product"
      );

  if (!order) {
    throw new Error(
      "Order not found."
    );
  }

  /*
|--------------------------------------------------------------------------
| Authorization
|--------------------------------------------------------------------------
*/

const isAdmin =
  user.role === "admin" ||
  user.role === "superadmin";

if (
  !isAdmin &&
  order.user &&
  order.user._id.toString() !==
    user.id.toString()
) {
  throw new Error(
    "Unauthorized access."
  );
}

  const doc = new PDFDocument({
    margin: 50,
  });

  doc.pipe(stream);

  /*
  |--------------------------------------------------------------------------
  | Header
  |--------------------------------------------------------------------------
  */

  doc
    .fontSize(26)
    .fillColor("#ff4d6d")
    .text("ANIVERSE");

  doc
    .moveDown(0.5)
    .fontSize(11)
    .fillColor("black")
    .text(
      "Premium Anime Marketplace"
    );

  doc.moveDown();

  doc
    .fontSize(20)
    .text("INVOICE");

  doc.moveDown();

  /*
  |--------------------------------------------------------------------------
  | Invoice Info
  |--------------------------------------------------------------------------
  */

  doc.fontSize(11);

  doc.text(
    `Order Number : ${order.orderNumber}`
  );

  doc.text(
    `Invoice Date : ${new Date().toLocaleDateString()}`
  );

  doc.text(
    `Payment Status : ${order.payment.status}`
  );

  doc.text(
    `Order Status : ${order.orderStatus}`
  );

  doc.moveDown();

  /*
  |--------------------------------------------------------------------------
  | Customer
  |--------------------------------------------------------------------------
  */

  doc
    .fontSize(14)
    .text("Customer");

  doc.fontSize(11);

  doc.text(
    order.shippingAddress.fullName
  );

  doc.text(
    order.shippingAddress.email
  );

  doc.text(
    order.shippingAddress.phone
  );

  doc.text(
    order.shippingAddress.address
  );

  doc.text(
    `${order.shippingAddress.city}, ${order.shippingAddress.state}`
  );

  doc.text(
    order.shippingAddress.pincode
  );

  doc.moveDown();

  /*
  |--------------------------------------------------------------------------
  | Products
  |--------------------------------------------------------------------------
  */

  doc
    .fontSize(14)
    .text("Products");

  doc.moveDown(0.5);

  order.items.forEach(
    (item) => {
      doc.fontSize(11);

      doc.text(item.name);

      doc.text(
        `Qty : ${item.quantity}`
      );

      doc.text(
        `Price : ₹${item.price}`
      );

      doc.text(
        `Total : ₹${
          item.price *
          item.quantity
        }`
      );

      doc.moveDown();
    }
  );

  /*
  |--------------------------------------------------------------------------
  | Totals
  |--------------------------------------------------------------------------
  */

  doc.moveDown();

  doc.text(
    `Subtotal : ₹${order.subtotal}`
  );

  doc.text(
    `Shipping : ₹${order.shippingCharge}`
  );

  doc.text(
    `Discount : ₹${order.discount}`
  );

  doc
    .fontSize(14)
    .text(
      `Grand Total : ₹${order.total}`
    );

  if (
    order.payment.paymentId
  ) {
    doc.moveDown();

    doc.text(
      `Payment ID : ${order.payment.paymentId}`
    );
  }

  doc.moveDown(2);

  doc
    .fontSize(10)
    .fillColor("gray")
    .text(
      "Thank you for shopping with Aniverse!"
    );

  doc.end();
};