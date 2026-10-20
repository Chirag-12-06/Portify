# Portify

A full-stack portfolio platform with a public-facing site and a companion admin dashboard for managing all portfolio content, including projects, skills, certificates, experience, education, and more.

## Overview

Portify consists of three applications and a Python embedding microservice, all working against a shared PostgreSQL database.

| App | Description | Stack |
|---|---|---|
| `client` | Public portfolio website | React 19, Vite, Tailwind CSS |
| `admin` | Authenticated dashboard for managing portfolio content | React 19, Vite, Tailwind CSS, React Hook Form, Zod |
| `backend` | REST API serving both apps and powering the RAG assistant | Node.js, Express 5, Prisma, PostgreSQL |
| `embedding-service` | FastAPI service that generates vector embeddings for semantic search | Python, FastAPI, sentence-transformers |

## Features

- **Content management** for projects, skills, certificates, work experience, education, hero/about sections, and social links.
- **Public API** for the portfolio site and a separate authenticated admin API for content management.
- **JWT-based authentication** with HTTP-only cookies for the admin dashboard.
- **Image uploads** through Cloudinary.
- **Contact form** with a message inbox and read/replied status in the admin dashboard.
- **Relational data model** connecting skills and technologies across projects, certificates, and experience.
- **GitHub API integration** for retrieving project and repository data.
- **RAG-powered portfolio assistant** with semantic search, cached Q&A answers, and a Python embedding service.
- **Docker integration** for running the Node.js backend in an isolated container without requiring a local PostgreSQL server when using Neon.

## Tech Stack

### Frontend (`client` and `admin`)

- React 19 + Vite
- Tailwind CSS
- TanStack Query
- React Router
- React Hook Form + Zod
- shadcn/ui, Base UI, Framer Motion, Sonner

### Backend

- Node.js + Express 5
- Prisma ORM + PostgreSQL + pgvector
- JWT authentication with `jsonwebtoken` and `bcrypt`
- `multer` + Cloudinary for image uploads
- Zod for request validation
- RAG pipeline with semantic retrieval and cached Q&A indexing

### AI / RAG Layer

- FastAPI + Python
- `sentence-transformers` (`all-MiniLM-L6-v2`)
- OpenAI responses for answer generation when needed

### Containerization

- Docker
- Docker Compose
- Node.js 22 Slim image

## Project Structure

```text
Portify/
├── client/                    # Public portfolio site
├── admin/                     # Admin dashboard
├── backend/
│   ├── src/
│   │   ├── modules/           # Feature modules
│   │   ├── routes/             # Public and admin route groups
│   │   ├── middleware/         # Authentication and error handling
│   │   ├── config/             # Application configuration
│   │   └── lib/
│   ├── prisma/
│   │   └── schema.prisma
│   ├── Dockerfile
│   ├── .dockerignore
│   ├── docker-compose.yml
│   ├── package.json
│   └── package-lock.json
├── embedding-service/
│   ├── main.py
│   ├── requirements.txt
│   └── run.bat
└── README.md
```

## Prerequisites

- Node.js 22 or compatible version for local frontend development.
- Docker Desktop with Docker Compose.
- A PostgreSQL database, such as Neon or Supabase.
- A Cloudinary account for image uploads.
- Python and pip for running the embedding service locally.

## Getting Started

### 1. Clone the repository

```bash
git clone <repo-url>
cd Portify
```

### 2. Install frontend dependencies

```bash
cd client
npm install

cd ../admin
npm install
```

Backend dependencies will be installed inside Docker when the image is built. If you also want to run the backend directly on your host, install them separately:

```bash
cd ../backend
npm install
```

### 3. Configure backend environment variables

Create a `.env` file in `backend/`:

```env
PORT=5000
DATABASE_URL=your_neon_connection_string

JWT_SECRET=your_jwt_secret

ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=your_admin_password

GITHUB_TOKEN=your_github_token
OPENAI_API_KEY=your_openai_api_key

EMBEDDING_SERVICE_URL=http://host.docker.internal:8000

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

Replace the example values with your actual credentials.

**Important:**
- Never commit `.env` files or expose credentials in your repository.
- When using Docker Desktop on Windows or macOS, `host.docker.internal` allows the backend container to reach a service running on the host machine.
- The example embedding URL is for local development. Production deployments must use an embedding service URL accessible from the production backend.
- Keep the database connection pointed at your existing Neon database if you want to continue using it.

### 4. Configure frontend environment variables

Create `.env` files in both `client/` and `admin/`:

```env
VITE_API_URL=http://localhost:5000/api
```

Make sure the frontend API URL matches the address where the backend is running.

### 5. Start the Python embedding service

The RAG functionality depends on the FastAPI embedding service.

Create and activate a virtual environment:

```bash
cd embedding-service
python -m venv venv
```

On Windows PowerShell:

```powershell
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

Start the service:

```bash
uvicorn main:app --host 0.0.0.0 --port 8000
```

The embedding service will be available at:

```text
http://localhost:8000
```

Keep this service running while testing RAG features.

Alternatively, use the bundled Windows helper:

```powershell
.\run.bat
```

## Running the Backend with Docker

The backend can run in Docker while the frontend, embedding service, and database remain where they are.

### 1. Build the Docker image and start the backend

From the `backend/` directory, run:

```bash
docker compose up --build -d
```

This command:

- Builds the backend image using the `Dockerfile`.
- Installs Node.js dependencies inside the container.
- Generates Prisma Client for the Linux container environment.
- Starts the backend on port `5000`.
- Loads environment variables from `backend/.env`.

The backend will be accessible at:

```text
http://localhost:5000
```

### 2. Verify the container

Check its status:

```bash
docker compose ps
```

View backend logs:

```bash
docker compose logs -f backend
```

Press `Ctrl + C` to stop following the logs. This does not stop the container.

### 3. Common Docker commands

Run these commands from `backend/`:

| Task | Command |
|---|---|
| Start the backend | `docker compose up -d` |
| Build and start | `docker compose up --build -d` |
| Recreate the container | `docker compose up -d --force-recreate backend` |
| Check container status | `docker compose ps` |
| View logs | `docker compose logs -f backend` |
| Stop and remove the container | `docker compose down` |

Stopping or removing the backend container does not delete your Neon database.

### 4. Development workflow

The current Dockerfile starts the backend using the existing development script:

```bash
npm run dev
```

However, the current Compose configuration does not mount your source code into the container. If you change backend code, rebuild and restart the container:

```bash
docker compose up --build -d
```

The frontend can continue running locally using Vite.

## Database Setup

Portify uses Prisma ORM to communicate with PostgreSQL.

When using Neon, no local PostgreSQL server or PostgreSQL container is required.

Generate Prisma Client:

```bash
cd backend
npx prisma generate
```

Apply database migrations only when required by your schema changes:

```bash
npx prisma migrate dev
```

**Warning:** Do not run migrations or database synchronization commands casually against a database containing important data. Review schema changes and migration SQL before applying them.

When running Prisma commands from your local terminal, ensure the correct `.env` file and `DATABASE_URL` are being used.

## Running the Applications

### Start the embedding service

```bash
cd embedding-service
uvicorn main:app --host 0.0.0.0 --port 8000
```

### Start the backend with Docker

```bash
cd backend
docker compose up -d
```

### Start the public portfolio website

In another terminal:

```bash
cd client
npm run dev
```

The public website is typically available at:

```text
http://localhost:5173
```

### Start the admin dashboard

In another terminal:

```bash
cd admin
npm run dev
```

Vite will display the actual local URL when the development server starts.

## RAG / AI Portfolio Assistant

Portify includes a retrieval-augmented generation assistant that answers questions about portfolio content.

The request flow is:

1. A visitor submits a question through `POST /api/public/rag/ask`.
2. The backend checks for a similar cached question and answer.
3. Relevant content is retrieved using vector similarity against PostgreSQL's pgvector store.
4. The model generates an answer grounded in the retrieved content.
5. The answer can be cached and managed through the admin RAG routes.

Example public endpoint:

```http
POST /api/public/rag/ask
Content-Type: application/json

{
  "question": "What projects have you built with React?"
}
```

Admin endpoints include:

```http
GET    /api/admin/rag/questions
POST   /api/admin/rag/questions
GET    /api/admin/rag/questions/:id
PATCH  /api/admin/rag/questions/:id
DELETE /api/admin/rag/questions/:id
```

The embedding service must be running and reachable whenever the backend needs to generate embeddings. When using Docker locally, the backend reaches a host-running embedding service through `host.docker.internal`.

## Data Model

The Prisma schema models the portfolio around these core entities:

- **Profile:** Owns the Hero and About sections.
- **Project:** Includes gallery images and linked skills and technologies.
- **Certificate:** Linked to an issuer and relevant skills.
- **Experience:** Includes ordered experience points and associated skills.
- **Education:** Stores education history.
- **SocialLink:** Stores public social profiles.
- **ContactMessage:** Stores contact form submissions.

Join tables allow skills and technologies to be shared across projects, certificates, and experience.

## Deployment Notes

Docker is currently used to run the backend locally. This does not automatically change the production deployment.

For production:

- Configure the production database connection through the hosting platform's environment variables.
- Configure `EMBEDDING_SERVICE_URL` to point to a deployed embedding service, not `host.docker.internal`.
- Keep all API keys and authentication secrets out of source control.
- Ensure the production backend listens on the port expected by the hosting platform.
- Deploy the backend using Docker only if the hosting platform is configured to build and run the Docker image.

The frontend and Neon database can remain on their existing hosting providers.

## Available Scripts

| Application | Script | Description |
|---|---|---|
| Backend | `npm run dev` | Start the backend in development mode |
| Backend | `npm start` | Start the backend in production mode |
| Client | `npm run dev` | Start the public website |
| Client | `npm run build` | Build the public website |
| Admin | `npm run dev` | Start the admin dashboard |
| Admin | `npm run build` | Build the admin dashboard |
| Admin / Client | `npm run lint` | Run linting, if configured |

## License

This project currently has no license specified.