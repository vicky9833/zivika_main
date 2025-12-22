# Zivika Labs Health Twin

A comprehensive health management application that creates a digital twin of your health profile, manages your health records, and provides personalized health insights.

## Features

- Digital Health Twin
- Health ID Creation
- Health Locker for storing medical records
- Family Health Manager
- Health Analytics
- Wearable Health Data Integration
- Doctor Dashboard
- Patient Dashboard
- Notification Center
- Multi-language Support

## Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- Shadcn UI Components
- React Router
- React Query
- React Hook Form
- Zod (for validation)

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd arogya-ai-health-twin

# Install dependencies
npm install

# Start the development server
npm run dev
```

The application will be available at http://localhost:5173 (or another port if 5173 is in use).

### Building for Production

```bash
npm run build
```

This will create a `dist` directory with the built application.

## Deployment

This application is configured for deployment on:

- Vercel
- Render
- Netlify

See the [Deployment Guide](./DEPLOYMENT.md) for detailed instructions.

### Netlify Guide

- Connect repository `vicky-a1/zivikalabs` on Netlify
- Build settings:
  - Build command: `npm run build`
  - Publish directory: `dist`
  - Node version: `20` (see `netlify.toml`)
- Environment variables:
  - `VITE_API_BASE`: URL of your backend (e.g., `https://your-render-service.onrender.com/api`)
- Backend deployment:
  - Deploy `server` to a Node host (e.g., Render). Set `PORT`, `JWT_SECRET`, `DATABASE_URL` (optional), `GROQ_API_KEY`
  - Ensure CORS allows Netlify domain if you skip proxying

## Environment Variables

Copy the `.env.example` file to `.env` and update the values as needed.

```bash
cp .env.example .env
```

## Backend API

- Auth
  - `POST /api/auth/register` body `{ email, password, name }`
  - `POST /api/auth/login` body `{ email, password }`
- AI
  - `POST /api/ai/symptom-check` header `Authorization: Bearer <token>`, body `{ text }`
  - `POST /api/ai/extract-features` header `Authorization: Bearer <token>`, body `{ text }`
- Records
  - `GET /api/records` header `Authorization: Bearer <token>`
  - `POST /api/records` header `Authorization: Bearer <token>`, body `{ type, title, data }`
- Wearables
  - `POST /api/wearables/ingest` header `Authorization: Bearer <token>`, body `{ source, payload }`
- System
  - `GET /api/health`
  - `GET /api/metrics`

### Running backend locally

```bash
npm run server:dev
```

Set `GROQ_API_KEY` in `.env` to enable cloud AI. Without it, a local heuristic is used.

### Run frontend and backend together

```bash
npm run dev:full
```

## License

MIT
