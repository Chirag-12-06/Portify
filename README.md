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

## Chatbot / RAG Assistant Architecture

The portfolio chatbot is a retrieval-augmented generation (RAG) system. It answers
questions about the portfolio and can enrich selected questions with live GitHub
or LeetCode data. The implementation is primarily in
[`backend/src/modules/rag/`](./backend/src/modules/rag/), with a public chat
interface in [`client/src/features/rag/`](./client/src/features/rag/) and a
separate embedding service in [`embedding-service/`](./embedding-service/).

### What is implemented today

- **Public, single-turn chat:** the client sends one question at a time to
  `POST /api/rag/ask`. Conversation history is kept only in the browser's
  React state; there is no server-side conversation, user, or message model.
- **Answer reuse:** the backend embeds the incoming question and searches
  published `RagQuestion` records. A cosine similarity of `0.85` or higher
  returns the stored answer without calling the LLM.
- **Intent/entity routing:** keyword rules classify questions as `GITHUB`,
  `LEETCODE`, `PROJECT`, `CERTIFICATE`, or `EXPERIENCE`. Database names for
  skills, technologies, and projects are matched by normalized substring search.
- **Structured retrieval:** exact project/certificate matches, then skill or
  technology relationships, are used before semantic retrieval.
- **Vector fallback:** the question is embedded and the five nearest
  `RagChunk` records are retrieved from PostgreSQL using pgvector.
- **Live external sources:** GitHub and LeetCode questions call their existing
  service integrations and pass the returned data directly to the LLM.
- **Answer generation:** OpenAI `gpt-4o-mini` receives a base prompt, a
  source-specific prompt, the question, and retrieved context.
- **Automatic Q&A persistence:** a newly generated answer is stored as a
  published `RagQuestion`, making later semantically similar questions cheaper
  and faster. Admins can curate, edit, publish, or delete these records.

### Runtime architecture

```text
┌──────────────────────┐
│ Public React client  │
│ RagChatBox           │
└──────────┬───────────┘
           │ POST /api/rag/ask
           v
┌─────────────────────────────────────────────────────────┐
│ Node/Express backend                                    │
│ rag.controller -> querying/rag.service                  │
│                                                         │
│ 1. Q&A vector lookup (RagQuestion)                      │
│ 2. Keyword/entity routing                               │
│ 3. Structured DB retrieval or RagChunk vector lookup    │
│ 4. GitHub/LeetCode service for live-source questions    │
│ 5. Prompt assembly and OpenAI response                  │
│ 6. Persist generated answer as RagQuestion               │
└───────┬──────────────────┬─────────────────────┬────────┘
        │                  │                     │
        v                  v                     v
┌───────────────┐  ┌─────────────────┐  ┌─────────────────┐
│ PostgreSQL    │  │ Embedding API   │  │ OpenAI API      │
│ + pgvector    │  │ FastAPI :8000   │  │ gpt-4o-mini    │
│ portfolio +   │  │ MiniLM 384 dims │  │ answer         │
│ RAG records   │  └─────────────────┘  └─────────────────┘
└───────────────┘
```

The public route is mounted by [`backend/src/routes/public.js`](./backend/src/routes/public.js)
under `/api/rag`, and the same RAG router is mounted under the authenticated
admin route by [`backend/src/routes/admin.js`](./backend/src/routes/admin.js).
The admin UI manages the Q&A knowledge base; it does not currently expose a
conversation-management or indexing-job UI.

### End-to-end query flow

1. [`RagChatBox.jsx`](./client/src/features/rag/components/RagChatBox.jsx)
   validates that the input is non-empty, appends the user message locally,
   and calls the TanStack Query mutation in `useRag.js`.
2. `POST /api/rag/ask` validates the question and trims it in
   [`rag.controller.js`](./backend/src/modules/rag/rag.controller.js).
3. [`question.search.service.js`](./backend/src/modules/rag/services/core/querying/question.search.service.js)
   calls the embedding service and searches published `RagQuestion` rows.
4. If no Q&A answer meets the `0.85` threshold,
   [`term-match.service.js`](./backend/src/modules/rag/services/core/querying/term-match.service.js)
   detects the source type and matching portfolio entities.
5. GitHub and LeetCode routes bypass portfolio chunks and fetch live
   integration data. Portfolio questions use
   [`chunk.extractor.service.js`](./backend/src/modules/rag/services/core/querying/chunk.extractor.service.js):
   exact entity/relationship retrieval is attempted first, followed by
   `RagChunk` vector search with `topK = 5`.
6. [`answer.service.js`](./backend/src/modules/rag/services/core/querying/answer.service.js)
   builds the prompt and calls OpenAI. The answer is returned with its source
   and whether it was cached.
7. If it was generated rather than reused, the controller creates a published
   Q&A row and generates its question embedding.

The response shape is:

```json
{
  "success": true,
  "data": {
    "answer": "Generated or cached answer",
    "source": "PROJECT",
    "cached": false
  }
}
```

### Knowledge/indexing flow

RAG documents are projections of portfolio records, not independent source
content. The document builders in
[`services/source/`](./backend/src/modules/rag/services/source/) convert
projects, certificates, and experiences into plain text. The indexing pipeline
in [`index.service.js`](./backend/src/modules/rag/services/core/indexing/index.service.js)
then:

1. Upserts one `RagDocument` by `(sourceType, sourceId)`.
2. Normalizes the text and creates 500-character chunks with 100-character
   overlap.
3. Sends all chunks to the embedding service.
4. Deletes existing chunks for that document.
5. Inserts new 384-dimensional vectors into `RagChunk`.

The batch re-indexing scripts are:

- [`index-all-projects.js`](./backend/src/modules/rag/services/reindexing/index-all-projects.js)
- [`index-all-certificates.js`](./backend/src/modules/rag/services/reindexing/index-all-certificates.js)
- [`index-all-experiences.js`](./backend/src/modules/rag/services/reindexing/index-all-experiences.js)

These are scripts rather than an automatic event-driven indexing pipeline.
Therefore, a portfolio edit does not automatically make its RAG document
current unless the relevant indexing service/script is invoked. A production
architecture should define whether indexing is synchronous, queued, scheduled,
or triggered by an outbox/event.

### Storage model

The RAG schema is defined in
[`backend/prisma/schema.prisma`](./backend/prisma/schema.prisma):

| Entity | Responsibility |
|---|---|
| `RagDocument` | One indexed projection of a source portfolio entity; stores source type, source ID, title, skills, and technologies. |
| `RagChunk` | Chunk text plus a `vector(384)` embedding; cascades when its document is removed. |
| `RagQuestion` | Curated or automatically generated question/answer cache, including a nullable `vector(384)` question embedding and publication flag. |

PostgreSQL's `vector` extension is enabled by the
[`20260818111451_add_rag_models` migration](./backend/prisma/migrations/20260818111451_add_rag_models/migration.sql).
The current queries use pgvector distance ordering, but there is no explicit
HNSW/IVFFlat index in the migration. That is acceptable for a small portfolio
but should be evaluated as the corpus grows.

### Service boundaries and contracts

| Service | Owns | Contract/dependency |
|---|---|---|
| Public client | Chat UX, local message history, loading/error state | Calls backend `/api/rag/ask`; does not call LLM or embeddings directly. |
| Admin client | Q&A CRUD | Calls authenticated `/api/admin/rag/questions` routes through the shared backend. |
| Backend RAG module | Validation, routing, retrieval, prompt orchestration, persistence | Requires PostgreSQL, embedding service, OpenAI, and optional GitHub/LeetCode integrations. |
| Embedding service | Batch text-to-vector conversion | `POST /embed` with `{ "texts": ["..."] }`; returns `{ "embeddings": [[...]] }`; model output must remain 384 dimensions. |
| PostgreSQL/pgvector | Source data, indexed chunks, Q&A cache | Requires the `vector` extension and the migrations applied. |
| OpenAI | Final answer generation | Receives prompts and portfolio/live integration context; requires `OPENAI_API_KEY`. |

For local Docker development, `EMBEDDING_SERVICE_URL` must resolve from the
backend container to the embedding HTTP endpoint, commonly
`http://host.docker.internal:8000/embed` when the service runs on the host.
The backend's Axios call posts directly to the configured URL, so the `/embed`
path must be included unless a proxy supplies it.

### Admin Q&A API

All admin routes require the existing cookie/JWT authentication middleware:

```http
GET    /api/admin/rag/questions
POST   /api/admin/rag/questions
GET    /api/admin/rag/questions/:id
PATCH  /api/admin/rag/questions/:id
DELETE /api/admin/rag/questions/:id
```

Create/update validation is handled by
[`rag.validation.js`](./backend/src/modules/rag/rag.validation.js). Updating a
question regenerates its embedding; changing only the answer does not. The
current create service always inserts `isPublished = true`, so callers should
not assume the optional `isPublished` input controls initial publication until
that behavior is intentionally changed.

### Important architecture decisions for a complete system design

Before drawing a final production architecture, decide and document these
boundaries:

1. **Conversation scope:** keep single-turn chat, or add `Conversation` and
   `Message` entities, retention, anonymous session IDs, authenticated users,
   and a maximum context window.
2. **Retrieval strategy:** keep keyword routing plus vector fallback, or add a
   classifier/router, hybrid lexical+vector search, reranking, metadata
   filters, and source-specific top-k values.
3. **Freshness:** re-index synchronously after admin writes, enqueue jobs,
   run a scheduled full re-index, or use an outbox with retries and
   idempotency. Define behavior while an index is stale.
4. **Answer trust:** return citations/source IDs and similarity scores, enforce
   a minimum retrieval score, distinguish “not found” from “generation
   failed,” and prevent the model from inventing facts outside context.
5. **External integrations:** define timeouts, retries, rate limits, caching,
   stale-data policy, and fallback behavior for GitHub and LeetCode outages.
6. **LLM policy:** select models per intent, set token/output limits, redact
   sensitive input, protect prompts, and decide whether user questions may be
   sent to a third party.
7. **API protection:** add request size limits, per-IP/session rate limiting,
   abuse detection, CORS allow-list management, timeouts, and structured
   request IDs. The public route is currently unauthenticated.
8. **Operational state:** expose readiness checks for database, embedding
   model, and LLM dependencies; record latency and failure metrics for
   embedding, retrieval, external APIs, and generation.
9. **Deployment topology:** decide whether the embedding model is colocated
   with the backend, deployed as a private service, or replaced by a hosted
   provider. Plan CPU/RAM requirements and model download/caching.
10. **Consistency and rollback:** version the embedding model, chunking
    settings, prompts, and source document version. Re-index into a new
    version before switching traffic so a failed re-index does not destroy
    the previous index.

### Current limitations and risks

- There are no persisted conversations, streaming responses, feedback signals,
  citations, or per-answer audit records.
- Automatically generated answers become published cache entries. Incorrect
  answers can therefore be reused until an admin removes or edits them.
- A `0.85` similarity threshold is a starting heuristic, not a measured
  quality boundary. It should be calibrated against a representative
  evaluation set.
- The retrieval path can return chunks from any visibility state unless source
  document builders/indexing explicitly enforce the public visibility policy.
- Chunk replacement deletes old chunks before inserting new ones; a failed
  embedding or insert can leave a document with no chunks. Re-indexing should
  be transactional or use versioned indexes.
- Embedding and OpenAI calls have no visible timeout, retry, circuit-breaker,
  or cost budget in the current RAG module.
- The embedding service loads the model lazily and has a basic health response,
  but its health endpoint does not verify that the model is loaded or usable.
- The browser renders assistant Markdown. If the Markdown renderer or its
  URL policy is not explicitly constrained, links and rich output should be
  reviewed as an untrusted-output surface.
- The client currently keeps message state in memory, so a refresh or route
  change loses the conversation.

### Recommended target architecture

For a production-ready version, use these logical components even if some
remain in one deployable backend:

```text
Client
  -> API gateway/rate limiter
  -> Chat API
       -> Query normalizer + intent router
       -> Q&A cache
       -> Hybrid retriever (metadata + keyword + vector)
       -> Reranker / confidence gate
       -> Context builder with source citations
       -> LLM adapter
       -> Answer validator and safety policy
       -> Conversation/message store (optional)

Admin write
  -> Portfolio transaction
  -> Outbox event
  -> Index worker
       -> document builder
       -> chunker
       -> embedding provider
       -> versioned vector index

Observability
  -> structured logs, traces, metrics, prompt/token cost, retrieval quality,
     cache hit rate, external API health, and user feedback
```

The key design principle is to keep source-of-truth portfolio data separate
from derived RAG data. The database remains authoritative; documents, chunks,
embeddings, cached answers, and conversation summaries are rebuildable
artifacts with explicit versioning and freshness metadata.

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