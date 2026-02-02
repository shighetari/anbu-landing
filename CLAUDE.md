# Claude Code Project Configuration

## Project Standards

### Code Style

- Adhear to programming best practices and principles (i.e DRY, KISS, etc)
- Implement proper file structure when applicable that aligns with best practices.
- Use best practices for coding patterns
- Maintain consistent naming conventions
- Preserve existing indentation (tabs vs spaces)

### Security

- Never expose or log secrets, API keys, or credentials especially to our repositories
- Never commit sensitive information to version control
- Always validate user input
- Follow OWASP security best practices

## Common Commands

### Build & Test

- Check for package.json scripts first: `npm run <script>`
- Common commands:
  - `npm run build` - Build the project
  - `npm run test` - Run tests
  - `npm run lint` - Run linter
  - `npm run typecheck` - Check TypeScript types
  - `npm run dev` - Start development server

### Quality Checks

Always run these before considering a task complete:

1. Linting: Check for and fix any linting errors
2. Type checking: Ensure no TypeScript/type errors
3. Tests: Run existing tests to ensure nothing is broken
4. Build: Verify the project still builds successfully

## Development Workflow

### Before Starting

1. Understand the existing codebase structure
2. Check for existing patterns and conventions
3. Review related files for context
4. Check dependencies in package.json/requirements.txt/etc.

### During Development

1. Make incremental, tested changes
2. Preserve existing functionality
3. Follow the project's established patterns
4. Keep changes focused and minimal

### After Completing

1. Run all quality checks (lint, typecheck, test, build)
2. Verify the solution works as expected
3. Ensure no regressions were introduced
4. Clean up any debugging code or comments

## Project-Specific Notes

### ANBU Landing Page - Writing Style Guide

#### First-Person Narrative

- **ALWAYS** write in first-person as if Francisco is writing
- Use "I", "I'm", "I've", "my" naturally throughout all text
- Write as a solo developer who knows what they're doing

#### Tone & Voice

- **Professional but casual**: Show competence while keeping it relaxed
- Use natural, conversational language
- Add personality - occasional "pesky bug", "sick animation", "clean code"
- Sound like someone who enjoys coding but takes it seriously

#### Commit Messages

- feat: "I'm adding the new navbar component with smooth animations"
- fix: "I fixed that routing issue that was bugging me"
- refactor: "I'm cleaning up the auth logic - much better now"
- docs: "I updated the README with the deployment steps"
- style: "I touched up the landing page - looking sharp now"
- test: "I added comprehensive tests for the user service"
- chore: "I'm updating the dependencies"

#### Code Comments

```javascript
// I'm using React Bits here for that sick glitch effect
// TODO: I need to optimize this when I get a chance
// This handles the auth flow - keeping it simple for now
// I love how clean this turned out
```

#### PR Descriptions

- "I've implemented the new feature we discussed..."
- "This PR fixes the issue I found in..."
- "I'm refactoring this section because..."

#### Documentation

- Write READMEs as if explaining to a colleague
- "I've set up the project with...", "You'll need to...", "I recommend..."
- Include personal insights: "I chose X because...", "In my experience..."

#### NEVER Mention

- AI, Claude, Anthropic, assistant, generated
- Any suggestion that code wasn't personally written
- Phrases like "implementing requested features" - instead: "implementing these features"

### ANBU Landing Page - UI/UX Architecture

#### Design Philosophy

- **Premium Aesthetic**: Dark luxury theme with gold accents (#FFD700) as the primary highlight color
- **Fluid Responsiveness**: Every element adapts seamlessly from mobile (375px) to 4K displays
- **Motion-First**: Subtle animations enhance user experience without overwhelming
- **Glassmorphism**: Strategic use of backdrop-blur and transparency for depth
- **Flexibility Over Rigidity**: Patterns are guidelines, not rules - always prioritize what works best

#### 🚨 CRITICAL: Chrome DevTools Screenshot Guidelines

**NEVER take full-page screenshots** - they create massive files that get rejected by the Claude API.

**Correct approach**:

- ✅ **ALWAYS use viewport-only screenshots**: `mcp__chrome-devtools__take_screenshot` (default)
- ✅ **Scroll and capture multiple viewport screenshots** to see different sections
- ✅ **Trigger lazy loading** by scrolling through page before capturing screenshots
- ❌ **NEVER use `fullPage: true`** parameter - it creates multi-MB images
- ❌ **NEVER try to capture entire page** in one shot

**Why**: Full-page screenshots of SPAs can be 5000+ pixels tall, creating files that exceed API limits. Viewport screenshots (~800px tall) are much smaller and always work.

#### Component Library Hierarchy

I've organized components into three tiers for maximum reusability and consistency:

1. **ReactBits Components** (`/components/reactbits/`)
   - Premium interactive effects (GradualBlurSection, AnimatedTooltip, LogoLoop)
   - Complex animations and transitions
   - Use for hero sections and key interactive elements

2. **Aceternity Components** (`/components/aceternity/`)
   - Advanced motion effects (Sparkles, Meteors, MovingBorder)
   - 3D transformations and parallax effects
   - Use sparingly for high-impact visual moments

3. **MagicUI Components** (`/components/magicui/`)
   - Text effects and micro-interactions (ShinyText, BlurFadeText)
   - Lightweight animations for content enhancement
   - Use throughout for consistent text animations

4. **Core UI Components** (`/components/ui/`)
   - Foundation components (Container, Button, BentoGrid)
   - Maintain consistency across all features
   - Always extend these rather than creating duplicates

#### Responsive Container System

```typescript
// Container sizes I've established for consistent spacing:
const containerSizes = {
  sm: 'max-w-3xl', // 48rem - Tight content areas
  md: 'max-w-5xl', // 64rem - Standard content (avoid for complex grids)
  lg: 'max-w-7xl', // 80rem - Primary layout container
  xl: 'max-w-[1440px]', // Custom - Wide sections
  full: 'max-w-full', // Edge-to-edge layouts
};
```

**Best Practices:**

- Use `lg` for sections with grid layouts (learned from About section fix)
- Always include responsive padding: `px-4 sm:px-6 lg:px-8`
- Avoid nested containers that might conflict
- Remove `overflow-hidden` when content might extend (Performance card issue)

#### Bento Grid Pattern

The BentoGrid system I've refined for flexible card layouts:

```typescript
// Responsive grid configuration that works:
<BentoGrid className="mt-4">  // Let the component handle its own responsive classes
  <BentoCard className="col-span-1" />  // Simple column spans, no conflicts
</BentoGrid>
```

**Lessons Learned:**

- Don't override grid-cols in the instantiation - let BentoGrid handle it
- Use simple col-span-1 for cards, avoid col-span-2 on mobile
- Remove fixed heights (min-h) for better content adaptation
- Grid should be: **2 columns mobile (375px+) → 4 columns desktop (1024px+)** for optimal mobile density
- Pattern: `grid-cols-2 lg:grid-cols-4` maximizes content visibility on phones

#### Animation & Motion Standards

```javascript
// Standard motion patterns I'm using:
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

const scaleOnHover = {
  whileHover: { scale: 1.05 },
  transition: { duration: 0.3 },
};
```

**Performance Guidelines:**

- Use `viewport: { once: true }` to prevent re-triggering
- Keep durations between 0.3s - 0.8s for smooth feel
- Avoid complex parallax on mobile (removed from About section)
- GPU-accelerate with `transform` and `opacity` only

#### Color System & Typography

```css
/* Core ANBU palette I'm maintaining: */
--anbu-black: #000000; /* Primary background */
--anbu-gold: #ffd700; /* Primary accent - CTAs, highlights */
--anbu-gold-accent: #ffa500; /* Secondary gold for hover states */
--anbu-marble: #f8f8f8; /* Text on dark backgrounds */
--anbu-gray: #2c2c2c; /* Subtle backgrounds */
```

**Typography Scale (Fluid):**

- Uses CSS clamp() for responsive sizing
- Maintains readability across all devices
- Font families: 'Inter' for body, 'Montserrat' for headings

#### Responsive Design Strategy

```typescript
// Breakpoint approach I'm following:
const breakpoints = {
  xs: '375px', // Minimum mobile support
  sm: '640px', // Large phones
  md: '768px', // Tablets
  lg: '1024px', // Laptops
  xl: '1280px', // Desktops
  laptop: '1440px', // 15" MacBook specific
  '2xl': '1536px', // Large monitors
};
```

**Layout Patterns:**

1. **Mobile (375-639px)**: 2-column grids for cards, tighter spacing, reduced padding
2. **Tablet (640-1023px)**: 2-column grids maintained, increased spacing
3. **Desktop (1024px+)**: 4-column grids, full spacing, side navigation

**Mobile Optimization Strategy (2024 Update):**

- **Always 2 columns minimum on mobile** for service/feature cards - maximizes content density
- **Reduce hero title size**: Start at `text-[1.25rem]` (20px) on smallest screens
- **Compact button padding**: `py-2 px-4` on mobile vs `py-3.5 px-9` on desktop
- **Tighter vertical spacing**: Use `space-y-2` on mobile, scale up to `space-y-6+` on desktop
- **Stats in 3 columns on all sizes**: Hide detail text on mobile, show on sm+
- **Use fluid typography variables** from globals.css instead of hardcoded responsive classes

#### Common Issues & Solutions

1. **Content Cutoff Issue** (Performance card problem)
   - Solution: Changed Container from `md` to `lg`, removed `overflow-hidden`
   - Always test with full content before adding overflow constraints

2. **Grid Conflicts** (BentoGrid responsiveness)
   - Solution: Don't override component's internal responsive classes
   - Let components manage their own breakpoint logic

3. **Image Positioning** (About section image)
   - Solution: Restructured layout to position image above grids
   - Use grid layouts for side-by-side on desktop, stack on mobile

4. **Port Conflicts** (Dev server)
   - Solution: Always check and kill existing processes
   - Next.js auto-increments ports (3000, 3001, 3002...)

#### Testing & Quality Assurance

```javascript
// Responsive testing workflow I follow:
const testBreakpoints = [
  { width: 375, height: 812 }, // Mobile
  { width: 768, height: 1024 }, // Tablet
  { width: 1280, height: 800 }, // Desktop
  { width: 1920, height: 1080 }, // Full HD
];

// Always test with Playwright for visual verification
```

#### Debugging & Iteration Philosophy

- **Enhance, Don't Restrict**: If a pattern isn't working, improve it rather than forcing adherence
- **Visual Testing**: Always verify with actual browser rendering, not just code
- **Progressive Enhancement**: Start mobile-first, add complexity for larger screens
- **Component Isolation**: Debug complex layouts by isolating components first
- **Documentation**: Update this file when discovering new patterns or solutions

#### File Organization

```
apps/landing/src/components/
├── ui/               # Core reusable components
├── features/         # Feature-specific sections
│   ├── hero/
│   ├── about/
│   ├── services/
│   └── contact/
├── layout/           # Navigation, Footer
├── reactbits/        # Premium effect components
├── aceternity/       # Advanced animations
└── magicui/          # Text and micro-interactions
```

#### Development Workflow for ANBU Landing

1. **Component Development**

   ```javascript
   // Start with mobile view, enhance for desktop
   // Test in isolation first, then integrate
   // Always check existing components before creating new ones
   ```

2. **Styling Approach**
   - Tailwind utilities first, custom CSS only when necessary
   - Use fluid spacing variables from globals.css
   - Maintain dark theme consistency throughout

3. **Performance Optimization**
   - Lazy load heavy animation components
   - Use Next.js Image for optimized loading
   - Minimize re-renders with proper React patterns
   - Test on throttled connections for real-world performance

#### Future Enhancement Guidelines

**Areas Open for Improvement:**

- **Animation Library**: Consider consolidating animation patterns
- **Component Variants**: Build more flexible prop-based variants
- **Accessibility**: Enhance keyboard navigation and screen reader support
- **Performance**: Implement code splitting for component libraries
- **Testing**: Add visual regression tests for critical UI states

**Innovation Encouraged In:**

- New motion patterns that enhance user experience
- Creative solutions for responsive challenges
- Performance optimizations that maintain visual quality
- Component compositions that solve complex UI needs
- Accessibility improvements that don't compromise aesthetics

**Maintain Consistency In:**

- Color palette and gold accent usage
- Typography scale and font choices
- Spacing system and container patterns
- Animation timing and easing functions
- Dark luxury aesthetic theme

#### Quick Reference Commands

```bash
# Development
cd apps/landing && pnpm dev     # Start dev server
pnpm build                       # Build for production
pnpm lint                        # Check code quality

# Testing Responsive Design
# Use Playwright browser tools to test at:
# Mobile: 375x812
# Tablet: 768x1024
# Desktop: 1280x800
# 4K: 1920x1080
```

#### Known Gotchas & Tips

1. **Tailwind Conflicts**: Check for conflicting utility classes when debugging layout issues
2. **Z-Index Layers**: Navigation is z-50, modals use z-[100], tooltips use z-[200]
3. **Framer Motion**: Always cleanup animations on unmount to prevent memory leaks
4. **Container Nesting**: Avoid Container > Container nesting, causes spacing issues
5. **Grid Spans**: Test col-span values across all breakpoints
6. **Overflow Hidden**: Be cautious - can clip content unexpectedly (learned from Bento grid issue)
7. **Container Horizontal Overflow (CRITICAL)**: Container must use `maxWidth: min(${size}, 100vw)` not just `maxWidth: ${size}` - otherwise content extends beyond viewport on mobile causing black screens and horizontal scroll. Fixed in Container.tsx by clamping to viewport width.

#### 🚨 CRITICAL: Tailwind CSS Centering Not Working Fix

**Problem**: Container elements with `mx-auto` not centering, content sticking to left side of screen.

**Root Causes Found**:

1. **Wrong Tailwind imports in globals.css**:
   - ❌ WRONG: `@import "tailwindcss/preflight"; @import "tailwindcss/utilities";`
   - ✅ CORRECT: `@tailwind base; @tailwind components; @tailwind utilities;`

2. **Global CSS reset overriding Tailwind**:
   - The `* { margin: 0; padding: 0; }` rule forces all margins to 0
   - This overrides Tailwind's `mx-auto` which needs `margin-left: auto; margin-right: auto`

3. **Container component structure issues**:
   - Don't apply flex directly to Container component - it breaks mx-auto centering
   - Keep Container as block-level element for proper centering

**Solution Applied**:

```typescript
// Container.tsx with inline styles fallback
export default function Container({
  children,
  className,
  size = 'lg'
}: ContainerProps) {
  const sizeValues = {
    sm: '768px',
    md: '1024px',
    lg: '1280px',
    xl: '1440px',
    full: '100%'
  }

  return (
    <div
      className={cn('w-full', className)}
      style={{
        maxWidth: sizeValues[size],
        marginLeft: 'auto',
        marginRight: 'auto',
        paddingLeft: '1rem',
        paddingRight: '1rem',
      }}
    >
      {children}
    </div>
  )
}
```

**Correct Usage Pattern**:

```jsx
<Container size="lg">
  {' '}
  // Block element with mx-auto
  <div className="flex flex-col items-center"> // Flex only on inner div // Content here</div>
</Container>
```

**Debugging Steps**:

1. Check computed styles with browser DevTools - look for `margin-left: auto`
2. Verify Tailwind CSS is properly imported in globals.css
3. Check for global CSS resets that might override margins
4. Ensure Container component isn't changed to flex display
5. Use inline styles as fallback when Tailwind utilities fail

#### When to Break the Rules

These guidelines are meant to help, not hinder. Break them when:

- User experience would significantly improve
- Performance gains justify the change
- A creative solution better serves the project goals
- Testing reveals a better approach
- The current pattern creates unnecessary complexity

Remember: I'm building this to be premium, fluid, and delightful. If something isn't working, I iterate and improve rather than forcing adherence to patterns that don't serve the project.

## Cleanup Procedures

### 🚨 CRITICAL: Background Process Management

**ALWAYS clean up background processes before ending a session!** I must remember to:

1. **Check for running background processes**
   - Use `/bashes` command to list all active background shells
   - Look for any shells with status: "running"
   - Common culprits: `pnpm dev`, `npm run dev`, build processes

2. **Kill ALL background processes before session end**
   - Use `KillShell` tool with the shell ID for each running process
   - Verify all are killed by checking `/bashes` again
   - This is MANDATORY - prevents port conflicts and resource drain

3. **Close Playwright browser instances** after testing
   - Use `mcp__playwright__browser_close` to close browser tabs
   - This frees up system resources

4. **Session Cleanup Checklist**:
   - [ ] Run `/bashes` to check for active processes
   - [ ] Kill all development servers (`pnpm dev`, etc.)
   - [ ] Close any Playwright browser instances
   - [ ] Verify no processes remain with final `/bashes` check
   - [ ] Document any intentionally persistent processes

5. **Common background processes that MUST be killed**:
   - `pnpm dev` or `npm run dev` (Next.js development server)
   - `pnpm build` or `npm run build`
   - Any test runners or file watchers
   - Playwright browser automation sessions
   - Chrome DevTools MCP instances

6. **Detecting orphaned dev servers**:

   ```bash
   # Check for running Next.js/Node processes
   ps aux | grep -E "(pnpm|npm|node)" | grep -v grep

   # Check what's using specific ports
   lsof -ti:3000,3001,4000,4001,4100,4102 2>/dev/null

   # Kill processes on specific ports
   lsof -ti:4000 | xargs kill -9 2>/dev/null || true
   ```

7. **Chrome DevTools MCP Usage**:
   - Use `--isolated` flag when multiple agents need Chrome simultaneously
   - Example: `chrome-devtools-mcp --isolated`
   - Always close browser tabs after testing: `mcp__chrome-devtools__close_page`

### Development Server Ports

- Default Next.js port: 3000
- Fallback ports: 3001, 3002, etc.
- Always check for port conflicts before starting

### Best Practices

- Always clean up before closing a session
- Document any long-running processes that need to persist
- Use background execution (`run_in_background: true`) for long tasks
- Monitor output with `BashOutput` tool when needed
