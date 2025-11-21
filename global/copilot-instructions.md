# Copilot Global Instructions

## Stack & infrastructure
- Use TypeScript everywhere (backend and frontend); avoid plain JavaScript unless explicitly required.
- Backend runs on Cloudflare (Workers/Pages/D1/KV/R2/Queues as appropriate).
- Frontend uses React + TypeScript + Tailwind CSS.
- Prefer functional, composable code and small, focused modules.

## Architecture & scope of changes
- Understand the existing code and database structure before editing. Use existing patterns first.
- Keep responsibilities isolated: each function/module/component should do one clear job.
- When asked to modify a feature, only touch the minimum set of files required for that change.
- Do not refactor or “clean up” unrelated areas unless explicitly requested.
- Share logic via utilities/services instead of copy-pasting.

## Styling, design system, and UX
- Treat design as top-down and centralized. Do not define ad-hoc styles per page.
- Use shared UI primitives (buttons, inputs, layout components) and shared Tailwind config/design tokens.
- If a button style changes, update the shared component so the change propagates everywhere.
- Follow Fluent UI principles in spirit: clear hierarchy, consistent spacing, predictable interactions, and smooth focus/hover states.
- All UI must be responsive (mobile and desktop) and support light/dark themes via a single theming system.
- Default to minimalist layouts with bold, readable typography.
- Ensure accessibility: semantic HTML, labels for controls, keyboard navigability, visible focus, and correct ARIA usage when needed.
- **Icons:** Follow theme-specific icon library guidelines in `/ai/icon-library-instructions.md`. Default to Lucide React for modern projects. Always use theme tokens for icon colors and proper ARIA labels for accessibility.

## Secrets, permissions, and configuration
- Never hardcode secrets, API keys, tokens, or passwords in source, comments, or tests.
- Use Cloudflare secrets / environment variables and existing config helpers for all credentials and sensitive config.
- Centralize permissions and config in dedicated modules (e.g., `/config`); do not scatter access logic across the codebase.
- When adding a new integration, wire it through the central config/permissions mechanism and update the related `.md` doc that explains usage.

## Testing & quality
- For any non-trivial change, add or update tests. Respect the existing testing stack and file layout.
- Keep tests in dedicated test folders or `*.test.ts` files and name them clearly to show what they cover.
- Prioritize:
  - Unit tests for pure logic.
  - Integration tests for APIs/data flows.
  - UI/e2e tests for critical user flows, verifying that essential elements render and can be interacted with.
- Where supported, include UI tests that check basic behavior on both mobile and desktop viewports.
- Do not consider work complete if tests or linting would obviously fail.

## Git, CI/CD, and environments
- Keep commits small, focused, and descriptive.
- Do not commit build artifacts, node_modules, or environment files.
- Respect the existing branching and deployment strategy. Do not change CI/CD configuration unless explicitly requested.
- Assume changes are deployed only after tests pass in CI.

## Comments, docs, and AI artifacts
- Comment non-obvious logic and important boundaries; avoid redundant comments that restate code.
- Update or create concise docs for new APIs, modules, or important flows under `/docs`.
- Keep all AI-specific prompts, histories, and instructions in their own folder (e.g., `docs/ai/`) and out of main source directories.

## File lifecycle & deprecation
- Do not delete files unless explicitly told to.
- When a file is clearly unused or obsolete, mark it for deletion by renaming it with a clear prefix/suffix (e.g., `z_deprecated_<name>.ts`) so it sorts to the bottom.
- Optionally add a short top-of-file comment stating why and when it was deprecated.

## Interaction style (AI behavior)
- Assume autonomy; ask the user for help only when necessary to avoid ambiguity that could break data, security, or critical UX.
- If a requested change conflicts with these rules (security, secrets, architecture), highlight the conflict and propose a safer alternative.

