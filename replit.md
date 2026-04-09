# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Japanese B2B marketing landing page for GrowthSprint Consulting sprint services.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)
- **Frontend**: React + Vite, Tailwind CSS, framer-motion, wouter

## Structure

```text
artifacts-monorepo/
├── artifacts/
│   ├── api-server/         # Express API server
│   └── landing/            # React + Vite landing page (served at /)
├── lib/
│   ├── api-spec/           # OpenAPI spec + Orval codegen config
│   ├── api-client-react/   # Generated React Query hooks
│   ├── api-zod/            # Generated Zod schemas from OpenAPI
│   └── db/                 # Drizzle ORM schema + DB connection
├── scripts/
└── ...
```

## Landing Page Features

- **Multilingual (i18n)** — Full JA/EN/ZH/RU support; default Japanese. `LanguageProvider` wraps app, `useLang()` hook provides `t` translations, `LanguageSwitcher` dropdown in navbar.
  - Files: `src/i18n/index.ts` (all translations), `src/contexts/LanguageContext.tsx`, `src/components/LanguageSwitcher.tsx`
- **Hero** — Dark premium hero with animated orbs/particles/grid, pain-first headline, two CTA buttons, stats strip
- **PainSection** — Two-column pain cards (Ops vs CVR) with CTA buttons linking to contact modal with pre-selected interest
- **Service Cards** — Ops & CRM Sprint (¥450,000) and Landing & CVR Sprint (¥500,000) dark-gradient cards with deliverables, pains, "Not included" accordion
- **Process Section** — 4-step animated workflow with line-draw animation
- **CTA Section** — Dark premium section with glow button
- **Contact Modal** — Translated form with name, company, email, sprint interest, message — submits to `/api/contacts`
- **Footer** — Clickable links to company, privacy, legal pages
- **Legal Pages** — /company, /privacy, /tokushoho

## API Endpoints

- `GET /api/healthz` — Health check
- `POST /api/contacts` — Submit contact form (saves to DB)

## Database Schema

- `contacts` table: id, name, company, email, sprint_interest, message, created_at
