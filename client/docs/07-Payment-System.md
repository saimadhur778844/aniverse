# Payment System Documentation

Version: 1.0.0

---

# Overview

Aniverse uses the Cashfree Payment Gateway for secure online transactions.

The payment system is designed to provide a smooth checkout experience while ensuring payment verification before confirming customer orders.

---

# Payment Provider

Cashfree Payment Gateway

Currency

INR

Payment Methods

- UPI
- Credit Card
- Debit Card
- Net Banking
- Wallets

---

# Payment Flow

Customer

↓

Shopping Cart

↓

Checkout

↓

Create Order

↓

Create Cashfree Payment Session

↓

Cashfree Checkout

↓

Customer Pays

↓

Cashfree Webhook

↓

Payment Verification

↓

Update Order Status

↓

Generate Invoice

↓

Customer Dashboard

---

# Step 1

Customer Proceeds to Checkout

The frontend validates

- Customer information
- Shipping address
- Cart items
- Coupon

before contacting the backend.

---

# Step 2

Order Creation

Backend

↓

Validate Products

↓

Validate Stock

↓

Calculate Totals

↓

Apply Coupon

↓

Create Order

↓

Reduce Stock

↓

Return Order ID

Order Status

Pending

Payment Status

Pending

---

# Step 3

Payment Session

Frontend

↓

POST

/api/payments/create-session

Backend

↓

Cashfree SDK

↓

Payment Session ID

↓

Frontend

---

# Step 4

Cashfree Checkout

Customer

↓

Cashfree Hosted Checkout

↓

Payment

↓

Redirect

Return URL

/payment-success

or

/payment-failed

---

# Step 5

Payment Verification

Cashfree

↓

Webhook

↓

Backend

↓

Verify Payment

↓

Update Database

Payment Status

Paid

Order Status

Confirmed

Payment ID

Stored

Gateway Order ID

Stored

Paid Date

Stored

---

# Webhook Flow

Cashfree

↓

Webhook

↓

Validate Payload

↓

Locate Order

↓

Update Payment

↓

Update Order

↓

Generate Invoice

↓

Return Success

---

# Database Fields

Payment

method

status

paymentId

gatewayOrderId

gatewayPaymentId

paidAt

---

# Payment Status

Pending

Paid

Failed

Refunded

---

# Order Status

Pending

Confirmed

Processing

Shipped

Delivered

Cancelled

---

# Payment APIs

POST

/api/payments/create-session

Creates Cashfree Payment Session

---

GET

/api/payments/verify/:orderId

Verifies payment

---

POST

/api/payments/webhook

Receives Cashfree webhook

---

# Security

JWT Authentication

↓

Protected Checkout

↓

Secure Cashfree SDK

↓

Webhook Validation

↓

Payment Verification

↓

Order Update

---

# Error Handling

Invalid Order

↓

404

Invalid Payment

↓

Failed

Webhook Error

↓

Retry

Gateway Error

↓

500

---

# Invoice Generation

Payment Success

↓

Generate PDF

↓

Customer Download

↓

Admin Download

---

# Future Improvements

Partial Payments

Refund API

Wallet Payments

EMI

International Payments

Multi-currency

Payment Analytics
