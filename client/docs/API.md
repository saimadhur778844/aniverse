# API Documentation

Base URL

/api

---

Authentication

POST /auth/register

POST /auth/login

GET /auth/profile

---

Products

GET /products

GET /products/:slug

POST /products

PUT /products/:id

DELETE /products/:id

---

Categories

GET /categories

POST /categories

PUT /categories/:id

DELETE /categories/:id

---

Orders

POST /orders

GET /orders/my-orders

GET /orders/:id

PATCH /orders/:id/cancel

POST /orders/:id/reorder

GET /orders/reviewable/:productId

---

Payments

POST /payments/create-session

GET /payments/verify/:orderId

POST /payments/webhook

---

Coupons

GET /coupons

POST /coupons

PUT /coupons/:id

DELETE /coupons/:id

POST /coupons/validate

---

Reviews

GET /reviews/product/:productId

POST /reviews

PUT /reviews/:id

DELETE /reviews/:id

GET /reviews

PATCH /reviews/:id/toggle

---

Invoices

GET /invoices/:orderId