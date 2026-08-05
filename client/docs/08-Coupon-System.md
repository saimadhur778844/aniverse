# Coupon System Documentation

Version: 1.0.0

---

# Overview

The Coupon System allows administrators to create promotional discounts that customers can apply during checkout.

Coupons are validated before payment and stored with the order for future reference.

---

# Coupon Types

Percentage

Example

SAVE10

10% Off

---

Fixed Amount

Example

SAVE200

₹200 Off

---

# Coupon Flow

Customer

↓

Cart

↓

Checkout

↓

Enter Coupon

↓

Backend Validation

↓

Calculate Discount

↓

Display Total

↓

Create Order

↓

Payment

↓

Payment Success

↓

Increase Usage Count

---

# Validation Rules

Coupon Exists

↓

Active

↓

Within Start Date

↓

Before Expiry

↓

Minimum Order Amount

↓

Usage Limit

↓

Per User Limit

↓

Valid

---

# Coupon Fields

code

description

type

value

minimumOrderAmount

maximumDiscount

usageLimit

usedCount

usagePerUser

startDate

expiryDate

active

---

# Percentage Coupon

Formula

Discount

=

Order Total

×

Percentage

Maximum Discount Applied

Example

Order

₹2500

Coupon

10%

Maximum

₹200

Discount

₹200

---

# Fixed Coupon

Formula

Discount

=

Fixed Amount

Example

SAVE500

↓

₹500 Off

---

# Coupon APIs

GET

/api/coupons

List Coupons

---

POST

/api/coupons

Create Coupon

---

PUT

/api/coupons/:id

Update Coupon

---

DELETE

/api/coupons/:id

Delete Coupon

---

POST

/api/coupons/validate

Validate Coupon

---

# Checkout Flow

Customer

↓

Coupon

↓

Validation

↓

Discount

↓

Create Order

↓

Payment

↓

Success

↓

Increment Usage

---

# Order Storage

Orders store

Coupon Code

Coupon Type

Coupon Value

Discount Amount

This ensures historical orders remain accurate even if the coupon changes later.

---

# Admin Features

Create Coupon

Edit Coupon

Disable Coupon

Delete Coupon

View Usage

Usage Analytics

---

# Coupon Rules

Active

Yes

Expired

No

Usage Limit Reached

No

Minimum Order

Satisfied

Per User

Not Exceeded

---

# Example

SAVE10

10%

Maximum Discount

₹200

Minimum Order

₹500

Expiry

31 Dec 2026

---

# Security

Server-side Validation

↓

No Client-side Trust

↓

Usage Tracking

↓

Order Verification

↓

Payment Verification

---

# Future Enhancements

Referral Coupons

Birthday Coupons

Festival Campaigns

Category Coupons

Product Coupons

Customer-specific Coupons

Auto Apply Best Coupon

Coupon Analytics Dashboard
