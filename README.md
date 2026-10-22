# TechZen Full-Stack Website & CMS Platform

A complete corporate consulting and technology solutions website and CMS portal built with **React 18 + Vite** on the frontend and **Node.js + Express 5 + MongoDB** on the backend.

---

## 🌟 Architecture Overview

```
TechZenWebsite/
├── TechZenFrontend-main/          # React 18 + Vite Frontend Application
│   ├── src/
│   │   ├── admin/                # Admin CMS Portal (/admin)
│   │   │   ├── layout/           # Admin Sidebar & Header
│   │   │   └── modules/          # CMS Modules (Inquiries, Projects, Team, Services, Trainings, FAQs, Company)
│   │   ├── Api/                  # Axios instance, interceptors, token refresh & CMS API service
│   │   ├── Auth/                 # Auth context, route guards (RequireAdmin), login/signup modal
│   │   ├── components/           # Public UI components (Navbar, Hero, Services, Projects, Team, FAQ, Footer)
│   │   ├── pages/                # Public pages (Home, About, Contact, TrainingDetail)
│   │   └── data/                 # Fallback site configuration data
│   ├── .env                      # Frontend environment variables
│   └── package.json
│
├── TechZenBackend-main/           # Express + MongoDB REST API Backend
│   ├── modules/
│   │   ├── cms/                  # CMS controllers & models (Company, FAQ, Projects, Services, Team, Training)
│   │   ├── Inquiry/              # Lead / Inquiry management
│   │   └── user/                 # Authentication, authorization, JWT tokens & user profiles
│   ├── Controller/ & Routes/     # OTP controllers & routing
│   ├── Models/ & Services/       # OTP models & verification services
│   ├── scripts/
│   │   └── seed.js               # Database seeder (Admin account & Company details)
│   ├── dbConfig.js               # Cached MongoDB connection handler
│   ├── app.js                    # Express app configuration & middleware
│   ├── server.js                 # HTTP server entrypoint (Port 5000)
│   ├── .env                      # Backend environment variables
│   └── package.json
│
└── package.json                  # Root runner script configuration
```

---

## 🚀 Quick Start Guide

### 1. Prerequisites
- **Node.js**: v18+ (verified on Node v24.19.0)
- **MongoDB**: Running locally on `mongodb://127.0.0.1:27017` (MongoDB server v8.3.11 verified)

### 2. Environment Configuration

#### Backend (`TechZenBackend-main/.env`)
```env
PORT=5000
NODE_ENV=development
MONGO_DB=mongodb://127.0.0.1:27017/techzen
JWT_ACCESS_TOKEN_SECRET=techzen_access_secret_token_key_dev_2026_secure
JWT_REFRESH_TOKEN_SECRET=techzen_refresh_secret_token_key_dev_2026_secure
FRONTEND_ORIGINS=http://localhost:5173,http://127.0.0.1:5173
COOKIE_SAME_SITE=lax

# Optional Cloudinary image upload configuration
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

#### Frontend (`TechZenFrontend-main/.env`)
```env
VITE_BASE_URL=http://localhost:5000/api
```

---

## 🏃‍♂️ Running the Services

### Root Commands
From the `f:\TechZenWebsite` workspace root:

```bash
# Install all packages for backend & frontend
npm run install:all

# Seed database with initial admin & company profile
npm run seed

# Run backend development server (Port 5000)
npm run backend

# Run frontend development server (Port 5173)
npm run frontend
```

### Alternatively run individually:

**Backend:**
```bash
cd TechZenBackend-main
npm install
npm run seed
npm run dev
# Running on http://localhost:5000
```

**Frontend:**
```bash
cd TechZenFrontend-main
npm install
npm run dev
# Running on http://localhost:5173
```

---

## 🔐 Default Admin Credentials

A default administrator account has been seeded into MongoDB:

- **Email**: `admin@techzen.io`
- **Password**: `Admin@123456`
- **Role**: `admin`
- **Admin Portal URL**: `http://localhost:5173/admin`

---

## 📡 Key API Routes

| Method | Endpoint | Description | Access |
|---|---|---|---|
| `GET` | `/` | Backend health & status check | Public |
| `POST` | `/api/v1/user/login` | User/Admin authentication & token issue | Public |
| `POST` | `/api/v1/user/signup` | User registration with OTP validation | Public |
| `GET` | `/api/v1/user/refresh-token` | Automatic JWT access token renewal | Authenticated |
| `POST` | `/api/v1/inquiry/register` | Submit contact / service inquiry | Public |
| `GET` | `/api/v1/inquiry/all-inquiry` | View all submitted inquiries | Admin only |
| `PUT` | `/api/v1/inquiry/update/:id` | Update inquiry resolution status | Admin only |
| `GET` | `/api/v1/company` | Fetch public company details | Public |
| `PUT` | `/api/v1/company` | Update company information & social links | Admin only |
| `GET` | `/api/v1/projects` | Fetch published portfolio projects | Public |
| `GET` | `/api/v1/trainings` | Fetch published training programs | Public |
| `GET` | `/api/v1/admin/overview` | Fetch CMS analytics & metrics overview | Admin only |
