# Landing App

This workspace hosts the production ANBU landing experience. It consumes shared UI/config/util packages from the monorepo and runs on a dedicated dev port so it never collides with other future apps.

## Quick Start

```bash
pnpm install                  # from repo root
cp apps/landing/.env.example apps/landing/.env.local
pnpm --filter landing dev     # boots Next.js on http://localhost:3000
```

The root `pnpm dev` command still works (Turbo will only start `landing` for now), but using the filter keeps logs scoped to this app.

## Available Scripts

| Command                       | Description                                                |
| ----------------------------- | ---------------------------------------------------------- |
| `pnpm --filter landing dev`   | Next.js dev server on port 3000 with hot reload            |
| `pnpm --filter landing build` | Production build (`.next/`)                                |
| `pnpm --filter landing start` | Serve the production build (also on port 3000)             |
| `pnpm lint`                   | Turbo-powered ESLint across the repo (landing is included) |
| `pnpm test:e2e`               | Playwright suite under `apps/landing/tests/e2e`            |

> Tip: The suite reads `PLAYWRIGHT_BASE_URL`, so if you temporarily run on another port set `PLAYWRIGHT_BASE_URL=http://127.0.0.1:<port> pnpm test:e2e`.

## File Map

- `src/app` – App Router entry points
- `src/components/ui|reactbits|aceternity` – Local component libraries referenced in `docs/design/landing-ui-decisions.md`
- `tests/e2e` – Canonical Playwright specs (+ screenshots in `__screenshots__`)
- `public/` – OG assets, icons, and marketing imagery
- `tailwind.config.ts` – App-specific theme extensions layered on top of shared tokens

## Reference Material

- Design rationale: `../../docs/design/landing-ui-decisions.md`
- Recent tweaks: `../../docs/changelog/landing.md`
- Repo-wide workflows: see `../../README.md` and `../../AGENTS.md`
