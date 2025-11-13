# Bugs & Fixes Documentation

This document tracks significant bugs, their root causes, and the solutions implemented.

---

## Terminal Component Jittering Issue

**Date Fixed:** November 10, 2025  
**Affected Component:** `apps/landing/src/components/ui/terminal.tsx`  
**Affected Page:** `apps/landing/src/app/docs-hub/page.tsx`  
**Severity:** High (UX Impact)

### Issue Description

The ANBU Terminal component on the docs-hub page exhibited visible jittering/shaking during the typing animation. The entire page would appear to vibrate or shift up and down while text was being typed character-by-character, especially noticeable after scrolling to the lazy-loaded component section.

### Root Cause

Multiple compounding issues:

1. **Dynamic Content Layout Shifts**: The typing animation updated text character-by-character, causing micro-layout shifts (cumulative layout shift score of 0.072 with 268 layout shifts detected).

2. **Lack of CSS Containment**: No layout containment on the terminal wrapper allowed layout recalculations to propagate throughout the entire DOM tree.

3. **Responsive Height on Terminal**: The `<pre>` element used responsive classes (`h-[220px] sm:h-[240px] lg:h-[260px]`) instead of a fixed height, allowing the container to potentially resize during animation.

4. **Scrollbar Appearance/Disappearance**: The terminal had `overflow: auto` which caused scrollbars to appear/disappear as content changed, triggering additional layout shifts (scrollbars typically take ~17px of space).

5. **No Scrollbar Gutter**: Missing `scrollbar-gutter: stable` allowed content to shift when scrollbars appeared.

### Solution Implemented

#### 1. Terminal Component (`terminal.tsx`)

**Outer Container:**

```tsx
<div
  ref={containerRef}
  className={cn('relative z-0 w-full text-left text-white group', className)}
  style={{
    contain: 'layout style paint', // Isolate terminal from external layout
    contentVisibility: 'auto'
  }}
>
```

**Pre Element (Terminal Content Area):**

```tsx
<pre
  className="relative mt-3 overflow-y-scroll overflow-x-hidden rounded-xl bg-gradient-to-b from-black/50 to-black/30 px-4 py-5 pr-6 text-[13px] font-mono scrollbar-thin scrollbar-track-transparent scrollbar-thumb-anbu-gold/20 hover:scrollbar-thumb-anbu-gold/30"
  style={{ 
    height: '260px', // Fixed height - critical for preventing layout shifts
    minHeight: '260px',
    maxHeight: '260px',
    scrollbarGutter: 'stable both-edges',
    contain: 'strict', // Strictest containment to completely isolate layout
    contentVisibility: 'auto',
    willChange: 'scroll-position',
    overflow: 'scroll' // Force scrollbars to always be visible
  }}
>
```

**Code Element:**

```tsx
<code 
  className="relative grid gap-y-2 whitespace-pre-wrap break-words" 
  style={{ 
    contain: 'layout style',
    minHeight: '100%',
    display: 'grid'
  }}
>
```

#### 2. Page Wrapper (`docs-hub/page.tsx`)

```tsx
<motion.div
  initial={{ opacity: 0, y: 8 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ 
    duration: 0.5, 
    delay: 0.2,
    ease: [0.25, 0.1, 0.25, 1]
  }}
  viewport={{ once: true }}
  className="w-full max-w-[95vw] sm:max-w-2xl md:max-w-3xl lg:max-w-4xl mx-auto px-2 sm:px-4 flex justify-center motion-reduce:y-0"
  style={{
    willChange: 'transform, opacity',
    contain: 'layout style paint', // Prevent layout shifts from propagating
    contentVisibility: 'auto'
  }}
>
  <Terminal className="border border-white/10 bg-black/90 shadow-2xl w-full max-w-full">
```

### Key Technical Concepts

- **CSS Containment (`contain`)**: Tells the browser that an element's internal layout is independent from the rest of the page, preventing layout recalculation propagation.
  - `strict`: Most aggressive containment (layout + style + paint + size)
  - `layout style paint`: Isolates layout, style, and paint operations

- **`scrollbar-gutter: stable both-edges`**: Reserves space for scrollbars even when not visible, preventing content shifts when they appear/disappear.

- **Fixed Dimensions**: Using explicit `height: 260px` instead of responsive classes prevents any potential resize during content updates.

- **`contentVisibility: auto`**: Performance optimization that allows the browser to skip rendering work for off-screen content.

### Verification

Testing with Chrome DevTools Performance Observer API confirmed:

- **0 layout shifts detected** during typing animation
- **Cumulative Layout Shift (CLS) score: 0.000000** (Excellent - Google Core Web Vitals threshold is 0.1)
- Terminal animations run smoothly without any visible jittering

### References

- [CSS Containment Spec](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_containment)
- [Scrollbar Gutter](https://developer.mozilla.org/en-US/docs/Web/CSS/scrollbar-gutter)
- [Cumulative Layout Shift (CLS)](https://web.dev/cls/)
- Chrome DevTools MCP debugging session (November 10, 2025)

### Lessons Learned

1. Always use CSS containment for components with dynamic content updates
2. Fixed dimensions are crucial for animated containers to prevent layout thrashing
3. Force scrollbars to be always visible (or reserve space with `scrollbar-gutter`) for scrollable content
4. Performance Observer API is invaluable for quantifying layout shift issues
5. Small, frequent layout shifts are more problematic than large infrequent ones

---

