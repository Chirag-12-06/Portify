# Portify

A full-stack portfolio platform with a public-facing site and a companion admin dashboard for managing all portfolio content — projects, skills, certificates, experience, education, and more.

## Overview

Portify is split into three applications sharing a single PostgreSQL database:

| App        | Description                                                             | Stack                          |
| ---------- | ------------------------------------------------------------------------ | ------------------------------- |
| `client`   | Public portfolio website visitors see                                    | React 19, Vite, Tailwind CSS     |
| `admin`    | Authenticated dashboard for managing portfolio content                   | React 19, Vite, Tailwind CSS, React Hook Form + Zod |
| `backend`  | REST API serving both apps                                               | Node.js, Express 5, Prisma, PostgreSQL |

## Features

- **Content management** for projects, skills, certificates, work experience, education, hero/about sections, and social links
- **Public API** for the portfolio site and a separate **authenticated admin API** for content management
- **JWT-based authentication** with HTTP-only cookies for the admin dashboard
- **Image uploads** via Cloudinary (project galleries, certificate badges, profile photos, etc.)
- **Contact form** with message inbox (read/replied status) in the admin dashboard
- **Relational data model** connecting skills and technologies across projects, certificates, and experience
- **GitHub API integration** for pulling project/repo data

## Tech Stack

**Frontend (`client` & `admin`)**
- React 19 + Vite
- Tailwind CSS
- TanStack Query for data fetching/caching
- React Router
- React Hook Form + Zod (admin forms)
- shadcn/ui, Base UI, Framer Motion, Sonner (toasts)

**Backend**
- Node.js + Express 5
- Prisma ORM + PostgreSQL
- JWT (`jsonwebtoken`) + `bcrypt` for authentication
- `multer` + Cloudinary for file/image uploads
- Zod for request validation

## Project Structure

```
Portify/
├── client/    # Public portfolio site
├── admin/     # Admin dashboard
└── backend/   # Express + Prisma REST API
    ├── src/
    │   ├── modules/     # Feature modules (project, skill, certificate, experience, ...)
    │   ├── routes/      # /admin and /public route groups
    │   ├── middleware/  # Auth & error handling
    │   ├── config/       # Cookie config, etc.
    │   └── lib/
    └── prisma/
        └── schema.prisma
```

Each `modules/<feature>` directory exposes an `adminRouter` (auth-protected CRUD) and a `publicRouter` (read-only endpoints) that are mounted under `/api/admin/*` and `/api/public/*` respectively.

## Prerequisites

- Node.js 18+
- A PostgreSQL database (e.g. [Neon](https://neon.tech), [Supabase](https://supabase.com), or local Postgres)
- A [Cloudinary](https://cloudinary.com) account for image uploads

## Getting Started

### 1. Clone and install dependencies

```bash
git clone <repo-url>
cd Portify

cd backend && npm install
cd ../client && npm install
cd ../admin && npm install
```

### 2. Configure environment variables

Create a `.env` file in `backend/`:

```env
PORT=5000
DATABASE_URL=postgresql://user:password@host:port/dbname

JWT_SECRET=your-jwt-secret

ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=your-admin-password

GITHUB_TOKEN=your-github-token

# Cloudinary
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

Create a `.env` file in `client/` and `admin/`:

```env
VITE_API_URL=http://localhost:5000/api
```

### 3. Set up the database

```bash
cd backend
npx prisma generate
npx prisma migrate dev
```

### 4. Run the apps

```bash
# Backend API (http://localhost:5000)
cd backend && npm run dev

# Public site (http://localhost:5173 by default)
cd client && npm run dev

# Admin dashboard
cd admin && npm run dev
```

## Data Model

The Prisma schema (`backend/prisma/schema.prisma`) models a portfolio around these core entities:

- **Profile** — owns `Hero` and `About` sections
- **Project** — with gallery images, linked `Skill`s and `Tech`nologies
- **Certificate** — issued by an `Issuer`, linked to `Skill`s
- **Experience** — with ordered bullet points (`ExperiencePoint`) and linked `Skill`s
- **Education**, **SocialLink**, **ContactMessage**

Skills and technologies are shared across projects, certificates, and experience via join tables, so updating a skill once reflects everywhere it's used.

## Available Scripts

Each app (`client`, `admin`, `backend`) exposes:

```bash
npm run dev      # Start in development mode
npm run build    # Production build (client/admin)
npm run start    # Start backend in production mode
npm run lint      # Lint (client/admin)
```

## License

This project currently has no license specified.
