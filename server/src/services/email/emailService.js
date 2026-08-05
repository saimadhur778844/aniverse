import transporter from "./transporter.js";
import orderConfirmationTemplate from "./templates/orderConfirmation.js";

/*
|--------------------------------------------------------------------------
| Verify SMTP
|--------------------------------------------------------------------------
*/

export const verifyMailServer =
  async () => {
    await transporter.verify();

    console.log(
      "SMTP server connected."
    );
  };

/*
|--------------------------------------------------------------------------
| Send Order Confirmation
|--------------------------------------------------------------------------
*/

export const sendOrderConfirmationEmail =
  async (order) => {
    await transporter.sendMail({
      from: process.env.MAIL_FROM,

      to: order.shippingAddress.email,

      subject: `Your Aniverse Order ${order.orderNumber}`,

      html: orderConfirmationTemplate(
        order
      ),
    });

    console.log(
      `Order confirmation email sent to ${order.shippingAddress.email}`
    );
  };