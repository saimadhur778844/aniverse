# Review System Documentation

Version: 1.0.0

---

# Overview

The Review System allows verified customers to share feedback on purchased products.

Only customers with a delivered order containing the product are allowed to submit reviews.

This ensures authenticity and prevents fake ratings.

---

# Review Flow

Customer

↓

Delivered Order

↓

Eligibility Check

↓

Review Form

↓

Submit Review

↓

Database

↓

Update Product Rating

↓

Display Reviews

---

# Eligibility Rules

Customer must

Own the order

AND

Order must be Delivered

AND

Product must exist inside the order

AND

Review must not already exist

---

# Review Schema

Review

↓

Product

↓

User

↓

Order

↓

Rating

↓

Title

↓

Comment

↓

Images

↓

Verified Purchase

↓

Visible

↓

Created Date

---

# Rating Scale

1

Poor

2

Fair

3

Average

4

Good

5

Excellent

---

# Product Rating

Each review updates

averageRating

reviewCount

These values are stored inside the Product document for faster product listing.

---

# Rating Formula

Average Rating

=

Sum of Ratings

/

Review Count

Example

5

4

5

4

5

Average

4.6

---

# APIs

GET

/api/reviews/product/:productId

Returns visible reviews.

---

POST

/api/reviews

Create review.

---

PUT

/api/reviews/:id

Update review.

---

DELETE

/api/reviews/:id

Delete review.

---

GET

/api/reviews

Admin review listing.

---

PATCH

/api/reviews/:id/toggle

Hide or show review.

---

# Verified Purchase

Customers only receive the

Verified Purchase

badge if

Delivered Order

↓

Matching Product

↓

Authenticated User

---

# Moderation

Admin can

Hide Review

Show Review

Delete Review

Future

Report Review

Spam Detection

Profanity Filter

---

# Product Page

Displays

Average Rating

Review Count

Review Cards

Verified Purchase

Images

Review Form

---

# Review Card

Customer Name

↓

Verified Badge

↓

Rating

↓

Title

↓

Comment

↓

Images

↓

Date

---

# Security

Protected APIs

↓

JWT Authentication

↓

Verified Purchase Check

↓

Duplicate Review Prevention

↓

Server-side Validation

---

# Future Improvements

Helpful Votes

Review Images

Video Reviews

Reply to Reviews

Rating Histogram

Review Sorting

Review Search

AI Sentiment Analysis
