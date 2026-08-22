# Testing Documentation

This project uses **Vitest** as the test runner and **React Testing Library** for component and integration testing.

## Running Tests

To run the full test suite once:
```bash
pnpm test
```

To run tests in watch mode during development:
```bash
pnpm exec vitest
```

## Test Structure

The test suite is organized into four main layers:

### 1. Unit Tests (Utilities & Content)
- **`app/lib/utils.test.ts`**: Verifies the `cn` utility for merging Tailwind classes and resolving conflicts.
- **`app/content/profile.test.ts`**: Ensures the integrity of the professional profile data used throughout the site.

### 2. Component Tests (UI Library)
Located alongside the UI components in `app/components/ui/`, these tests verify the rendering and behavior of reusable primitives:
- **`button.test.tsx`**: Tests variants, sizes, and `asChild` (Radix Slot) behavior.
- **`badge.test.tsx`**: Verifies variant-specific styling.
- **`card.test.tsx`**: Ensures proper composition of card sub-components.

### 3. Route Integration Tests
Located in `app/routes/`, these tests verify that pages render their key sections and integrated components correctly:
- **`home.test.tsx`**: Confirms the landing page renders the Hero, About, Journey, Portfolio, and Digital Twin sections.
- **`portfolio.test.tsx`**: Verifies that project cards and the roadmap are displayed.

### 4. API Tests
- **`app/routes/api.chat.test.ts`**: Tests the Digital Twin chat endpoint, covering request validation, message sanitization, and error handling for missing API keys or invalid methods.

## Best Practices for Adding Tests

1. **File Naming**: Place test files next to the implementation with a `.test.ts` or `.test.tsx` extension.
2. **Mocking**: Use `vi.mock()` or global mocks (like `fetch`) for external dependencies or complex framework components.
3. **Accessibility**: Prefer testing with `screen.getByRole` or `screen.getByLabelText` to ensure components are accessible.
4. **Data Integrity**: When updating `app/content/profile.ts`, ensure corresponding checks in `profile.test.ts` are updated or added.
