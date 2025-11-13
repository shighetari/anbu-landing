# Testing Structure

This directory contains the testing infrastructure for the ANBU landing application.

## Directory Structure

```
tests/
├── setup.ts              # Global test setup and mocks
└── e2e/                  # End-to-end Playwright tests
    └── hero-buttons.spec.ts

src/
└── **/__tests__/         # Unit/integration tests co-located with source
    └── *.spec.ts
```

## Test Types

### Unit Tests (`*.spec.ts`)
- Located alongside source files in `__tests__` directories
- Run with Vitest: `pnpm test`
- Test individual functions, utilities, and components in isolation

### E2E Tests (`tests/e2e/*.spec.ts`)
- Located in `tests/e2e/`
- Run with Playwright: `pnpm test:e2e`
- Test full user flows and interactions

## Running Tests

```bash
# Run all unit tests
pnpm test

# Watch mode for development
pnpm test:watch

# Run E2E tests
pnpm test:e2e

# Type checking
pnpm typecheck

# Run all checks
pnpm lint && pnpm typecheck && pnpm test
```

## Writing Tests

### Unit Test Example

```typescript
import { describe, it, expect } from 'vitest'
import { myFunction } from '../my-module'

describe('myFunction', () => {
  it('should return expected value', () => {
    expect(myFunction('input')).toBe('output')
  })
})
```

### Component Test Example

```typescript
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MyComponent } from '../MyComponent'

describe('MyComponent', () => {
  it('should render correctly', () => {
    render(<MyComponent />)
    expect(screen.getByText('Hello')).toBeInTheDocument()
  })
})
```

## Mocks and Setup

Global mocks and setup are configured in `tests/setup.ts`:
- Next.js router mocks
- Testing library cleanup
- Global test utilities

## Coverage

Coverage reports are generated in the `coverage/` directory when running tests.

```bash
# Run tests with coverage
pnpm test --coverage
```

## Best Practices

1. **Co-locate tests**: Place unit tests in `__tests__` directories next to the code they test
2. **Use descriptive names**: Test file names should match the module they test
3. **Test behavior, not implementation**: Focus on what the code does, not how
4. **Keep tests simple**: One assertion per test when possible
5. **Mock external dependencies**: Use Vitest mocks for APIs, timers, etc.
