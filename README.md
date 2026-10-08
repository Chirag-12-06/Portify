# Portify

A full-stack portfolio platform with a public-facing site and a companion admin dashboard for managing all portfolio content — projects, skills, certificates, experience, education, and more.

## Overview

Portify is split into three applications plus a Python embedding microservice, all working against a shared PostgreSQL database:

| App        | Description                                                             | Stack                          |
| ---------- | ------------------------------------------------------------------------ | ------------------------------- |
| `client`   | Public portfolio website visitors see                                    | React 19, Vite, Tailwind CSS     |
| `admin`    | Authenticated dashboard for managing portfolio content                   | React 19, Vite, Tailwind CSS, React Hook Form + Zod |
| `backend`  | REST API serving both apps and powering the RAG assistant               | Node.js, Express 5, Prisma, PostgreSQL |
| `embedding-service` | FastAPI service that generates vector embeddings for semantic search | Python, FastAPI, sentence-transformers |

## Features

- **Content management** for projects, skills, certificates, work experience, education, hero/about sections, and social links
- **Public API** for the portfolio site and a separate **authenticated admin API** for content management
- **JWT-based authentication** with HTTP-only cookies for the admin dashboard
- **Image uploads** via Cloudinary (project galleries, certificate badges, profile photos, etc.)
- **Contact form** with message inbox (read/replied status) in the admin dashboard
- **Relational data model** connecting skills and technologies across projects, certificates, and experience
- **GitHub API integration** for pulling project/repo data
- **RAG-powered portfolio assistant** with semantic search over portfolio content, cached Q&A answers, and a Python embedding service

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
- Prisma ORM + PostgreSQL + pgvector
- JWT (`jsonwebtoken`) + `bcrypt` for authentication
- `multer` + Cloudinary for file/image uploads
- Zod for request validation
- RAG pipeline with semantic retrieval and cached Q&A indexing

**AI / RAG Layer**
- FastAPI + Python
- `sentence-transformers` (`all-MiniLM-L6-v2`)
- OpenAI responses for answer generation when needed

## Project Structure

```
Portify/
├── client/            # Public portfolio site
├── admin/             # Admin dashboard
├── backend/           # Express + Prisma REST API
│   ├── src/
│   │   ├── modules/    # Feature modules (project, skill, certificate, experience, rag, ...)
│   │   ├── routes/     # /admin and /public route groups
│   │   ├── middleware/ # Auth & error handling
│   │   ├── config/     # Cookie config, etc.
│   │   └── lib/
│   └── prisma/
│       └── schema.prisma
├── embedding-service/ # FastAPI embedding service used by RAG
│   ├── main.py
│   ├── requirements.txt
│   └── run.bat
└── README.md
```

Each `modules/<feature>` directory exposes an `adminRouter` (auth-protected CRUD) and a `publicRouter` (read-only endpoints) that are mounted under `/api/admin/*` and `/api/public/*` respectively. The RAG feature adds a public `/api/public/rag/ask` endpoint plus admin endpoints for managing cached questions and answers.

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
OPENAI_API_KEY=your-openai-key
EMBEDDING_SERVICE_URL=http://127.0.0.1:8000

# Cloudinary
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

Create a `.env` file in `client/` and `admin/`:

```env
VITE_API_URL=http://localhost:5000/api
```

### 3. Start the RAG embedding service

The RAG feature depends on a FastAPI Python service that generates embeddings for semantic search and cached Q&A retrieval.

```bash
cd embedding-service
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --host 0.0.0.0 --port 8000
```

Or run the bundled Windows helper:

```bash
cd embedding-service
run.bat
```

### 4. Set up the database

```bash
cd backend
npx prisma generate
npx prisma migrate dev
```

### 5. Run the apps

```bash
# Embedding service (http://localhost:8000)
cd embedding-service && uvicorn main:app --host 0.0.0.0 --port 8000

# Backend API (http://localhost:5000)
cd backend && npm run dev

# Public site (http://localhost:5173 by default)
cd client && npm run dev

# Admin dashboard
cd admin && npm run dev
```

## RAG / AI Portfolio Assistant

Portify includes a retrieval-augmented generation assistant that answers questions about the portfolio using semantic search over stored project, certificate, experience, and profile content. The flow is:

1. The user submits a question via the public `/api/public/rag/ask` endpoint.
2. The backend checks for a similar cached Q&A before running a fresh search.
3. Relevant portfolio chunks are matched using vector similarity against the PostgreSQL `pgvector` store.
4. The model generates a grounded answer using the retrieved content and optionally falls back to project/GitHub/LeetCode-specific logic.
5. New answers can be saved and managed from the admin RAG routes under `/api/admin/rag/questions`.

Useful routes:

```http
POST /api/public/rag/ask
  body: { "question": "What projects have you built with React?" }

GET /api/admin/rag/questions
POST /api/admin/rag/questions
GET /api/admin/rag/questions/:id
PATCH /api/admin/rag/questions/:id
DELETE /api/admin/rag/questions/:id
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
