# Deployment Guide

Version: 1.0.0

---

# Overview

Aniverse consists of two applications.

Frontend

↓

Next.js

Backend

↓

Express.js

Database

↓

MongoDB Atlas

---

# Recommended Deployment

Frontend

Vercel

Backend

Railway

Render

DigitalOcean

AWS EC2

Database

MongoDB Atlas

---

# Folder Structure

aniverse/

client/

server/

---

# Frontend Deployment

Install

npm install

Build

npm run build

Start

npm start

---

# Backend Deployment

Install

npm install

Environment Variables

Configure .env

Run

npm start

---

# Environment Variables

Frontend

NEXT_PUBLIC_API_URL

NEXT_PUBLIC_CASHFREE_ENV

Backend

PORT

JWT_SECRET

MONGO_URI

CLIENT_URL

CASHFREE_APP_ID

CASHFREE_SECRET_KEY

CASHFREE_ENVIRONMENT

---

# Build Process

Client

↓

Build

↓

Deploy

↓

Backend

↓

Deploy

↓

MongoDB

↓

Ready

---

# Production Checklist

HTTPS

Environment Variables

Database Connected

Payments Working

Image Upload

Invoice Generation

Logging Enabled

Error Monitoring

---

# Monitoring

Future

Sentry

Prometheus

Grafana

MongoDB Atlas Monitoring

CloudWatch

---

# Backups

MongoDB Atlas

Daily Backup

Weekly Export

Monthly Archive

---

# Scaling

Redis

CDN

Image Storage

Load Balancer

Docker

Kubernetes
