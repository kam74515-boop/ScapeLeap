# ScapeLeap / 构境 AI

ScapeLeap is a self-hosted AI Studio OS for interior design studios. It brings
clients, design stages, FF&E schedules, fees, construction delivery, team
capacity, and client collaboration into one workspace.

## Stack

- Next.js 16, React 19, TypeScript and Tailwind CSS 4
- Better Auth with organization and role support
- PostgreSQL and Drizzle ORM
- next-intl for Chinese and English
- Vitest and Playwright

The production application runs on infrastructure controlled by ScapeLeap.
GitHub is used only as a private source repository and deployment origin.

## Local development

1. Copy `.env.example` to `.env.local`.
2. Set `BETTER_AUTH_SECRET` to a random value of at least 32 characters.
3. Run `npm ci`.
4. Run `npm run dev`.
5. Open `http://localhost:3000`.

The development command starts a local PGlite PostgreSQL-compatible database.
For a persistent local PostgreSQL instance, set `DATABASE_URL` and run
`npm run dev:next` after applying migrations.

## Quality checks

```bash
npm run lint
npm run check:types
npm run check:deps
npm test
npm run build-local
npm run test:e2e
```

## Production

Production uses a private PostgreSQL database and the Node.js Next.js server
behind Caddy on the Taiwan host. Deployment files live in `infra/`.

## Licensing

ScapeLeap application code is proprietary. Permissive upstream license
notices are preserved in `THIRD_PARTY_NOTICES.md`.
