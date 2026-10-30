# Raksham Admin Panel — Frontend

Raksham is an AI-guided legal assistance platform for Indian citizens. This repository is the **administrative frontend**, a separate application from the citizen-facing web app and the backend. It will eventually let authorized administrators manage citizen accounts, advocate verification, legal resources, support tickets, and other approved platform operations.

**Current phase:** Phase 1, project scaffolding only. The admin UI design and all application features have **not** been implemented yet; they will follow once design references and requirements are supplied. There is no routing, authentication, state management, or backend integration.

## Technology stack

- React 19 (JavaScript / JSX, no TypeScript)
- Vite 8
- Tailwind CSS 4 (via `@tailwindcss/vite`; no PostCSS or `tailwind.config.js` needed)
- ESLint 10 (flat config)

## Prerequisites

- Node.js 20.19+ (set up on Node 24)
- npm

## Getting started

```bash
npm install
npm run dev
```

The dev server runs at http://localhost:5173 by default.

## Scripts

| Command           | Description                         |
| ----------------- | ----------------------------------- |
| `npm run dev`     | Start the development server        |
| `npm run build`   | Create a production build (`dist/`) |
| `npm run preview` | Preview the production build        |
| `npm run lint`    | Run ESLint                          |

## Folder structure

```
public/                  Static files served as-is (favicon.svg, assets/)
src/
├── app/                 Application-level setup (reserved)
├── assets/              Imported static assets (reserved)
├── components/
│   ├── common/          Reusable shared components (reserved)
│   ├── layout/          Layout components (reserved)
│   └── ui/              UI primitives (reserved)
├── features/            One folder per admin domain (all reserved):
│   ├── dashboard/  citizen-management/  advocate-verification/
│   ├── legal-resources/  support-tickets/  consultations/
│   └── payments/  notifications/  analytics/  admin-management/  audit-logs/
├── hooks/               Shared React hooks (reserved)
├── lib/                 Third-party wrappers and helpers (reserved)
├── services/            Backend communication (reserved)
├── styles/              Global stylesheet (index.css imports Tailwind)
├── utils/               Pure utility functions (reserved)
├── App.jsx              Placeholder root component
└── main.jsx             Entry point
```

Directories containing only a `.gitkeep` are placeholders for planned work and hold no logic. Deviation from the planned structure: none.

## Environment variables

Copy `.env.example` to `.env` for local overrides. `.env` files are git-ignored; `.env.example` is tracked.

| Variable            | Purpose                                                                                      |
| ------------------- | -------------------------------------------------------------------------------------------- |
| `VITE_API_BASE_URL` | Backend API base URL. The example value is illustrative; match the backend team's setup.     |

Variables prefixed with `VITE_` are embedded in the browser bundle and are public. Never put secrets, tokens, private keys, or database credentials in them.

## Backend integration approach

The backend is a separate project maintained by a different team. This app will integrate through documented API contracts via `VITE_API_BASE_URL`, with request code living in `src/services/` once backend development begins; no backend code belongs in this repository. Administrative authorization must be enforced by the backend. Frontend checks can only shape the interface and are never a security boundary.
