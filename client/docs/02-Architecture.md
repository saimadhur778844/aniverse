# Architecture

---

# High Level Architecture

                    +------------------+
                    |     Browser      |
                    +---------+--------+
                              |
                              |
                    HTTPS REST API
                              |
                              ▼
                +-------------------------+
                |       Next.js App       |
                |       (Frontend)        |
                +------------+------------+
                             |
                       Axios API Calls
                             |
                             ▼
                +-------------------------+
                |      Express Server     |
                |        REST API         |
                +------------+------------+
                             |
               +-------------+--------------+
               |                            |
               ▼                            ▼
      MongoDB Database             Cashfree Payment
               |
               ▼
      Product Images

---

# Application Layers

Presentation Layer

↓

Business Layer

↓

Service Layer

↓

Database Layer

---

# Frontend

The frontend is developed using Next.js App Router.

Responsibilities

- Rendering UI
- User Authentication
- Product Pages
- Cart
- Checkout
- Reviews
- Admin Dashboard

---

# Backend

The backend exposes REST APIs.

Responsibilities

- Authentication
- Products
- Categories
- Orders
- Coupons
- Payments
- Inventory
- Reviews

---

# Database

Collections

Users

↓

Products

↓

Categories

↓

Orders

↓

Coupons

↓

Reviews

↓

Counters

---

# Authentication Flow

User

↓

Login

↓

JWT Generated

↓

Stored in Browser

↓

Axios Authorization Header

↓

Backend Middleware

↓

Protected APIs

---

# Payment Flow

Customer

↓

Checkout

↓

Create Order

↓

Apply Coupon

↓

Cashfree Session

↓

Payment

↓

Webhook

↓

Verify Payment

↓

Update Order

↓

Generate Invoice

↓

Order Completed

---

# Order Flow

Cart

↓

Checkout

↓

Order Created

↓

Payment Pending

↓

Payment Success

↓

Confirmed

↓

Processing

↓

Shipped

↓

Delivered

---

# Review Flow

Delivered Order

↓

Review Eligibility

↓

Submit Review

↓

Update Product Rating

↓

Display Reviews

---

# Folder Structure

client/

    app/

    components/

    context/

    hooks/

    services/

    styles/

    types/

server/

    controllers/

    middleware/

    models/

    routes/

    services/

    utils/

---

# Design Principles

- Component Based
- Reusable UI
- Service Layer
- Separation of Concerns
- REST Architecture
- Responsive Design
- Type Safety

---

# Security

JWT Authentication

↓

Protected APIs

↓

Input Validation

↓

Role Based Access

↓

Secure Payment Gateway

---

# Scalability

Future Improvements

- Redis Cache
- Docker
- Kubernetes
- AWS Deployment
- Cloudinary
- Elasticsearch
- RabbitMQ
- Microservices

---

# Deployment

Frontend

↓

Vercel

Backend

↓

Railway / Render / VPS

Database

↓

MongoDB Atlas

Payments

↓

Cashfree

Domain

↓

aniverseofficial.in