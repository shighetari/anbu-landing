# ANBU Landing UI Decisions

_Last updated: 2025-09-17_

## Design Principles
- **Black & Gold Atelier Aesthetic** — Core palette relies on rich blacks, champagne gold (#FFD700) and warm amber accents to communicate premium craft. Background layers use stacked radial gradients and marble-inspired textures for depth without noise.
- **Motion with Purpose** — Framer Motion drives subtle reveals (float-in, count-up, terminal typing) while Magic UI + React Bits components supply more elaborate effects (neon borders, star-traced buttons, click sparks). All motion eases in <900 ms to keep interactions responsive.
- **Readable Luxury Typography** — Headlines use Montserrat for modern display weight, body copy sticks to Inter for clarity. Gradient text accents call attention to CTAs and section labels without overwhelming content.

## Component Inventory

| Area | Component | Source | Notes |
|------|-----------|--------|-------|
| Global | `ScrollProgress`, `Dock`, `AnimatedGradientText`, `NeonGradientCard`, `ShineBorder`, `Terminal`, `HeroVideoDialog`, `PixelImage`, `BentoGrid` | **Magic UI** via `npx shadcn@latest add` | Core aesthetic + layout primitives; see `/src/components/ui/*` for local copies. |
| Global | `ClickSparkOverlay`, `StarBorderButton`, `GradualBlurSection`, `DecryptedText`, `LogoLoop` | **React Bits inspired** custom implementations under `/src/components/reactbits` | Recreated patterns (click spark, star border, gradual blur, decrypt animation, rotating logos) tailored to ANBU colors and Framer Motion. |
| Hero | `NeonGradientCard` (stats), `CountUp` | Magic UI + `react-countup` | Builds credibility with kinetic metrics. |
| Hero | `Terminal` (Arch styled), `DecryptedText` title prefix | Magic UI + React Bits | Bridges technical credibility with storytelling. |
| CTA | `StarBorderButton` | React Bits inspired | Animated buttons for key actions—use when emphasising premium interactions. |
| Sections | `GradualBlurSection` wrapper | React Bits inspired | Apply to any scroll section requiring soft entrance cues. |
| Services | `BentoGrid` cards + `ShineBorder` | Magic UI | Ideal for 3–4 pillar offerings; backgrounds accept gradients per service. |
| About | `LogoLoop`, `PixelImage` | React Bits + Magic UI | Loops tech expertise and showcases visual storytelling. |
| Contact | `ShineBorder`, `StarBorderButton` | Magic UI + React Bits | Maintains high-touch look for conversions. |
| Marketing Studio | `HeroVideoDialog`, `Sparkles`, `Meteors`, `GradualBlurSection`, `InfiniteMovingCards`, `FloatingDock` | Magic UI + React Bits + Aceternity | `SectionWrapper` + `SectionHeading` pattern delivers centered, spacious sections; cards are capped at `max-w-sm` with gold-accented interaction states. |

## Integration Guidelines
- **Adding new Magic UI components**: use `npx shadcn@latest add "https://magicui.design/r/<component>"` from `apps/landing`. Respect existing `button.tsx` implementation—decline overwrites unless planned.
- **React Bits patterns**: Extend `/src/components/reactbits` with client components that wrap Framer Motion logic. Keep animations light (<1s) and align colors with `--anbu-gold` tokens.
- **Hero metrics**: Feed new KPIs into `heroHighlights` array in `HeroSection.tsx`; numbers auto-animate through `CountUp`.
- **Logo loop**: Provide either `render` nodes for text badges or `src` + `alt` for images. Repeat arrays to keep marquee seamless.
- **Pixel image**: Update `src` to point at new social imagery. Remote domains must be whitelisted in `next.config.ts`.
- **Section centering** (Marketing Studio): Use the local `SectionWrapper` + `SectionHeading` helpers for consistent padding (`py-20+`), centered typography, and brand-aligned copy. Cards and grids stay balanced by capping widths at `max-w-sm`, applying `justify-items-center`, and layering light gold gradients with `Sparkles`/`Meteors` accents where needed.

## Accessibility & Performance
- All animated wrappers respect reduced motion by default (leveraging Motion defaults). Keep border animations decorative and ensure focus states remain visible (`focus-ring` utility).
- Keep video embeds hosted via YouTube/Vimeo to offload rendering; the HeroVideoDialog closes via overlay or escape key.

## Future Enhancements
- Create a shared `analytics.ts` helper for logging CTA usage from Dock + buttons.
- Expand `reactbits` utilities with configurable `ClickSparkOverlay` colors for seasonal campaigns.
- Snapshot test hero + services sections after each redesign to guard regressions.

### 2025-09-19 Marketing Studio polish
- Softened gradients on Marketing Studio headings, reduced meteor/beam intensity, and tightened section padding for better readability.
- Hero headline now uses animated typography helpers (currently `TextCascade`) with responsive `text-balance` sizing to avoid overlong wraps.
- SectionWrapper enforces `flex` centering; add section-specific width caps via `max-w-5xl` to keep grids aligned.
- Removed page-level Footer — rely on layout footer to prevent double rendering.
- CTA/body copy leading tightened to 1.8 range; keep hero paragraph at `max-w-3xl` for balanced columns.
- Hero headline now uses `TextCascade` to animate words and keep the lockup perfectly centered; pass `delay`+`stagger` props per section for varied pacing.
- Added `GlobalDock` wrapper so the default dock skips `/social-hub`; page-level dock gets custom styling without overlap.
- `TextCascade` utility lives under `reactbits/` for re-use—works with any heading tag and gradient class.
