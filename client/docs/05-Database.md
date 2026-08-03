# Database Documentation

Version: 1.0.0

---

# Overview

Aniverse uses MongoDB Atlas as its primary database.

The database is designed using a normalized document model where relationships are maintained using MongoDB ObjectIds.

---

# Collections

The application currently consists of the following collections.

Users

Categories

Products

Orders

Coupons

Reviews

Counters

---

# Database Diagram

Users
 │
 │
 ├──────────────┐
 │              │
 ▼              ▼

Orders      Reviews

 │              │
 │              │
 ▼              ▼

Products ───────┘

 │

 ▼

Categories

---

# Users Collection

Purpose

Stores customer and administrator accounts.

Important Fields

_id

name

email

password

role

createdAt

updatedAt

Indexes

email (Unique)

---

# Categories Collection

Purpose

Organizes products.

Example

One Piece

Naruto

Dragon Ball

Pokemon

Important Fields

_id

name

slug

description

image

active

---

# Products Collection

Purpose

Stores all products available for purchase.

Important Fields

_id

name

slug

description

price

stock

category

images

anime

featured

averageRating

reviewCount

createdAt

updatedAt

Indexes

slug (Unique)

category

featured

---

# Orders Collection

Purpose

Stores customer purchases.

Important Fields

_id

orderNumber

user

items

shippingAddress

payment

coupon

subtotal

shippingCharge

discount

tax

total

orderStatus

createdAt

updatedAt

Relationships

User

↓

Many Orders

Product

↓

Many Order Items

Coupon

↓

Optional

---

# Order Status

Pending

↓

Confirmed

↓

Processing

↓

Shipped

↓

Delivered

↓

Cancelled

---

# Payment Status

Pending

Paid

Failed

Refunded

---

# Coupons Collection

Purpose

Stores promotional discounts.

Fields

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

Indexes

code (Unique)

active

---

# Reviews Collection

Purpose

Stores customer reviews.

Fields

product

user

order

rating

title

comment

images

verifiedPurchase

visible

createdAt

updatedAt

Indexes

user + product + order (Unique)

product

visible

---

# Counter Collection

Purpose

Generates sequential values.

Currently Used For

Order Numbers

Future

Invoice Numbers

Customer Numbers

Seller Numbers

---

# Relationships

One Category

↓

Many Products

One User

↓

Many Orders

One User

↓

Many Reviews

One Product

↓

Many Reviews

One Order

↓

Many Products

---

# Indexing Strategy

Users

email

Products

slug

category

Orders

user

createdAt

orderStatus

Coupons

code

Reviews

product

visible

---

# Future Database Improvements

Redis Cache

MongoDB Transactions

Read Replicas

Sharding

Product Analytics Collection

Wishlist Collection

Notification Collection

Audit Logs

---

# Backup Strategy

MongoDB Atlas Daily Backups

Weekly Export

Monthly Archive

Disaster Recovery Plan

---

# Data Integrity

Unique Constraints

Transactions

Reference Validation

Stock Validation

Coupon Validation

Payment Verification
