# Order System Documentation

Version: 1.0.0

---

# Overview

The Order System is responsible for managing the complete lifecycle of customer purchases.

It validates inventory, creates orders, stores payment information, generates invoices, updates order status, and maintains customer order history.

---

# Order Lifecycle

Customer

↓

Shopping Cart

↓

Checkout

↓

Coupon Validation

↓

Stock Validation

↓

Order Creation

↓

Payment

↓

Payment Verification

↓

Order Confirmation

↓

Processing

↓

Shipped

↓

Delivered

↓

Review Eligible

---

# Order Creation Flow

Customer clicks Checkout

↓

Validate Shipping Address

↓

Validate Cart Items

↓

Validate Coupon

↓

Validate Stock

↓

Calculate Pricing

↓

Create Order

↓

Reduce Inventory

↓

Create Payment Session

---

# Order Number

Every order receives a unique order number.

Format

ANI-YYYYMMDD-000001

Example

ANI-20260803-000001

Generated using

Counter Collection

---

# Order Status

Pending

Customer has created the order.

↓

Confirmed

Payment successfully verified.

↓

Processing

Order is being packed.

↓

Shipped

Courier picked up shipment.

↓

Delivered

Customer received the order.

↓

Cancelled

Order cancelled before delivery.

---

# Payment Status

Pending

Paid

Failed

Refunded

---

# Order Schema

Order

↓

Order Number

↓

User

↓

Items

↓

Shipping Address

↓

Payment

↓

Coupon

↓

Pricing

↓

Status

↓

Timestamps

---

# Order Items

Each order stores

Product

Name

Price

Quantity

Image

Price is copied into the order to preserve historical pricing.

---

# Pricing Calculation

Subtotal

+

Shipping Charge

+

Tax

-

Discount

=

Grand Total

---

# Shipping Address

Full Name

Email

Phone

Address

City

State

Pincode

Country

---

# Payment Information

Method

Status

Gateway Order ID

Gateway Payment ID

Paid Date

---

# APIs

POST

/api/orders

Create Order

---

GET

/api/orders/my-orders

Customer Orders

---

GET

/api/orders/:id

Order Details

---

PATCH

/api/orders/:id/cancel

Cancel Order

---

POST

/api/orders/:id/reorder

Reorder Previous Purchase

---

GET

/api/orders/reviewable/:productId

Returns whether customer can review a product.

---

# Stock Management

Before Order

↓

Validate Stock

↓

Reduce Stock

↓

Commit Transaction

---

# Invoice

Generated after successful payment.

Contains

Order Number

Customer

Products

Payment

Totals

GST

Discount

Shipping

---

# Customer Dashboard

Customers can

View Orders

Download Invoice

Track Status

Reorder

Review Products

---

# Admin Features

View Orders

Update Status

Search Orders

Filter Orders

View Customer

View Payment

Manage Delivery

---

# Future Improvements

Shipment Tracking

Courier API

Estimated Delivery

Returns

Exchanges

Refund Workflow

Split Orders

Multiple Warehouses
