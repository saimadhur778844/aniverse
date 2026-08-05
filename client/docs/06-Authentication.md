# Authentication Documentation

Version: 1.0.0

---

# Overview

Authentication in Aniverse is implemented using JSON Web Tokens (JWT).

Passwords are securely hashed before being stored.

Protected APIs require a valid Bearer Token.

---

# Login Flow

Customer

↓

Login Form

↓

Backend Validation

↓

JWT Generation

↓

Token Returned

↓

Stored on Client

↓

Authorization Header

↓

Protected APIs

---

# Registration Flow

User

↓

Validation

↓

Email Check

↓

Password Hash

↓

User Created

↓

JWT Generated

↓

Logged In

---

# JWT

Payload

{
    id
}

Expiration

Configured using environment variables.

---

# Authorization Header

Authorization

Bearer <token>

Example

Authorization:
Bearer eyJhbGci...

---

# Protect Middleware

Request

↓

Authorization Header

↓

JWT Verification

↓

User Lookup

↓

Attach req.user

↓

Next Middleware

---

# Authentication Routes

POST

/api/auth/register

Purpose

Create new account.

---

POST

/api/auth/login

Purpose

Authenticate user.

---

GET

/api/auth/profile

Purpose

Return logged in user.

Protected

Yes

---

# Password Security

Passwords are hashed before storage.

Plain text passwords are never stored.

Recommended

bcrypt

Minimum Length

8 Characters

---

# Current Roles

Customer

Administrator

Future

Seller

Moderator

Support

---

# Protected Routes

Orders

Checkout

Wishlist

Reviews

Profile

Admin Dashboard

Coupons (Admin)

Inventory (Admin)

Customers (Admin)

---

# Authentication Lifecycle

Register

↓

Receive JWT

↓

Store Token

↓

Send Authorization Header

↓

Backend Validation

↓

Access Protected Resource

---

# Logout

Current

Remove JWT

Future

Token Blacklist

Refresh Tokens

Session Management

---

# Error Responses

401

Unauthorized

403

Forbidden

400

Invalid Credentials

404

User Not Found

---

# Security Best Practices

HTTPS

JWT

Password Hashing

Environment Variables

Protected APIs

Server-side Validation

No Sensitive Data Returned

---

# Future Improvements

Refresh Tokens

Email Verification

Password Reset

Two-Factor Authentication

Google Login

GitHub Login

Discord Login

Magic Link Login

Session Management

---

# Token Storage

Current

Browser Storage

Future

HTTP Only Cookies

---

# Authorization

Customer

↓

Store Features

Administrator

↓

Admin Dashboard

Future

Seller Dashboard

Moderator Tools

---

# Security Checklist

JWT Secret

Strong Passwords

Input Validation

Environment Variables

HTTPS

Protected Routes

Rate Limiting

Helmet

CORS

Logging

Monitoring

---

# Authentication Summary

Authentication is built using JWT with middleware-based protection.

Every protected endpoint validates the incoming token before processing the request.

This architecture keeps the application stateless, scalable, and suitable for future expansion into seller accounts and third-party authentication providers.
