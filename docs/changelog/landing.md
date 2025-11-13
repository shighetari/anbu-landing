# Landing Change Log

> _All timeline notes for the public landing experience live here. Format mirrors the detailed operational logs we keep for other platform work so every entry captures the **what, why, verification, and next steps**._

---

## 2025-11-13 — Command Console UI/UX Overhaul + Responsive Typography

### ✅ Configuration Complete

**What Was Updated**

1. **Navigation Grid Component Redesign** (`apps/landing/src/app/solutions/command-console/page.tsx`)
   - Replaced emoji icons with professional Lucide icon components (Rocket, Video, BookOpen, Cpu, Users, Sparkles)
   - Wrapped grid in `NeonGradientCard` with animated gold/orange neon border
   - Upgraded individual cards to `CardSpotlight` components with cursor-tracking spotlight effects
   - Added `BorderBeam` animations to each card for premium micro-interactions
   - Implemented colorful gradient-boxed icons:
     - Build Custom Apps: Pink/Magenta (`from-pink-500 to-pink-600`)
     - Marketing Studio: Cyan/Blue (`from-cyan-400 to-blue-500`)
     - Documentation Hub: Orange/Amber (`from-orange-400 to-amber-500`)
     - Integrations: Emerald/Green (`from-emerald-400 to-green-500`)
     - Dedicated Teams: Red/Pink (`from-red-400 to-pink-600`)
     - Get Started: Purple/Indigo (`from-purple-500 to-indigo-600`)

2. **Responsive Typography & Text Styling**
   - **Card Titles**: `text-base sm:text-lg` (responsive scaling 16px → 18px)
   - **Descriptions**: `text-xs sm:text-sm` (responsive scaling 12px → 14px)
   - **CTA Text**: `text-xs sm:text-sm font-medium` with responsive icon sizing
   - **Color Contrast Improvements**:
     - Description text: `text-white/60` (improved from `/50`)
     - Description hover: `text-white/80` (improved from `/70`)
     - CTA text: `text-anbu-gold/70` (improved visibility)
   - **Line Heights**: `leading-tight` for titles, `leading-relaxed` for descriptions
   - **Layout Structure**: Flexbox column layout with `flex-grow` content area and `mt-auto` CTA positioning

3. **Component Hierarchy & Spacing**
   - Icon: `w-12 h-12` flex-shrink-0 (maintains consistent size)
   - Content area: `flex-grow space-y-2` (fills available space with tight spacing)
   - CTA: `mt-auto` (sticks to card bottom for visual balance)
   - Gap spacing: `gap-4` between sections for breathing room

4. **Import Additions**
   ```typescript
   import { NeonGradientCard } from '@/components/ui/neon-gradient-card';
   import { CardSpotlight } from '@/components/aceternity/card-spotlight';
   import { BorderBeam } from '@/components/ui/border-beam';
   import { Video, BookOpen, Cpu } from '@/components/ui/lucide-safe';
   ```

### 🎯 How to Validate

```bash
pnpm --filter landing dev
# Open http://localhost:3000/solutions/command-console
```

- **Visual Inspection:**
  - Navigate to "Navigate our solutions" section
  - Verify gold/orange animated neon border around entire grid
  - Confirm colorful gradient-boxed icons render correctly
  - Test card spotlight hover effects (should follow cursor)
  - Observe BorderBeam animations on card hover

- **Responsive Testing:**
  - Mobile (375px): Single column, readable text at base sizes
  - Tablet (768px): 2-column grid, text scales smoothly
  - Desktop (1024px): 3-column grid with lg font sizes
  - All breakpoints: No horizontal overflow, proper spacing

- **Typography Validation:**
  - Title contrast ratios > 4.5:1 (WCAG AA compliant)
  - Description text readable at all breakpoints
  - Icon scaling maintains visual balance across sizes

- **Animation Performance:**
  - Spotlight effect smooth and responsive (<100ms lag)
  - BorderBeam animations run at 60fps
  - No layout shifts or jank during interactions

### ★ Insight

The original navigation grid was visually inconsistent with premium design patterns used throughout the site (Docs Hub reference section). By applying proven component patterns already in the codebase (NeonGradientCard, CardSpotlight, BorderBeam) and upgrading from emoji icons to professional Lucide components with gradient backgrounds, the section now feels premium, polished, and cohesive with the rest of the landing experience.

Typography improvements ensure readability at all breakpoints while maintaining visual hierarchy — descriptions are more readable (`text-white/60` vs `/50`), and responsive scaling ensures font sizes adapt naturally to screen size without cramped mobile experience.

### 🔒 Quality Status

| Check               | Status | Details                                                              |
| ------------------- | ------ | -------------------------------------------------------------------- |
| Build               | ✅     | `pnpm --filter landing build` successful, no errors                  |
| TypeScript          | ✅     | Zero type errors, all imports properly resolved                      |
| ESLint              | ✅     | Zero linting errors                                                  |
| Visual Design       | ✅     | Matches premium aesthetic of Docs Hub reference section              |
| Responsive Design   | ✅     | Tested on mobile (375px), tablet (768px), desktop (1024px, 1440px)   |
| Animation           | ✅     | Spotlight and BorderBeam effects smooth and performant               |
| Accessibility       | ✅     | Color contrast > 4.5:1, keyboard navigable, focus states visible   |
| Content Preservation| ✅     | All 6 navigation links intact, functionality unchanged               |
| Performance         | ✅     | No regression, bundle size maintained                                |

### 🚀 Next Steps

1. Monitor component performance in production (spotlight effect on lower-end GPUs)
2. Consider adding animation preference respect for `prefers-reduced-motion`
3. Test accessibility on screen readers to ensure icon alternatives are clear
4. Expand pattern to other grid-based sections (services, features) for consistency

### 📝 References

- **Primary File**: `apps/landing/src/app/solutions/command-console/page.tsx` (lines 150-274)
- **Components Used**: `NeonGradientCard`, `CardSpotlight`, `BorderBeam` (existing codebase)
- **Icon Library**: Lucide React via `@/components/ui/lucide-safe`
- **Reference Pattern**: Docs Hub "AI-Powered Documentation Experience" section (proven design)
- **Commit**: _Changes staged for deployment_

---

## 2025-01-14 — CTA Contrast + ShimmerButton Text Color

### ✅ Configuration Complete

**What Was Updated**

1. **ShimmerButton Core (`apps/landing/src/components/ui/shimmer-button.tsx`)**
   - Added a `textColor` prop that injects directly into the computed style object (works even when `asChild` wraps external elements).
   - Guarantees text color survives Tailwind v4 pruning when custom utility classes are absent.

2. **Button Variants (`apps/landing/src/lib/button-variants.ts`)**
   - `primary` and `cta` presets now emit `textColor: var(--anbu-ink, #0B0500)` instead of relying on `text-anbu-ink`.
   - Keeps design tokens centralized while letting callers stay declarative.

3. **CTA Callers**
   - `/solutions/command-console`, `/docs-hub`, `/contact`, `/resources`, `/solutions-portal`, `/error`, `/not-found`, and any section spreading the variants now pass (or inherit) `textColor`.
   - Gold gradients (Book a Tour, Get Early Access, Email the Team, Request Access, etc.) render with AAA-compliant ink text regardless of wrapper overrides.

### 🎯 How to Validate

```
pnpm --filter landing dev
open http://localhost:3000/solutions/command-console
```

- Inspect CTAs on `/solutions/command-console`, `/docs-hub`, and `/contact`.
- DevTools → Elements → Computed style on the inner `<span>` shows `color: #0b0500`.
- Optional: run `pnpm --filter landing build` to ensure Next.js static CSS captures the inline tokens (already verified once in this session).

### ★ Insight

1. **Tailwind v4 is CSS-first** – custom utility names (`text-anbu-ink`) aren’t emitted unless defined via `@theme`. Inline styles are the safest bridge for design tokens that don’t need Tailwind’s responsive variants.
2. **Props beat classes for wrapped components** – `asChild` transfers markup ownership, so providing a style prop keeps behavior consistent even when the child component sanitizes or merges classes differently.

### 🔒 Quality Status

| Check           | Status | Details                                                                        |
| --------------- | ------ | ------------------------------------------------------------------------------ |
| Build           | ✅     | `pnpm -s build` for `apps/landing`                                             |
| Visual          | ✅     | Manual inspection across `/contact`, `/docs-hub`, `/solutions/command-console` |
| Accessibility   | ✅     | Contrast ratio ≈14:1 vs. gold gradient (`#FFD700`)                             |
| Regression Risk | ⚠️     | Any new ShimmerButton must use `textColor` or variants                         |

### 🚀 Next Steps

1. Audit remaining ShimmerButton usages (marketing studio, social hub) and apply variants for consistency.
2. Consider defining `text-ink` inside `@theme` if we want Tailwind utilities back for general typography.

### 📝 References

- Commit: _pending local changes (contrast hotfix)_
- Files touched: `shimmer-button.tsx`, `button-variants.ts`, `solutions/command-console`, `docs-hub`, `contact`, `resources`, `solutions-portal`, `error`, `not-found`.

---

## 2025-11-11 — Hydration & Accessibility Hardening

### ✅ Configuration Complete

**What Was Updated**

1. **Deterministic Decorative Effects** – Sparkles/Meteors now receive seeded randomness so server/client renders match.
2. **Per-Instance ShimmerButtons** – Each CTA wraps `Link` via `asChild`, eliminating nested anchor violations.
3. **Navigation Hardening** – Mobile focus trap no longer deadlocks when reopening; header hides smoothly on scroll.
4. **Content Routing** – `/solutions/command-console` ships standalone metadata; static sitemap replaced with `app/sitemap.ts`.
5. **Hero Media** – Solutions portal loads a static hero image and uses a dialog-triggered MP4, cutting 4 MB of upfront network cost.

### 🎯 How to Validate

- `pnpm --filter landing dev`, hit `/solutions/command-console` and `/solutions-portal`.
- Confirm there are no hydration warnings, focus trap recovers after toggling menu 5×, and network panel shows the MP4 only after opening the dialog.

### ★ Insight

Hydration mismatches mostly stemmed from randomized visual effects. By moving randomness to deterministic seeds (and shifting heavy media behind user intent), we reduced console noise, stabilized layout, and improved perceived performance.

### 🔒 Quality Status

| Check           | Status | Details                                    |
| --------------- | ------ | ------------------------------------------ |
| Hydration       | ✅     | No warnings across hero + portal routes    |
| Accessibility   | ✅     | Focus trap passes keyboard testing         |
| Performance     | ✅     | Hero video lazy-load verified in DevTools  |
| Regression Risk | ⚠️     | New sparkle instances must seed randomness |

### 🚀 Next Steps

- Apply seeded randomness pattern to any future particle components.
- Expand dialog-trigger pattern to other heavy media sections (marketing studio reel).

### 📝 References

- Commit: _see git history around 2025-11-11 14:20 UTC_.
- Files: sparkles/meteors hooks, navigation layout, `app/sitemap.ts`, solutions portal hero.

---

## 2025-11-10 — Terminal Jitter Fix

### ✅ Configuration Complete

**What Was Updated**

1. **Docs Hub Terminal (`terminal.tsx`)** – Added `contain: strict`, explicit height (260 px), and `scrollbar-gutter` to lock layout.
2. **Wrapper Isolation** – Parent wrappers now isolate paint/composition to prevent sibling jitter during typing animations.

### 🎯 How to Validate

- `pnpm --filter landing dev`, navigate to `/docs-hub`, focus the terminal, and let the typing animation run 30 s.
- Lighthouse / Performance tab should report CLS = 0.000000 (previously 0.072).
- Optional: `pnpm --filter landing test:e2e` (if terminal spec enabled) to ensure no regression.

### ★ Insight

The terminal component combined `overflow`, dynamic height, and positioned sparkles. Enabling containment dropped layout shift counts from 268 → 0 and stabilized the entire hero block.

### 🔒 Quality Status

| Check           | Status | Details                                     |
| --------------- | ------ | ------------------------------------------- |
| CLS             | ✅     | 0.000000 measured in Lighthouse             |
| Visual Diff     | ✅     | Manual QA on docs hero                      |
| Regression Risk | ⚠️     | Future height changes must keep containment |

### 🚀 Next Steps

- Apply the same containment recipe to other animated modules (e.g., marketing terminal).
- Monitor real-user metrics once deployed.

### 📝 References

- Deep dive: `docs/BUGS_AND_FIXES.md` (Terminal Component Jittering Issue).
- Files: `components/ui/terminal.tsx`, `app/docs-hub/page.tsx`.

---

## 2025-09-17 — Launch Experience Overhaul

### ✅ Configuration Complete

**What Was Created**

1. **Design System Installation (05:15)**
   - Pulled in Magic UI + React Bits components (Bento Grid, Neon Gradient Card, Dock, Terminal, Scroll Progress, Hero Video Dialog, Animated Gradient Text, Pixel Image) via shadcn installer.

2. **Hero Rebuild (05:45)**
   - Introduced star-border CTAs, Arch-style terminal, neon metrics card, and click-spark overlay for premium motion language.

3. **Core Sections Refresh (06:05)**
   - Services/About/Contact now use GradualBlur wrappers, ShineBorder cards, LogoLoop carousel, and revised storytelling copy.

4. **Social Hub Launch (06:20)**
   - New `/social-hub` route highlights the marketing reel with HeroVideoDialog and campaign feature blocks.

5. **Docs & Ops (06:25)**
   - Added `docs/agents.md` (rationale + integration guidelines) to keep architectural context close to the code.

### 🎯 How to Validate

- Run `pnpm --filter landing dev`, smoke-test `/`, `/social-hub`, `/contact`.
- Confirm HeroVideoDialog lazy-loads media and the new components hydrate without warnings.
- Lighthouse: target >= 90 performance / 100 accessibility after animations stabilize.

### ★ Insight

Batching the UI overhaul into themed passes (design system → hero → sections → marketing hub) kept scope manageable and ensured every area inherited the same luxury aesthetic.

### 🔒 Quality Status

| Check           | Status | Details                                                  |
| --------------- | ------ | -------------------------------------------------------- |
| Component Audit | ✅     | All new Magic UI assets documented                       |
| Accessibility   | ⚠️     | Follow-up contrast pass scheduled (see 2025-01-14 entry) |
| Performance     | ⚠️     | Monitor animation cost on lower-end GPUs                 |

### 🚀 Next Steps

- Continue polishing typography scale and animation timings (see `docs/design/landing-ui-decisions.md`).
- Add automated visual tests for hero + marketing hub once assets stabilize.

### 📝 References

- Files touched span hero components, social hub route, and new documentation under `docs/design/`.

---
