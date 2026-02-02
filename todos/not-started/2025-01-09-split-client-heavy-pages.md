# Split Client-Heavy Pages into Server Shells

- **Status**: Not Started
- **Owner**: Codex
- **Priority**: P2
- **Linked Work**: `apps/landing/src/app/social-hub/page.tsx` & `apps/landing/src/app/docs-hub/page.tsx`

## Why

Entire route files are marked `'use client'`, forcing large Framer Motion bundles to hydrate on every visit and preventing `generateMetadata` or server-side SEO logic. This increases TTFB and bundle sizes on Vercel.

## What

Refactor each route into a server component wrapper that renders child client components for highly interactive sections. Keep metadata generation on the server and ensure existing animations still function.

## Where

- `apps/landing/src/app/social-hub/page.tsx`
- `apps/landing/src/app/docs-hub/page.tsx`
- Related feature components that can remain client-side

## Acceptance Criteria

- [ ] Route entry files are server components (no top-level `'use client'`).
- [ ] Client-only components remain interactive via dynamic imports or child client files.
- [ ] `generateMetadata` (or static `metadata`) continues to work with accurate data.
- [ ] Bundle size / Next.js analyzer shows a reduction for these routes.

## Checklist

- [ ] Identify sections requiring state/effects and move them into `components/`.
- [ ] Verify page rendering locally and via `next build`.
- [ ] Update History with any measurable bundle improvements.

## Plan

1. Audit each route (`docs-hub`, `social-hub`) to catalog which sub-sections actually need client interactivity (Framer Motion, stateful widgets, etc.).
2. Extract those sections into dedicated client components within `components/` (keeping `'use client'` scoped there) while rewriting the page entry files as server components returning JSX + imported client children.
3. Where data/config is required, pass props from the server shell to client children so they stay serializable; avoid referring to `window` at the top level.
4. Add `generateMetadata` (or keep static `metadata`) in the server entry files to ensure OG tags remain accurate.
5. Run `pnpm --filter landing dev` and `pnpm build` while checking bundle/analyzer output (e.g., `NEXT_RUNTIME=webpack ANALYZE=true pnpm --filter landing build` if needed) to confirm reduced client JS.
6. Capture before/after metrics plus testing notes in this TODO’s History and move it through the kanban once merged.

## Notes

This can be tackled after the blocking deployment issues if time is constrained.

## History

| Date       | Author | Update        |
| ---------- | ------ | ------------- |
| 2025-01-09 | Codex  | Initial draft |
