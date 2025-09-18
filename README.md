# Disruptica Monorepo

This repository contains both **backend** (Node.js + Express + TypeScript) and **frontend** (React + Typescript + Vite) projects.  
Docker and Docker Compose are used to orchestrate the services.

---

## Project Structure

```
├── backend-disruptica/ # Backend service (Node.js + Express + TS)
├── frontend-disruptica/ # Frontend service (React + Vite)
├── docker-compose.yml # Docker Compose configuration
├── .env # Shared environment variables
└── README.md # Project documentation
```

---

## Requirements

- [Node.js](https://nodejs.org/) v20+ (for local dev)
- [Docker](https://docs.docker.com/get-docker/) and [Docker Compose](https://docs.docker.com/compose/)

---

## Environment Variables

All secrets and config are managed in a `.env` file at the **root of the project**.

Example:

```env
# Backend
JWT_SECRET_KEY = MySecretKey
CORS_WHITELIST = http://localhost:5173
PORT = 3000
```

In the frontend project, you need to add the `.env` file.

If you want to run the project locally, you need to create a `.env` file in the `backend-disruptica` folder.

---

## Running the Project

### 1. Clone the repository

```bash
git clone https://github.com/gabrielceh/disruptica-test.git
cd disruptica
```

### 2. Create a `.env` file

Copy the `.env.example` file and rename it to `.env`:


### 3. Start with Docker Compose

```bash
docker-compose up --build
```

This will:
- Start the backend on port 3000
- Start the frontend on port 5173 (served via Nginx)

Access:
- Backend API → http://localhost:3000
- Frontend App → http://localhost:5173

---

## Development (without Docker)

### Backend

```bash
cd backend-disruptica
npm install
npm run dev
```
Runs backend at http://localhost:3000.

### Frontend

```bash
cd frontend-disruptica
npm install
npm run dev
```
Runs frontend at http://localhost:5173.

---

## Login

```
user: admin@app.com
password: 123456789

user: user@app.com
password: 123456789
```