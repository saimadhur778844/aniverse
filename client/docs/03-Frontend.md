# Frontend Documentation

Version: 1.0.0

---

# Overview

The frontend is built using Next.js App Router with TypeScript.

The application is fully responsive and follows a component-based architecture.

The goal is to keep business logic separated from presentation while maximizing component reusability.

---

# Technology Stack

Framework

- Next.js 16

Language

- TypeScript

Styling

- Tailwind CSS
- CSS Modules

HTTP Client

- Axios

Icons

- Lucide React

State Management

- React Context API

Authentication

- JWT

---

# Folder Structure

app/

Contains all pages.

components/

Reusable UI components.

context/

Application state.

hooks/

Custom React hooks.

services/

API communication.

types/

TypeScript interfaces.

styles/

Global styling.

docs/

Project documentation.

---

# Application Structure

App

↓

Layout

↓

Providers

↓

Pages

↓

Components

↓

Services

↓

Backend API

---

# App Router

Main Pages

Home

/

Products

/products

Product Details

/products/[slug]

Cart

/cart

Wishlist

/wishlist

Checkout

/checkout

Orders

/orders

Order Details

/orders/[id]

Payment Success

/payment-success

Payment Failed

/payment-failed

Profile

/profile

Admin

/admin

---

# Components

Shared Components

Button

Card

Modal

Loader

TextField

TextArea

SectionCard

SectionTitle

---

# Store Components

Navbar

Hero

Anime Grid

Product Card

Product Gallery

Product Info

Wishlist

Cart

Checkout

Reviews

Invoice

---

# Admin Components

Dashboard

Product Table

Category Table

Inventory

Customers

Orders

Coupons

Charts

Review Management

---

# Context Providers

Authentication

Responsible for

- Login
- Logout
- User Session
- JWT Storage

---

Cart Context

Responsible for

- Add Item
- Remove Item
- Quantity
- Cart Total
- Shipping

---

Wishlist Context

Responsible for

- Wishlist Items
- Add Wishlist
- Remove Wishlist

---

# Service Layer

Every API call goes through the service layer.

Example

ProductService

↓

Axios

↓

REST API

↓

Backend

Never call Axios directly inside components.

---

# Styling

The application uses

Tailwind CSS

for layouts

CSS Modules

for reusable component styling.

---

# Theme

Primary

Pink

Secondary

Purple

Background

Dark

Cards

Dark Surface

Accent

Gold

---

# Responsive Design

Mobile First

Breakpoints

sm

640px

md

768px

lg

1024px

xl

1280px

2xl

1536px

---

# State Management

React Hooks

useState

↓

useEffect

↓

Context API

↓

Server APIs

---

# Loading States

Skeleton Components

↓

API Fetch

↓

Content Loaded

---

# Error Handling

Loading

↓

Error

↓

Retry

↓

Success

---

# Image Handling

Current

Local Uploads

Future

Cloudinary

AWS S3

---

# Best Practices

Keep components small.

Avoid duplicated logic.

Reuse shared components.

Use services for API calls.

Maintain strict typing.

Prefer composition over inheritance.

---

# Performance

Image Optimization

↓

Lazy Loading

↓

Code Splitting

↓

Dynamic Imports

↓

Memoization

---

# Future Improvements

Dark / Light Theme

Internationalization

Offline Support

PWA

Accessibility Improvements

Storybook

Component Testing
