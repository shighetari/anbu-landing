# Align Env Vars & Canonical URLs

- **Status**: Not Started
- **Owner**: Codex
- **Priority**: P1
- **Linked Work**: Missing env keys + hard-coded `https://anbu.ai`

## Why

Several UI components depend on `NEXT_PUBLIC_CONTACT_EMAIL`, `NEXT_PUBLIC_CAL_LINK`, and `NEXT_PUBLIC_APP_URL`, but these keys are absent from `.env.example` and Vercel. Hard-coded production URLs in `sitemap.ts` and page metadata also make preview deployments misrepresent their hostnames.

## What

Document and provision the required `NEXT_PUBLIC_*` variables, update the `.env.example`, and refactor sitemap/metadata helpers to use `siteConfig.website` (or another env-derived base URL). Ensure previews emit their own canonical URLs.

## Where

- `.env.example`
- `apps/landing/src/lib/site-config.ts`
- `apps/landing/src/app/sitemap.ts`
- Metadata blocks in `apps/landing/src/app/contact/page.tsx` and `apps/landing/src/app/resources/page.tsx`
- Vercel Project Settings → Environment Variables

## Acceptance Criteria

- [ ] `.env.example` lists every `NEXT_PUBLIC_*` key consumed by the app.
- [ ] Vercel envs populated with production values (documented in README/History).
- [ ] Sitemaps and OpenGraph metadata reference `siteConfig.website` (which resolves to the deployment’s base URL).
- [ ] Preview deployments advertise their own URL instead of `https://anbu.ai`.

## Checklist

- [ ] Update env templates and optionally add a runtime warning when envs are missing.
- [ ] Refactor sitemap/metadata to rely on `siteConfig` or a helper.
- [ ] Smoke-test `next build` + a preview deployment.

## Plan

1. Inventory every `process.env.*` reference (via `rg "process.env" apps/landing/src -n`) to confirm the full list of required keys.
2. Update `.env.example` with missing entries (`NEXT_PUBLIC_CONTACT_EMAIL`, `NEXT_PUBLIC_CAL_LINK`, `NEXT_PUBLIC_APP_URL`, etc.) and add short inline comments for expected formats.
3. Enhance `siteConfig` so `website` falls back to `process.env.NEXT_PUBLIC_APP_URL ?? process.env.VERCEL_URL ?? "https://anbu.ai"`, ensuring previews pick up their host.
4. Refactor `apps/landing/src/app/sitemap.ts` and any metadata blocks to pull from `siteConfig.website` (or a helper) instead of hard-coded strings; add unit coverage or simple tests if practical.
5. Update Vercel Project Settings with production values, run `pnpm build`, and (optionally) a preview deployment to verify canonical URLs and OG tags.
6. Record the completed steps and deployment link in this file’s History before moving it along the kanban.

## Notes

Consider adding `NEXT_PUBLIC_APP_URL` to `siteConfig` defaults pulled from `process.env.VERCEL_URL` when available.

## History

| Date       | Author | Update        |
| ---------- | ------ | ------------- |
| 2025-01-09 | Codex  | Initial draft |
