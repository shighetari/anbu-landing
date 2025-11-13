# Fix @anbu/config TypeScript Inputs

- **Status**: Not Started
- **Owner**: Codex
- **Priority**: P0
- **Linked Work**: `pnpm typecheck` failure (TS18003)

## Why
`pnpm typecheck` aborts in CI/Vercel because `packages/config/tsconfig.json` points at a `src` directory that does not exist. This blocks deploys and masks regressions.

## What
Update the package structure or its `tsconfig` so that TypeScript finds real inputs (e.g., include `index.ts`, `tailwind.config.ts`, `eslint.config.js`). Ensure Turbo’s `typecheck` pipeline succeeds locally and remotely.

## Where
- `packages/config/tsconfig.json`
- `packages/config/index.ts`
- Any other config exports inside `packages/config`

## Acceptance Criteria
- [ ] `pnpm typecheck` finishes without TS18003.
- [ ] The package still exports the same config modules after the change.
- [ ] Added/updated paths are documented within the file comments or commit message.

## Checklist
- [ ] Decide whether to move sources into `packages/config/src` or broaden the `include` list.
- [ ] Run `pnpm typecheck` locally to confirm.
- [ ] Note verification steps in the todo History.

## Plan
1. Inspect `packages/config` to list every TypeScript/JavaScript file that should be part of the package surface (e.g., `index.ts`, `tailwind.config.ts`, `eslint.config.js`).
2. Decide between two approaches:
   - Create a `src/` folder and move the TypeScript entry(s) there, updating export paths.
   - Or, broaden `tsconfig.json` to include the actual file globs (e.g., `"include": ["*.ts", "*.tsx"]`) and add comments explaining the structure.
3. Update `tsconfig.json` (and possibly `package.json`/import paths) accordingly, then run `pnpm --filter @anbu/config typecheck` followed by `pnpm typecheck` at the repo root.
4. Capture results (success/failures) in this file’s History section and keep `pnpm typecheck` output for PR notes.
5. Once validated, move the TODO into `completed/` and link the commit/PR in History.

## Notes
Consider adding a minimal README in `packages/config/` to prevent regressions.

## History
| Date | Author | Update |
| ---- | ------ | ------ |
| 2025-01-09 | Codex | Initial draft |
