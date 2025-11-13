# Repository Guidelines

## Project Structure & Module Organization

The monorepo relies on pnpm workspaces plus Turbo for orchestration. Feature apps live under `apps/`—today that’s just `landing`, with `docs-hub` and `solutions-portal` reserved for future expansions so newcomers only wrangle the shipping experience. Shared building blocks sit in `packages/`: `ui` for reusable React components, `config` for environment-aware settings, and `utils` for cross-cutting helpers. Refer to `docs/` (notably `docs/design/landing-ui-decisions.md` and `docs/changelog/landing.md`) for product notes, `docker/` for container recipes, and `scripts/` for automation utilities.

## Build, Test, and Development Commands

- `pnpm dev` – Starts all workspace apps with Turbo for concurrent hot reload.
- `pnpm build` – Produces optimized production builds across apps and packages.
- `pnpm lint` / `pnpm typecheck` – Runs ESLint and TypeScript checks; required before opening a PR.
- `pnpm test` – Executes Vitest suites via Turbo; filter with `pnpm --filter apps/landing test` when needed.
- `pnpm test:e2e` – Runs the canonical Playwright suite under `apps/landing/tests/e2e` (legacy helper scripts still live at repo root).
- `pnpm format` / `pnpm format:check` – Applies or verifies Prettier formatting for supported file types.
- `pnpm clean` – Removes build artifacts; use `pnpm clean:all` if node_modules reset is required.

## Coding Style & Naming Conventions

TypeScript is mandatory for application and shared code. Prettier enforces two-space indentation, trailing commas where valid, and double quotes in JSON; do not override local configuration. Follow PascalCase for React components in `packages/ui`, camelCase for functions and variables, and kebab-case for directories and non-component files. Tailwind utility classes power styling—prefer composable class lists over ad-hoc CSS. Husky + lint-staged auto-run ESLint (`--fix`) and Prettier on staged files; keep commits clean.

## Testing Guidelines

Vitest specs belong next to the feature or under `tests/` when shared; name files `*.spec.ts`. Playwright is the source of truth for integration/E2E and lives under `apps/landing/tests/e2e`; legacy helper scripts in the repo root can be used ad hoc but should eventually migrate into that suite. Maintain parity between component updates and coverage—new UI states require matching assertions. Run `pnpm test` (unit) and `pnpm test:e2e` (Playwright) before requesting review, adding `--debug` when chasing flaky UI states. Broken snapshots or flaky cases must be resolved or quarantined with clear justification.

## Commit & Pull Request Guidelines

Use Conventional Commits (`type(scope): subject`) aligned with project commitlint; leverage `pnpm commit` (Commitizen) for consistency. Branch names follow Git Flow (`feature/*`, `fix/*`, `docs/*`, `release/*`, `hotfix/*`). Each PR should describe scope, list verification steps (`pnpm lint`, `pnpm test`, relevant Playwright runs), and include screenshots or video when altering UI. Link Jira/GitHub issues and note environment updates (.env keys, Docker changes) in the PR body. Request at least one reviewer familiar with the touched workspace and wait for CI to pass before merging.

## Environment & Tooling Tips

Copy environment templates with `cp apps/landing/.env.example apps/landing/.env.local` (repeat per app) and never commit secrets. Use `pnpm platform:setup` after switching OS targets to sync Docker overrides. When working inside containers, prefer `pnpm docker:landing:shell` for instrumentation instead of attaching manual terminals.
