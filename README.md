# DevPulse API

A collaborative backend API for software teams to report bugs, suggest features, and manage issue workflows efficiently.

---

# 🚀 Live API

🔗 https://devsync-lemon.vercel.app/

---

# 📮 Postman Collection

🔗 https://drive.google.com/file/d/1j7YgWMmDruq_LZZOPlndJjD-jnc0CUHA/view?usp=sharing

---

# 🛠️ Tech Stack

- Node.js
- TypeScript
- Express.js
- PostgreSQL (NeonDB)
- Raw SQL (`pool.query`)
- JWT Authentication
- bcryptjs
- Vercel Deployment

---

# ✨ Features

## Authentication

- User Registration
- User Login
- JWT Authentication
- Protected Routes
- Role-Based Authorization

---

## Issue Management

- Create Issue
- Get All Issues
- Get Single Issue
- Update Issue
- Delete Issue
- Filtering
- Sorting

---

## Security

- Password Hashing with bcrypt
- JWT Token Verification
- Protected Endpoints
- Role Validation Middleware

---

## Error Handling

- Global Error Handler
- 404 Route Handler
- Consistent Error Response Structure

---

# 👥 User Roles

## Contributor

- Register & Login
- Create Issues
- View Issues
- Update Own Open Issues

---

## Maintainer

- All Contributor Permissions
- Update Any Issue
- Delete Any Issue
- Change Issue Status

---

# 📂 Project Structure

```text
src/
├── app.ts
├── server.ts
│
├── config/
│
├── db/
│
├── middleware/
│
├── modules/
│   ├── auth/
│   └── issues/
│
├── types/
│
└── utils/
```

---

# ⚙️ Installation & Setup

## Clone Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_LINK
```

---

## Move Into Project

```bash
cd devpulse
```

---

## Install Dependencies

```bash
npm install
```

---

# 🔑 Environment Variables

Create a `.env` file:

```env
CONNECTION_STRING=your_postgresql_connection_string

PORT=3000

SECRET_KEY=your_secret_key

REFRESH_SECRET_KEY=your_refresh_secret
```

---

# ▶️ Run Project Locally

## Development Mode

```bash
npm run dev
```

---

## Production Build

```bash
npm run build
```

---

## Run Production Server

```bash
npm start
```

---

# 🧪 API Endpoints

# Authentication

| Method | Endpoint           | Access |
| ------ | ------------------ | ------ |
| POST   | `/api/auth/signup` | Public |
| POST   | `/api/auth/login`  | Public |

---

# Issues

| Method | Endpoint          | Access                   |
| ------ | ----------------- | ------------------------ |
| POST   | `/api/issues`     | Authenticated            |
| GET    | `/api/issues`     | Public                   |
| GET    | `/api/issues/:id` | Public                   |
| PATCH  | `/api/issues/:id` | Contributor / Maintainer |
| DELETE | `/api/issues/:id` | Maintainer               |

---

# 🔍 Query Features

## Filtering

```http
GET /api/issues?type=bug
```

```http
GET /api/issues?status=open
```

---

## Sorting

```http
GET /api/issues?sort=newest
```

```http
GET /api/issues?sort=oldest
```

---

# 🗄️ Database Schema

# Users Table

| Field      | Type      |
| ---------- | --------- |
| id         | SERIAL    |
| name       | VARCHAR   |
| email      | VARCHAR   |
| password   | TEXT      |
| role       | VARCHAR   |
| created_at | TIMESTAMP |
| updated_at | TIMESTAMP |

---

# Issues Table

| Field       | Type      |
| ----------- | --------- |
| id          | SERIAL    |
| title       | VARCHAR   |
| description | TEXT      |
| type        | VARCHAR   |
| status      | VARCHAR   |
| reporter_id | INTEGER   |
| created_at  | TIMESTAMP |
| updated_at  | TIMESTAMP |

---

# 🔐 Authentication Flow

1. User logs in
2. Server validates credentials
3. JWT token generated
4. Client sends token in Authorization header
5. Protected routes verify token

---

# 📌 Authorization Header Format

```http
Authorization: YOUR_JWT_TOKEN
```

---

# 🌍 Deployment

## Backend

- Vercel

## Database

- Neon PostgreSQL

---

# 🧠 Important Technical Decisions

- Used Raw SQL only (`pool.query`)
- No ORM used
- No SQL JOIN used
- Reporter data fetched manually from users table
- Modular architecture followed
- Role-based middleware implemented

---

# 👨‍💻 Author

## Zayed Utsho

Computer Science Graduate & MERN Stack Developer

---
