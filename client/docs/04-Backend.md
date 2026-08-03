# Backend Documentation

Version: 1.0.0

---

# Overview

The backend is built using Express.js with MongoDB.

The architecture follows a layered design.

Routes

↓

Controllers

↓

Services

↓

Models

↓

MongoDB

This separation keeps business logic independent of HTTP handling.

---

# Technology Stack

Node.js

Express.js

MongoDB

Mongoose

JWT

Multer

PDFKit

Cashfree SDK

---

# Folder Structure

controllers/

Business entry points

middleware/

Authentication

Validation

Error Handling

models/

MongoDB Schemas

routes/

REST APIs

services/

Business Logic

utils/

Common Helpers

config/

Application Configuration

---

# Request Lifecycle

Browser

↓

Express Route

↓

Middleware

↓

Controller

↓

Service

↓

Database

↓

Response

---

# Routes

Authentication

/api/auth

Products

/api/products

Categories

/api/categories

Orders

/api/orders

Payments

/api/payments

Coupons

/api/coupons

Customers

/api/customers

Inventory

/api/inventory

Dashboard

/api/dashboard

Reviews

/api/reviews

Invoices

/api/invoices

---

# Controllers

Controllers

Receive HTTP Requests

↓

Validate Request

↓

Call Services

↓

Return JSON

Controllers never contain complex business logic.

---

# Services

Services contain all business rules.

Example

Order Service

↓

Validate Stock

↓

Calculate Total

↓

Apply Coupon

↓

Create Order

↓

Reduce Inventory

↓

Return Result

---

# Models

Collections

User

Product

Category

Order

Coupon

Review

Counter

---

# Middleware

Authentication

JWT Verification

↓

Protected Routes

---

Error Handler

Captures all application errors.

Returns consistent API responses.

---

Future Middleware

Rate Limiter

Helmet

Request Logger

Validation

Compression

---

# Authentication

JWT Token

↓

Authorization Header

↓

Protect Middleware

↓

User Loaded

↓

Request Continues

---

# Payment Flow

Order Created

↓

Cashfree Session

↓

Customer Payment

↓

Webhook

↓

Verify Payment

↓

Update Order

↓

Generate Invoice

---

# Review Flow

Delivered Order

↓

Eligibility Check

↓

Create Review

↓

Update Product Rating

↓

Display Review

---

# Coupon Flow

Coupon Code

↓

Validation

↓

Discount Calculation

↓

Order

↓

Payment

↓

Usage Count Updated

---

# Error Handling

Try

↓

Catch

↓

Global Error Handler

↓

JSON Response

---

# Database

MongoDB Atlas

Collections

- Users
- Products
- Categories
- Orders
- Coupons
- Reviews
- Counters

---

# Security

JWT

Password Hashing

Protected APIs

Environment Variables

Secure Payment Gateway

Role-based Authorization (planned)

---

# Scalability

Future

Redis

Docker

RabbitMQ

ElasticSearch

Microservices

AWS

Cloudinary

---

# API Response Format

Success

{
    success: true,
    data: {}
}

Failure

{
    success: false,
    message: "Error"
}

---

# Coding Standards

Controllers remain thin.

Services contain business logic.

Models contain schema definitions.

Routes only register endpoints.

Business logic is never duplicated.

---

# Future Enhancements

API Versioning

Swagger Documentation

Redis Cache

WebSockets

GraphQL

Queue Processing

Automated Testing

Monitoring

CI/CD Pipeline
