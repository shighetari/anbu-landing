# Stabilize @anbu/utils Test Runner

- **Status**: Not Started
- **Owner**: Codex
- **Priority**: P1
- **Linked Work**: `pnpm test` failure (Vitest has no files)

## Why
Turbo fails the `test` pipeline because the `@anbu/utils` package runs Vitest without any specs, halting deployments and obscuring real failures.

## What
Either add at least one meaningful Vitest spec/snapshot for the exported helpers or relax the script (e.g., conditionally skip when no files exist). Prefer adding tests so the utilities gain coverage.

## Where
- `packages/utils/*.ts`
- `packages/utils/package.json`
- Potential new files under `packages/utils/__tests__/` or adjacent `*.spec.ts`

## Acceptance Criteria
- [ ] Running `pnpm test` succeeds locally and in CI.
- [ ] At least one spec covers the public helpers (`cn`, `format`, etc.) or the script gracefully skips.
- [ ] Documentation/History updated to describe the approach.

## Checklist
- [ ] Decide between adding specs vs. guarding the script.
- [ ] Implement and run `pnpm --filter @anbu/utils test`.
- [ ] Update this TODO History and move to `completed/` once merged.

## Plan
1. Audit `packages/utils` exports (`cn`, `format`, `constants`) to identify behaviors worth snapshotting.
2. Create a `__tests__/` or `*.spec.ts` file alongside the modules that checks:
   - `cn` merges classes + tailwind overrides.
   - `format` helpers behave as expected.
   - constants remain defined.
3. Configure Vitest (if needed) via a local `vitest.config.ts` to run in Node + TS mode.
4. Run `pnpm --filter @anbu/utils test` to ensure the new tests pass, then `pnpm test` at the repo root to verify Turbo is satisfied.
5. Document the approach and outcomes in this file’s History section; mark subtasks complete and move to `completed/` when merged.

## Notes
If adding specs, mirror real usage from landing pages to prevent regressions.

## History
| Date | Author | Update |
| ---- | ------ | ------ |
| 2025-01-09 | Codex | Initial draft |
