# UX, Accessibility & Performance Audit Fixes

- **Status**: Not Started
- **Owner**: Francisco
- **Priority**: P1
- **Linked Work**: Full landing site audit findings

## Why

Multiple critical issues impact user experience, accessibility compliance (WCAG), and performance across the landing site. The contact form is non-functional for many users (mobile web, locked-down desktops), nested interactive elements violate HTML semantics and accessibility standards, server-side rendering is blocked causing poor LCP scores, and reduced motion preferences are ignored site-wide. These issues directly affect conversions, SEO, and legal compliance (ADA/WCAG requirements).

## What

Address 6 critical functional/accessibility issues and 2 UX enhancement opportunities discovered during comprehensive site audit:

**Critical Issues**:
1. Contact form uses mailto instead of proper API handler
2. Form hidden on server causing LCP issues and layout shifts
3. Invalid HTML with nested interactive elements (buttons inside anchors)
4. Internal navigation uses raw `<a>` tags instead of Next.js Link
5. PixelImage component clones images 24+ times causing memory issues
6. Reduced motion preferences ignored across animated components

**UX Opportunities**:
1. Service cards missing concrete deliverables and proper CTAs
2. Contact form needs reassurance elements (privacy note, SLA, alternative channels)

## Where

### Critical Fixes
- `apps/landing/src/components/features/contact/ContactSection.tsx` (lines 57-254)
  - Form submission handler (lines 109-155)
  - Server-side rendering (lines 57-254)
- `apps/landing/src/components/ui/bento-grid.tsx` (lines 183-220)
- `apps/landing/src/components/aceternity/floating-dock.tsx` (lines 74-127, 178-216)
- `apps/landing/src/components/ui/pixel-image.tsx` (lines 71-124)
- `apps/landing/src/components/features/hero/HeroSection.tsx` (multiple blocks around lines 30-390)
- All animated components using Framer Motion (SparklesCore, Meteors, gradient animations, tickers, etc.)

### UX Enhancements
- `apps/landing/src/components/features/services/ServicesSection.tsx`
- `apps/landing/src/components/features/contact/ContactSection.tsx`

## Acceptance Criteria

### Functional Requirements
- [ ] Contact form submits via Next.js Route Handler to email service/CRM
- [ ] Form renders on server with proper SSR, no layout shifts
- [ ] Success/error states display without leaving the site
- [ ] All interactive elements use semantic HTML (no nested buttons/links)
- [ ] Internal navigation uses `next/link` throughout
- [ ] Client-side routing works in floating dock
- [ ] PixelImage uses single bitmap with CSS masking/canvas

### Accessibility Requirements
- [ ] WCAG 4.1.2 compliance (no nested interactive elements)
- [ ] WCAG 2.3.3 compliance (reduced motion support)
- [ ] All animations respect `prefers-reduced-motion` flag
- [ ] Keyboard navigation works correctly (no double-fire on Enter)
- [ ] Focus states clear and functional

### Performance Requirements
- [ ] Contact form LCP improves (no skeleton-only SSR)
- [ ] Image memory usage reduced (single decode vs. 24+)
- [ ] Bundle analyzer shows improved metrics
- [ ] Idle CPU usage reduced on mobile
- [ ] No hydration mismatches

### UX Requirements
- [ ] Service cards show concrete deliverables/screenshots
- [ ] Service CTAs link to specific anchors
- [ ] Contact form has privacy note and SLA
- [ ] Alternative contact channels available (Slack/WhatsApp)
- [ ] "What happens next" checklist on contact form

## Checklist

### Phase 1: Critical Functional Fixes (P0)
- [ ] **Contact Form API Integration**
  - [ ] Create Next.js Route Handler at `app/api/contact/route.ts`
  - [ ] Integrate email service (Resend, SendGrid, or Nodemailer)
  - [ ] Add server-side spam filtering
  - [ ] Implement rate limiting
  - [ ] Add form validation (server + client)
  - [ ] Create success/error UI states
  - [ ] Remove mailto fallback, use fetch/axios
  - [ ] Add loading states and confetti on success

- [ ] **Fix Contact Form SSR**
  - [ ] Remove `isClientReady` state and useEffect delay
  - [ ] Render real form on server
  - [ ] Gate browser-specific code (confetti, window.location) with guards
  - [ ] Test LCP improvement with Lighthouse
  - [ ] Verify no layout shifts on hydration

- [ ] **Fix Nested Interactive Elements**
  - [ ] Refactor bento-grid service cards (lines 183-220)
  - [ ] Replace `<Link><motion.button /></Link>` pattern
  - [ ] Use `motion(Link)` or style anchor directly
  - [ ] Test keyboard navigation (Enter should fire once)
  - [ ] Validate HTML with W3C validator

- [ ] **Upgrade Floating Dock Navigation**
  - [ ] Replace raw `<a>` tags with `next/link`
  - [ ] Compose with Framer Motion via `motion(Link)`
  - [ ] Test client-side routing (no page reload)
  - [ ] Verify prefetching works
  - [ ] Confirm shared state preservation

### Phase 2: Performance Optimizations (P1)
- [ ] **Optimize PixelImage Component**
  - [ ] Replace image cloning with single `<img>` background
  - [ ] Use CSS `background-image`, `mask-image`, or canvas-based reveal
  - [ ] Test memory usage on low-end devices
  - [ ] Benchmark decode time (should be 1x vs. 24x)
  - [ ] Update component documentation

### Phase 3: Accessibility Compliance (P1)
- [ ] **Implement Reduced Motion Support**
  - [ ] Create `useReducedMotion` hook (if not exists)
  - [ ] Update SparklesCore to respect flag
  - [ ] Update Meteors component
  - [ ] Update gradient animations
  - [ ] Update number tickers
  - [ ] Update HeroSection animations
  - [ ] Provide subdued fallbacks for all continuous animations
  - [ ] Test with OS-level "reduce motion" setting
  - [ ] Document pattern for future components

### Phase 4: UX Enhancements (P2)
- [ ] **Improve Service Cards**
  - [ ] Add concrete deliverable per card
  - [ ] Include screenshot/icon for each service
  - [ ] Update CTAs to link to service-specific anchors
  - [ ] Revise copy to be more specific

- [ ] **Contact Form Reassurance**
  - [ ] Add privacy policy note near submit
  - [ ] Include SLA or response time expectation
  - [ ] Add "What happens next" 3-step checklist
  - [ ] Provide Slack/WhatsApp alternative channel
  - [ ] Display contact info for direct reach

### Phase 5: Testing & Validation
- [ ] Run full Lighthouse audit (target: 90+ performance, 100 accessibility)
- [ ] Test on mobile devices (iOS Safari, Android Chrome)
- [ ] Test on desktop browsers (Chrome, Firefox, Safari, Edge)
- [ ] Validate with screen readers (NVDA, JAWS, VoiceOver)
- [ ] Run W3C HTML validator on all affected pages
- [ ] Test with OS reduced motion setting enabled
- [ ] Verify keyboard navigation throughout
- [ ] Check bundle size with Next.js analyzer
- [ ] Test contact form with various email clients
- [ ] Verify network performance (throttled 3G/4G)

## Plan

### Implementation Approach

1. **Contact Form Overhaul** (Day 1-2)
   - Set up lightweight Next.js API route (Option A) that proxies to Resend
   - Add Zod schema validation for form data
   - Implement rate limiting with Upstash Redis or similar
   - Refactor ContactSection to use fetch instead of mailto
   - Add loading/success/error states with animations
   - Remove SSR delay, render form on server
   - Test submission flow end-to-end

2. **HTML Semantics & Routing** (Day 2-3)
   - Audit all `<Link><button>` patterns across codebase
   - Refactor bento-grid cards to use styled anchors
   - Update floating-dock to use next/link
   - Test keyboard navigation and focus management
   - Run HTML validator and fix any violations

3. **Performance Optimization** (Day 3-4)
   - Refactor PixelImage to use CSS background or canvas
   - Benchmark memory usage before/after
   - Run Next.js bundle analyzer
   - Document performance improvements

4. **Accessibility Implementation** (Day 4-5)
   - Create/verify useReducedMotion hook
   - Systematically update all animated components
   - Create reduced-motion fallback patterns
   - Test across multiple browsers with setting enabled
   - Document accessibility patterns in CLAUDE.md

5. **UX Enhancements** (Day 5-6)
   - Update service card content and imagery
   - Add contact form reassurance elements
   - A/B test messaging if possible

6. **Quality Assurance** (Day 6-7)
   - Full cross-browser testing suite
   - Accessibility audit with multiple screen readers
   - Performance benchmarking
   - User acceptance testing
   - Documentation updates

### Testing Strategy

- **Automated**: Playwright E2E tests for form submission, navigation flows
- **Manual**: Screen reader testing, keyboard navigation, visual QA
- **Performance**: Lighthouse CI, WebPageTest, Chrome DevTools profiling
- **Accessibility**: axe DevTools, WAVE, manual WCAG checklist

### Success Metrics

- Contact form conversion rate increase (baseline: current mailto drops)
- Lighthouse accessibility score: 100
- Lighthouse performance score: ≥90
- LCP improvement: ≥20% reduction
- Zero WCAG violations (automated + manual audit)
- Bundle size reduction: measurable decrease in client JS

## Notes

### WCAG References
- **4.1.2 Name, Role, Value**: Nested interactive elements violate this
- **2.3.3 Animation from Interactions**: Continuous animations must respect reduced motion
- **2.1.1 Keyboard**: All functionality must be keyboard accessible

### Technical Considerations
- Email service options: Resend (recommended), SendGrid, AWS SES, Nodemailer
- Rate limiting: Consider Upstash Redis, Vercel Edge Config, or in-memory cache
- Reduced motion: Use CSS `@media (prefers-reduced-motion: reduce)` + JS hook
- Next.js routing: Automatic prefetching and client-side navigation
- Image optimization: Canvas API or CSS mask-image for pixel reveal effect

### Dependencies
- May need to install: `resend`, `zod`, `@upstash/redis` (if chosen)
- Verify Framer Motion version supports reduced motion hooks
- Check Next.js version for latest routing optimizations

### Future Considerations
- Consider implementing analytics to track form abandonment
- Set up A/B testing framework for UX improvements
- Document component accessibility patterns for team
- Create automated accessibility testing in CI/CD
- Monitor real-user Core Web Vitals after deployment

## History

| Date       | Author    | Update                                      |
| ---------- | --------- | ------------------------------------------- |
| 2025-11-14 | Francisco | Initial audit findings documented           |
