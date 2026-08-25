<div align="center">

# 🤫 Anonymous Msg

**A full-stack anonymous messaging platform — like NGL, built from scratch.**  
Send and receive honest, anonymous messages with complete sender privacy.

[![Go](https://img.shields.io/badge/Go-1.25-00ADD8?style=for-the-badge&logo=go&logoColor=white)](https://go.dev/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon-336791?style=for-the-badge&logo=postgresql&logoColor=white)](https://neon.tech/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](LICENSE)

[Live Demo](#) · [Report Bug](https://github.com/SumanSingha05/Anonymous_Msg/issues) · [Request Feature](https://github.com/SumanSingha05/Anonymous_Msg/issues)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Architecture](#-architecture)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [API Reference](#-api-reference)
- [Environment Variables](#-environment-variables)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🔍 Overview

**Anonymous Msg** is a production-grade anonymous messaging platform that allows users to receive honest, anonymous messages from anyone via a shareable personal link — no sender authentication required.

Users register, receive a unique public URL (`/u/:username`), share it on social media, and collect messages in their private inbox. The entire sender chain is stateless — no IPs, no identities, no traces.

```
Sender visits /u/suman → Submits message (no login needed) → Message stored → Suman sees it in Dashboard
```

---

## ✨ Features

| Feature | Details |
|---|---|
| 🔗 **Personal Links** | Every user gets a unique shareable URL (`/u/:username`) |
| 🕵️ **True Anonymity** | Zero sender data collected or stored. No login needed to send. |
| 🎲 **Prompt Dice** | Roll random question prompts that fill directly into the message box |
| 📋 **1-Click Copy & Share** | Instant link copy + WhatsApp & Twitter direct share buttons |
| 🖼️ **Story Card Generator** | Generate Instagram/Snapchat-style story cards for each message |
| 🔍 **Search & Filter** | Full-text search across all received messages in the dashboard |
| 🔐 **JWT Authentication** | Stateless auth with signed JWT tokens and bcrypt password hashing |
| 🎉 **Confetti on Send** | Micro-celebration animation when a message is submitted |
| 📱 **Mobile First** | Fully responsive across all screen sizes |

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────┐
│                      CLIENT LAYER                       │
│          React + TypeScript (Vite) — Netlify CDN        │
│   Landing / Login / Register / Dashboard / /u/:username │
└────────────────────────┬────────────────────────────────┘
                         │ HTTPS (Axios + JWT Bearer Token)
┌────────────────────────▼────────────────────────────────┐
│                      API LAYER                          │
│            Go + Gin Framework — Render/Koyeb            │
│  CORS Middleware → Auth Middleware → Route Handlers     │
└────────────────────────┬────────────────────────────────┘
                         │ GORM ORM
┌────────────────────────▼────────────────────────────────┐
│                    DATABASE LAYER                       │
│            PostgreSQL — Neon Serverless DB              │
│              users table ↔ messages table               │
└─────────────────────────────────────────────────────────┘
```

**Request Flow:**
- Anonymous senders hit `POST /api/v1/messages/:username` — no auth required.
- Authenticated users hit `GET /api/v1/messages` with a `Bearer <token>` header.
- All JWTs are verified by a Gin middleware before protected routes are executed.

---

## 🛠️ Tech Stack

### Backend
| Technology | Version | Role |
|---|---|---|
| [Go](https://go.dev/) | 1.25 | Core runtime |
| [Gin](https://gin-gonic.com/) | 1.12 | HTTP router & middleware |
| [GORM](https://gorm.io/) | 1.31 | ORM + auto-migrations |
| [golang-jwt/jwt](https://github.com/golang-jwt/jwt) | v5 | JWT auth |
| [bcrypt](https://pkg.go.dev/golang.org/x/crypto/bcrypt) | x/crypto | Password hashing |
| [godotenv](https://github.com/joho/godotenv) | 1.5 | `.env` config loading |
| [pgx / PostgreSQL](https://github.com/jackc/pgx) | v5 | Postgres driver |

### Frontend
| Technology | Version | Role |
|---|---|---|
| [React](https://react.dev/) | 19 | UI framework |
| [TypeScript](https://www.typescriptlang.org/) | 5.x | Type safety |
| [Vite](https://vitejs.dev/) | 8.x | Build tool & dev server |
| [React Router DOM](https://reactrouter.com/) | 7.x | Client-side routing |
| [Axios](https://axios-http.com/) | 1.x | HTTP client with interceptors |
| [Lucide React](https://lucide.dev/) | latest | Icon library |
| [canvas-confetti](https://github.com/catdad/canvas-confetti) | 1.x | Confetti animations |

### Infrastructure
| Service | Role |
|---|---|
| [Neon](https://neon.tech/) | Serverless PostgreSQL (free tier) |
| [Render](https://render.com/) / [Koyeb](https://koyeb.com/) | Go backend hosting (free tier) |
| [Netlify](https://netlify.com/) | Frontend hosting & CDN (free tier) |

---

## 📁 Project Structure

```
Anonymous_Msg/
├── backend/                        # Go API server
│   ├── Dockerfile                  # Multi-stage production build
│   ├── railway.json                # Railway deployment config
│   ├── main.go                     # Entry point — DI wiring
│   ├── go.mod / go.sum
│   └── internal/
│       ├── config/
│       │   └── config.go           # Env config loader
│       ├── database/
│       │   ├── database.go         # GORM connection
│       │   └── migrate.go          # Auto-migration runner
│       ├── models/
│       │   ├── user.go             # User entity
│       │   └── message.go          # Message entity
│       ├── repositories/
│       │   ├── user_repository.go  # User DB queries
│       │   └── message_repository.go
│       ├── services/
│       │   ├── user_service.go     # Auth business logic
│       │   └── message_service.go  # Messaging business logic
│       ├── handlers/
│       │   ├── auth_handler.go     # Register / Login / GetMe
│       │   └── message_handler.go  # Send / Inbox endpoints
│       ├── middleware/
│       │   ├── auth_middleware.go  # JWT verification
│       │   └── cors.go             # CORS headers
│       └── routes/
│           └── routes.go           # Route definitions
│
└── frontend/                       # React + TypeScript app
    ├── netlify.toml                # Netlify build config
    ├── vercel.json                 # Vercel SPA rewrites
    ├── public/
    │   └── _redirects              # Netlify SPA routing
    └── src/
        ├── types/index.ts          # Shared TypeScript interfaces
        ├── services/
        │   └── api.ts              # Axios instance + interceptors
        ├── context/
        │   ├── AuthContext.tsx     # Global auth state
        │   └── ThemeContext.tsx    # Light/Dark mode (preserved)
        ├── components/
        │   ├── Navbar.tsx
        │   ├── Footer.tsx
        │   ├── MessageCard.tsx     # Message display + story card
        │   └── ProtectedRoute.tsx
        └── pages/
            ├── LandingPage.tsx
            ├── LoginPage.tsx
            ├── RegisterPage.tsx
            ├── DashboardPage.tsx
            └── SendMessagePage.tsx # Public /u/:username page
```

---

## 🚀 Getting Started

### Prerequisites

| Tool | Minimum Version |
|---|---|
| Go | 1.21+ |
| Node.js | 18+ |
| npm | 9+ |
| PostgreSQL | 14+ (or a Neon account) |

---

### Backend Setup

```bash
# 1. Clone the repository
git clone https://github.com/SumanSingha05/Anonymous_Msg.git
cd Anonymous_Msg/backend

# 2. Install Go dependencies
go mod download

# 3. Configure environment
cp .env.example .env
# Edit .env with your values (see Environment Variables section below)

# 4. Run the development server
go run main.go
```

The API will be live at `http://localhost:3000`.

---

### Frontend Setup

```bash
# From the repository root
cd frontend

# 1. Install dependencies
npm install

# 2. Configure environment
cp .env.example .env
# Set VITE_API_URL=http://localhost:3000/api/v1

# 3. Start the dev server
npm run dev
```

The frontend will be live at `http://localhost:5173`.

---

## 📡 API Reference

### Auth

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/api/v1/auth/register` | ❌ | Create a new account |
| `POST` | `/api/v1/auth/login` | ❌ | Log in and receive a JWT |
| `GET` | `/api/v1/auth/me` | ✅ JWT | Fetch the authenticated user's profile |

### Users

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/api/v1/users/:username` | ❌ | Check if a public profile exists |

### Messages

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/api/v1/messages/:username` | ❌ | Send an anonymous message to a user |
| `GET` | `/api/v1/messages` | ✅ JWT | Fetch all messages in your inbox |

**Example — Send an anonymous message:**
```bash
curl -X POST https://your-backend.onrender.com/api/v1/messages/suman \
  -H "Content-Type: application/json" \
  -d '{"content": "You are genuinely one of the most creative people I know."}'
```

**Example — Login:**
```bash
curl -X POST https://your-backend.onrender.com/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "suman@example.com", "password": "secret123"}'
```

---

## 🔑 Environment Variables

### Backend (`backend/.env`)

```env
PORT=3000
APP_ENV=development
DATABASE_URL=postgresql://user:pass@host/dbname?sslmode=require
JWT_SECRET=your-super-secret-jwt-key-min-32-chars
```

### Frontend (`frontend/.env`)

```env
VITE_API_URL=http://localhost:3000/api/v1
```

> ⚠️ **Never commit `.env` files.** Both are already listed in `.gitignore`.

---

## ☁️ Deployment

### Backend — Render (Free Tier)

The backend includes a production-ready multi-stage [Dockerfile](./backend/Dockerfile).

1. Connect your GitHub repo on [render.com](https://render.com).
2. Set **Root Directory** to `backend`.
3. Select **Docker** as the runtime.
4. Add your environment variables in the Render dashboard.
5. Deploy. Render will build and expose a public HTTPS URL.

### Frontend — Netlify (Free Tier)

The frontend includes a pre-configured [`netlify.toml`](./netlify.toml) and [`_redirects`](./frontend/public/_redirects) file for proper SPA routing.

1. Import your repo on [netlify.com](https://netlify.com).
2. Set **Base directory** to `frontend`.
3. Add `VITE_API_URL` as an environment variable pointing to your Render backend.
4. Deploy. All routes (`/u/:username`, `/dashboard`, etc.) will resolve correctly.

---

## 🤝 Contributing

Contributions are welcome. Please follow these steps:

1. Fork the repository.
2. Create a feature branch: `git checkout -b feat/your-feature-name`
3. Commit your changes: `git commit -m 'feat: add some feature'`
4. Push to the branch: `git push origin feat/your-feature-name`
5. Open a Pull Request against `main`.

Please follow [Conventional Commits](https://www.conventionalcommits.org/) for commit messages.

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

<div align="center">

Built with care by [Suman Singha](https://github.com/SumanSingha05)

</div>
