# Disruptica Monorepo

This repository contains both the backend (Node.js + Express + TypeScript) and frontend (React + TypeScript + Vite) projects.
All services are orchestrated with Docker Compose.

---

## Project Structure

```bash
├── backend-disruptica/   # Backend service (Express + TypeORM + PostgreSQL)
├── frontend-disruptica/  # Frontend service (React + Vite + TS)
├── docker-compose.yml    # Docker Compose configuration
├── .env                  # Environment variables (root)
└── README.md             # Project documentation

```

---

## Tech Stack

### Backend

- Node.js + Express – REST API
- TypeORM + PostgreSQL – ORM and database
- JWT – Authentication
- Bcrypt – Password hashing
- CORS

### Frontend

- React + TypeScript + Vite
- Axios – API calls
- Shadcn/UI + TailwindCSS – UI components & styling
- Zod – Schema validation
- Zustand – State management
  
---

## Requirements

[Docker](https://docs.docker.com/get-started/get-docker/) + [Docker Compose](https://docs.docker.com/compose/)

(Optional) Node.js v20+ if running services outside Docker

---

## Environment Variables

All environment variables are defined in a .env file at the project root.

Example:

```env

JWT_SECRET_KEY="thisIsMySuperSecretKey;XD..ItsNotSoSecret++"

# These are the default credentials already configured in docker-compose.yml.

CORS_WHITELIST="http://localhost:5173"
POSTGRES_USER=admin
POSTGRES_PASSWORD=admin123
POSTGRES_DB=hospital
PORT=3000
```

---

## Running the Project

### 1. Clone the repository

```bash
git clone https://github.com/gabrielceh/disruptica-test.git
cd disruptica-test
```

### 2. Create a .env file

At the root of the project, create a .env file with the required environment variables.

```env

JWT_SECRET_KEY="thisIsMySuperSecretKey;XD..ItsNotSoSecret++"

# These are the default credentials already configured in docker-compose.yml.

CORS_WHITELIST="http://localhost:5173"
POSTGRES_USER=admin
POSTGRES_PASSWORD=admin123
POSTGRES_DB=hospital
PORT=3000
```

### 3. Start with Docker Compose

Run the following command from the root of the monorepo:

```bash
docker-compose up --build
```

This will:

- Start the PostgreSQL database on port 5432
- Start the Backend API on port 3000
- Start the Frontend App (served via Nginx) on port 5173

Access:

- Backend API → http://localhost:3000
- Frontend App → http://localhost:5173

---

## ⚠️ IMPORTANT: Database Seeding

Once the services are up, you must initialize the database with seed data.
Run the following endpoint in your browser or with a tool like Postman:

```http
GET http://localhost:3000/seed
```

This step is mandatory. Without it, the database will be empty and you won’t be able to test the application.

---

## Test credentials

You can log in with the following default credentials:

```bash
# Admin
Email: admin@app.com
Password: pass123456789

# User
Email: user@app.com
Password: pass123456789
```

---

## Notes

- Seed endpoint must be executed once per fresh database.
- Passwords are securely hashed using bcrypt.
- The project follows a monorepo structure with clear separation of backend and frontend.