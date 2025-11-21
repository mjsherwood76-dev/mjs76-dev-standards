# Testing Standards & Patterns

This directory provides concrete examples and patterns for testing across the mjs76 stack.

## Testing Philosophy

- **Test behavior, not implementation**: Focus on observable outcomes rather than internal mechanics
- **Maintain coverage without brittleness**: Tests should survive refactoring when behavior stays the same
- **Test at the right level**: Unit tests for logic, integration for data flows, e2e for critical user paths
- **Respect the standards**: Tests must align with architecture patterns from `global/`, `backend/`, and `frontend/` instructions

## Directory Structure

```
testing/
├── README.md (this file)
├── backend/
│   ├── unit/
│   │   └── service-example.test.ts
│   ├── integration/
│   │   └── api-endpoint-example.test.ts
│   └── mocks/
│       ├── cloudflare-bindings.ts
│       └── test-data.ts
├── frontend/
│   ├── unit/
│   │   ├── hook-example.test.tsx
│   │   └── utility-example.test.ts
│   ├── component/
│   │   ├── button-example.test.tsx
│   │   └── themed-component-example.test.tsx
│   └── e2e/
│       └── theme-switching-example.spec.ts
└── shared/
    ├── test-utils.ts
    └── setup.ts
```

## Quick Start by Test Type

### Backend Unit Tests
```bash
# Example: Testing a service function
cd testing/backend/unit
# Review service-example.test.ts
```

### Backend Integration Tests
```bash
# Example: Testing an API endpoint with D1/KV
cd testing/backend/integration
# Review api-endpoint-example.test.ts
```

### Frontend Component Tests
```bash
# Example: Testing a themed button component
cd testing/frontend/component
# Review themed-component-example.test.tsx
```

### End-to-End Tests
```bash
# Example: Testing theme switching flow
cd testing/frontend/e2e
# Review theme-switching-example.spec.ts
```

## Testing Tools by Layer

### Backend (Cloudflare Workers/Pages)

**Unit Testing**:
- **Vitest** - Fast, TypeScript-native test runner
- **@cloudflare/vitest-pool-workers** - Run tests in Workers runtime

**Integration Testing**:
- **Miniflare** - Local Cloudflare Workers simulator for D1/KV/R2
- **Wrangler** - Official CLI for dev/testing environments

**Mocking**:
- Mock Cloudflare bindings (D1, KV, R2, Queues) using `testing/backend/mocks/`

### Frontend (Next.js + React)

**Component Testing**:
- **React Testing Library** - User-centric component testing
- **Vitest** or **Jest** - Test runner

**E2E Testing**:
- **Playwright** - Cross-browser automation (recommended)
- **Cypress** - Alternative with great DX

**Visual Regression**:
- **Playwright screenshots** - Compare before/after for theme changes
- **Chromatic** or **Percy** - Cloud-based visual diffing (optional)

## Key Testing Scenarios

### 1. Multi-Theme Testing

All UI changes must work across:
- 5 style themes (default, minimalist, earthy, cyber-noir, luxury)
- 2 modes (light, dark)
- = **10 theme/mode combinations**

See `frontend/component/themed-component-example.test.tsx` for patterns.

### 2. Token-Based Styling

Test that components:
- Don't hardcode colors/radii/fonts
- Respond correctly to token changes
- Maintain WCAG AA contrast in all theme modes

### 3. Cloudflare Runtime

Backend tests should:
- Use `@cloudflare/vitest-pool-workers` to test in Workers environment
- Mock D1/KV/R2 using Miniflare or test fixtures
- Validate secrets handling (never log/expose)

### 4. Accessibility

Every interactive component needs:
- Keyboard navigation tests
- Focus indicator verification
- ARIA attribute assertions
- Screen reader compatibility (label/role checks)

See `design/accessibility.md` for WCAG checklist.

## Running Tests

### Local Development

```bash
# Backend unit tests
cd backend
npm test

# Backend integration tests (with Miniflare)
npm run test:integration

# Frontend component tests
cd frontend
npm test

# Frontend e2e tests
npm run test:e2e

# All tests
npm run test:all
```

### CI/CD

See `.github/workflows/test.yml` for automated testing patterns.

## Writing Good Tests

### DO ✅

- Use descriptive test names: `"should display error message when email is invalid"`
- Test user-facing behavior: "clicking submit button shows loading spinner"
- Use semantic queries: `getByRole('button', { name: 'Submit' })`
- Mock external dependencies (APIs, databases)
- Clean up after tests (reset mocks, clear test data)
- Test error states and edge cases
- Verify accessibility attributes

### DON'T ❌

- Test implementation details: "should call useState with initial value"
- Use fragile selectors: `.css-class-xyz`
- Write interdependent tests (test A must run before test B)
- Hardcode test data that duplicates constants
- Skip cleanup (memory leaks, polluted state)
- Ignore type errors in test files
- Write tests that pass despite being broken

## Coverage Goals

- **Backend services**: 80%+ line coverage, 100% of critical paths
- **Frontend components**: 70%+ line coverage for shared UI primitives
- **E2E flows**: All critical user journeys (login, checkout, theme switching, etc.)

Quality over quantity—meaningful tests that catch real bugs are better than 100% coverage with shallow assertions.

## Example Test Structure

```typescript
import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('FeatureName', () => {
  // Setup
  beforeEach(() => {
    // Reset state, clear mocks
  });

  // Happy path
  it('should handle successful case correctly', () => {
    // Arrange
    const input = createTestData();
    
    // Act
    const result = functionUnderTest(input);
    
    // Assert
    expect(result).toEqual(expectedOutput);
  });

  // Error handling
  it('should throw meaningful error when input is invalid', () => {
    expect(() => functionUnderTest(null)).toThrow('Input required');
  });

  // Edge cases
  it('should handle empty array gracefully', () => {
    const result = functionUnderTest([]);
    expect(result).toEqual([]);
  });
});
```

## Resources

- [Vitest Documentation](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/react)
- [Playwright Docs](https://playwright.dev/)
- [Cloudflare Workers Testing](https://developers.cloudflare.com/workers/testing/vitest-integration/)
- [Testing Best Practices](https://testingjavascript.com/)

---

**Next Steps**: Review the example test files in subdirectories for concrete patterns you can copy into your projects.
