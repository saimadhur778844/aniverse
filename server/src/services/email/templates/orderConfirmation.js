const currency = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
});

export default function orderConfirmationTemplate(order) {
  const items = order.items
    .map(
      (item) => `
      <tr>
        <td style="padding:12px;border-bottom:1px solid #333;">
          ${item.name}
        </td>

        <td style="padding:12px;text-align:center;border-bottom:1px solid #333;">
          ${item.quantity}
        </td>

        <td style="padding:12px;text-align:right;border-bottom:1px solid #333;">
          ${currency.format(item.price)}
        </td>
      </tr>
    `
    )
    .join("");

  return `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">

<title>Order Confirmation</title>

</head>

<body style="margin:0;background:#09090f;font-family:Arial,Helvetica,sans-serif;color:#ffffff;">

<table width="100%" cellpadding="0" cellspacing="0">

<tr>

<td align="center" style="padding:40px;">

<table width="700" style="background:#171726;border-radius:20px;overflow:hidden;">

<tr>

<td style="background:#ff4d6d;padding:30px;text-align:center;">

<h1 style="margin:0;color:white;">
🎉 Order Confirmed
</h1>

<p style="margin-top:10px;color:white;">
Thank you for shopping with <strong>Aniverse</strong>
</p>

</td>

</tr>

<tr>

<td style="padding:30px;">

<h2>
Order #${order.orderNumber}
</h2>

<p>
Hi <strong>${order.shippingAddress.fullName}</strong>,
</p>

<p>

We've successfully received your order and payment.

</p>

<h3>Items Ordered</h3>

<table width="100%" cellspacing="0">

<thead>

<tr>

<th align="left">
Product
</th>

<th align="center">
Qty
</th>

<th align="right">
Price
</th>

</tr>

</thead>

<tbody>

${items}

</tbody>

</table>

<hr style="border-color:#333;margin:30px 0;" />

<p>

Subtotal:
<strong>
${currency.format(order.subtotal)}
</strong>

</p>

<p>

Shipping:
<strong>
${currency.format(order.shippingCharge)}
</strong>

</p>

<p>

Discount:
<strong>
-${currency.format(order.discount)}
</strong>

</p>

<h2>

Total:
${currency.format(order.total)}

</h2>

<hr style="border-color:#333;margin:30px 0;" />

<h3>

Shipping Address

</h3>

<p>

${order.shippingAddress.fullName}<br>

${order.shippingAddress.address}<br>

${order.shippingAddress.city},
${order.shippingAddress.state}<br>

${order.shippingAddress.pincode}

</p>

<div style="margin-top:40px;text-align:center;">

<a
href="${process.env.CLIENT_URL}/orders"
style="
display:inline-block;
padding:15px 30px;
background:#ff4d6d;
color:white;
text-decoration:none;
border-radius:10px;
font-weight:bold;
"
>

View My Orders

</a>

</div>

</td>

</tr>

</table>

</td>

</tr>

</table>

</body>

</html>
`;
}