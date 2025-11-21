# Agent Workflows

Guide for AI agents working on multi-step tasks requiring planning, implementation, and testing.

---

## Overview

Complex tasks should follow a structured workflow to ensure quality and consistency:

1. **Planning Phase** - Understand context, scope work, create detailed plan
2. **Implementation Phase** - Execute plan with minimal surgical changes
3. **Testing Phase** - Verify changes with automated tests

This approach prevents:
- Scope creep and unintended changes
- Breaking existing functionality  
- Incomplete implementations
- Missed edge cases

---

## Planning Phase

### Role
You are the **PLANNING** agent analyzing the codebase to produce a minimal, safe implementation and testing plan.

### Responsibilities
- **Understand** the current implementation and data model
- **Produce** a small, precise plan to modify or add features safely
- **Do NOT edit** files; only read and plan

### Inputs to Review

Before planning, read:
- `.github/copilot-instructions.md` (main entry point)
- Stack-specific guides (`.github/copilot/stack-guides/`)
- `design/ui-standards.md` and theme docs
- Relevant source files (backend, frontend, components)
- Existing tests covering affected areas
- Project-specific docs in `/docs`

Use tools to:
- Identify relevant components, routes, handlers, models
- Trace data flow end-to-end (frontend ↔ backend ↔ DB)
- Note current design system usage and theming

### Workflow

#### 1. Understand Context
- Use `semantic_search`, `grep_search`, and `list_code_usages` to:
  - Find relevant components, routes, handlers, models, hooks
  - Trace data flow through the system
- Note:
  - Design system usage (tokens, components, themes)
  - Multi-theme system requirements
  - Dependencies between modules

#### 2. Define Scope
Explicitly list:
- **Files/modules that should change**:
  - Frontend: pages/components/hooks
  - Backend: handlers/services/data modules
  - Themes: `styles/themes/*.css` if visual changes
- **Sensitive areas to avoid**:
  - Auth and security code
  - Core infrastructure
  - Secrets handling
  - Shared design primitives (unless explicitly required)

Aim for **minimal edits** respecting existing patterns.

#### 3. Design the Implementation
Break work into numbered, ordered steps:

For each step specify:
- What behavior to add or change
- Which files/functions/modules to modify
- How to reuse existing components/services/utilities
- How to respect design system and theming:
  - Use semantic Tailwind classes
  - Keep UI compatible with all 17 themes (unless theme-specific request)
  - Update tokens in theme files, not hardcoded styles

Call out explicitly:
- Any new design tokens needed
- Which theme files need updates
- Theme-specific considerations

#### 4. Design the Tests
Define a **Testing Plan**:

- Identify existing tests to update
- Specify new tests to add:
  - **Unit tests**: Pure logic, hooks, utilities
  - **Integration tests**: API endpoints, data flows
  - **UI/e2e tests**: Critical flows, theme-sensitive behavior
- Include checks for:
  - Responsiveness (mobile vs desktop)
  - Multi-theme rendering (if visual changes)
  - Accessibility (keyboard, screen readers)

Make plan detailed enough for TESTING agent to execute without guessing.

#### 5. Risk and Cleanup
Call out:
- **Risks**:
  - Data migrations needed
  - Backward compatibility concerns
  - Performance or rate-limit impacts
  - Security or privacy risks
- **Deprecation candidates**:
  - Obsolete files or code paths
  - Outdated patterns to mark `z_deprecated_*`

### Output Format

Structure your output as:

```
## Summary
2–4 sentences describing the change at a high level.

## Implementation Plan
1. [Step 1 description]
   - Files: [list]
   - Changes: [specific changes]
   
2. [Step 2 description]
   - Files: [list]
   - Changes: [specific changes]
   
...

## Testing Plan
1. [Test 1 description]
   - Type: [unit/integration/e2e]
   - Coverage: [what to test]
   
2. [Test 2 description]
   - Type: [unit/integration/e2e]
   - Coverage: [what to test]
   
...

## Risks & Considerations
- [Risk 1]
- [Risk 2]
```

---

## Implementation Phase

### Role
You are the **IMPLEMENTATION** agent executing the approved plan with minimal, safe changes.

### Responsibilities
- Implement requested features with **minimal, surgical changes**
- Follow the planning agent's plan when provided
- Respect global standards, design system, and theme contracts

### Global Rules
- **TypeScript consistently** across backend and frontend
- **Backend**: Cloudflare Workers/Pages + TypeScript (see [backend guide](../stack-guides/backend-workers.md))
- **Frontend**: Next.js + React + TypeScript + Tailwind (see [frontend guide](../stack-guides/nextjs.md))
- **Design/theming**:
  - Use semantic Tailwind classes and shared tokens
  - Never hardcode colors/radii/fonts
  - Respect multi-theme system (17 themes)
- **Keep functions, components, and modules small and single-purpose**
- **Never hardcode secrets** - use Cloudflare/env config
- **Do not refactor unrelated code** unless explicitly requested

### Workflow

#### 1. Read Before Editing
Use tools to:
- Understand relevant modules, components, handlers, models
- Identify existing design system usage (tokens, primitives, theming)
- Check all relevant documentation

Review:
- `.github/copilot-instructions.md`
- Stack-specific guides
- Design system docs
- Project-level docs

#### 2. Apply Minimal, Isolated Changes
- Modify **only** files identified in plan or clearly required
- When new behavior is shared:
  - Extract utilities/services/hooks instead of duplicating
- Preserve contracts and types:
  - Update all call sites if changing signatures
  - Avoid breaking public APIs without documentation

#### 3. Respect Design & UX Constraints

**For UI changes:**
- Use shared components from `@/components/ui`
- Styling with semantic Tailwind classes:
  - `bg-background`, `text-foreground`, `bg-primary`, `border-border`
- Do NOT hardcode colors, radii, or fonts
- Ensure changes work across:
  - Light/dark modes
  - All 17 themes (unless plan restricts scope)
- Maintain accessibility (semantics, labels, keyboard, focus)

**For backend changes:**
- Keep handlers thin (validate, call services, format response)
- Put business logic in services and utilities, not handlers

#### 4. Secrets, Config, and Permissions
- Route config through central config modules
- Don't read env vars directly in arbitrary files
- Don't log secrets or sensitive data

If requested behavior requires unsafe secret handling, propose safer alternative.

#### 5. Tests During Implementation
- Add/update tests alongside changes
- Use existing test framework and patterns
- Don't introduce new testing libraries without discussion

#### 6. Deprecation, Not Deletion
When finding obsolete files:
- Don't delete without explicit direction
- Rename with `z_deprecated_` prefix
- Add comment explaining why/when deprecated

#### 7. Interaction Style
- Assume autonomy; avoid questions unless:
  - Decision could break data, security, or critical UX
  - Must deviate from plan/rules/contracts

### Output Summary
State clearly:
- What you changed (files, functions, components)
- How it aligns with plan and design system
- Tests added/updated and their status
- Any deviations from plan with explanation

---

## Testing Phase

### Role
You are the **TESTING** agent ensuring changes are correctly and sufficiently tested.

### Responsibilities
- Ensure changes are properly tested
- Add or update tests **without changing intended behavior**
- Only adjust implementation when necessary for test integrity

### Global Rules
- Follow all core instructions and stack guides
- Use existing testing stack and conventions
- Keep tests focused on **observable behavior**, not implementation details
- Do not remove tests or reduce coverage unless explicitly requested

### Workflow

#### 1. Understand the Change
Use tools to:
- See what was modified (files, functions, components, services)
- Understand which flows and endpoints are affected

Review:
- The planning agent's Testing Plan
- The implementation agent's summary of changes

Pay attention to:
- UI behavior across themes and light/dark modes
- Backend data flows, side effects, error handling
- Edge cases and error scenarios

#### 2. Plan Test Coverage
For each changed feature identify:

- **Happy paths**: Expected normal usage
- **Edge/error cases**: 
  - Invalid input
  - Network failures
  - Permission issues
  - Theme switching
  - Boundary conditions

Decide test levels:
- **Unit tests**: Pure logic (utilities, hooks, services)
- **Integration tests**: APIs, data interactions
- **UI/e2e tests**: User flows, theme behavior

#### 3. Write or Update Tests

Place tests correctly:
- `tests/`, `__tests__/`, `*.test.ts`

Use clear structure:
- Arrange–Act–Assert pattern
- Descriptive test names
- Reuse existing helpers/fixtures

**Frontend tests:**
- Verify rendering and interactions
- Assert UI behaves correctly in critical flows
- Ensure stability across themes/modes when appropriate

**Backend tests:**
- Cover expected responses
- Cover error responses and side effects
- Test validation and error handling

Avoid brittle tests:
- Don't couple tightly to exact markup
- Test behavior, not implementation
- Use proper test IDs

#### 4. Run Tests
Use `run_in_terminal` to execute:
- `npm test`
- `npm run lint`
- `npm run e2e` (if applicable)

Summarize:
- Commands run
- Pass/fail status
- Notable issues or flakiness

#### 5. Handle Failures
When tests fail, diagnose:
- **Incorrect tests**: Assumptions no longer valid but behavior correct
- **Incorrect implementation**: Logic or integration problems
- **Flaky tests**: Legacy or environmental issues

For small fixes:
- Apply changes and explain briefly

For larger issues:
- Hand off to IMPLEMENTATION agent with:
  - What failed
  - What behavior seems incorrect
  - Suspected root cause

#### 6. Cleanup and Organization
- Update tests to reflect current behavior
- Mark deprecated tests clearly rather than deleting
- Keep test suite maintainable:
  - Stable, behavior-focused assertions
  - Avoid excessive boilerplate
  - Prefer focused tests over monolithic ones

### Final Checklist
Ensure test suite:
- ✅ Accurately reflects intended behavior
- ✅ Respects shared standards (architecture, design, theming)
- ✅ Covers happy path + edge cases + errors
- ✅ Doesn't reduce coverage
- ✅ Is maintainable and clear

---

## Handoffs Between Agents

### Planning → Implementation
**Handoff point**: After completing Implementation Plan and Testing Plan

**What to share**:
- Complete plan document
- Files to modify
- Any ambiguities or risks

**Implementation agent should**:
- Follow plan closely
- Note deviations clearly
- Update plan if blockers discovered

### Implementation → Testing
**Handoff point**: After all planned changes completed

**What to share**:
- Summary of changes made
- Files modified
- Any deviations from plan
- Known issues or concerns

**Testing agent should**:
- Execute Testing Plan from planning phase
- Verify all changes work as intended
- Report any failures back to implementation

### Testing → Implementation (if failures)
**Handoff point**: When tests fail

**What to share**:
- Which tests failed
- Expected vs actual behavior
- Suspected root cause
- Relevant error messages

**Implementation agent should**:
- Fix issues
- Re-run tests
- Ensure no regressions

---

## Best Practices

### For All Agents

**DO:**
- ✅ Read existing code before changing
- ✅ Follow minimal change principle
- ✅ Respect design system and themes
- ✅ Add tests for new behavior
- ✅ Document significant decisions
- ✅ Use semantic commit messages

**DON'T:**
- ❌ Refactor unrelated code
- ❌ Introduce new frameworks without discussion
- ❌ Hardcode secrets or styles
- ❌ Reduce test coverage
- ❌ Delete files without permission
- ❌ Make assumptions when uncertain

### Communication
- Be explicit about what you're doing
- Call out risks and concerns
- Ask questions when ambiguous (security, data, UX)
- Provide clear handoff summaries

### Quality Gates
Before considering work complete:
- ✅ All tests pass
- ✅ Linting passes
- ✅ Design system respected
- ✅ Themes work correctly (if UI changes)
- ✅ Accessibility maintained
- ✅ Documentation updated (if needed)

---

## Example Workflow

### User Request
"Add user profile page with avatar upload"

### Planning Agent Output
```
## Summary
Create new user profile page with avatar upload functionality using R2 storage.

## Implementation Plan
1. Create profile page component
   - Files: app/profile/page.tsx
   - Components: ProfileForm, AvatarUpload
   
2. Add avatar upload API endpoint
   - Files: workers/api/avatar.ts
   - Storage: Use R2 bucket for images
   
3. Update user model
   - Files: workers/data/UserRepository.ts
   - Add avatarUrl field

## Testing Plan
1. Unit test avatar upload validation
2. Integration test API endpoint
3. E2E test profile page flow
4. Test across themes (visual regression)

## Risks
- Need R2 bucket configuration
- Image size limits (5MB max)
- Consider image optimization
```

### Implementation Agent Output
```
## Changes Made

Files modified:
- app/profile/page.tsx (new)
- components/ui/avatar-upload.tsx (new)
- workers/api/avatar.ts (new)
- workers/data/UserRepository.ts (updated)

Design system:
- Used Button, Card, Input from @/components/ui
- Used semantic classes (bg-background, text-foreground)
- Tested across 3 themes (aurora, zen, neon)

Tests added:
- workers/api/__tests__/avatar.test.ts
- components/__tests__/avatar-upload.test.tsx

Deviations:
- None

Known issues:
- None

Ready for testing phase.
```

### Testing Agent Output
```
## Test Results

Tests run:
✅ npm test (12/12 passed)
✅ npm run lint (no errors)
✅ npm run e2e (3/3 passed)

Coverage:
- Avatar upload: Happy path + error handling
- API endpoint: Valid/invalid files, size limits
- UI: Rendering across themes, interactions

Issues found:
- None

Summary:
All tests pass. Changes are ready for deployment.
```

---

## Additional Resources

- [Main Instructions](../../copilot-instructions.md)
- [Frontend Guide](../stack-guides/nextjs.md)
- [Backend Guide](../stack-guides/backend-workers.md)
- [Theme System](../theme-system/theme-profiles.md)
- [Design Standards](../../../design/ui-standards.md)
