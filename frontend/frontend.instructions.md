# Frontend Instructions (Web / UI)

Scope: All frontend code in this folder (Next.js + React + TypeScript + Tailwind + shadcn/ui).

---

## 1. Canonical Frontend Stack

All new frontend work must use:

- **Next.js (App Router)** with React function components.
- **TypeScript** for all components, hooks, and utilities.
- **Tailwind CSS** for styling, wired to shared design tokens.
- **shadcn/ui** (Radix-based components) for UI primitives under `@/components/ui`.
- **next-themes** for light/dark color modes.
- A **multi-style theme** system, using `data-theme` on `<html>` for:
  - `default`, `minimalist`, `earthy`, `cyber-noir`, `luxury`.

If a project cannot use this stack, document the exception explicitly.

For detailed design & theming contracts, see:

- `design/ui-standards.md`
- `design/themes.md`

---

## 2. Structure & Responsibilities

- **Pages** (App Router):
  - Thin orchestration: routing, data fetching, layout composition.
  - Minimal logic; delegate to hooks/services.
- **Components**:
  - **UI primitives** in `@/components/ui/*` (shadcn/ui-based).
  - **Layout components** in `@/components/layout/*` (app shell, header, sidebar, page sections).
  - **Feature components** in `@/components/features/*` composed from UI + layout primitives.
- **Hooks** (`@/hooks`):
  - Encapsulate data fetching and stateful behavior.
  - Reuse patterns for data loading, forms, modals, etc.

Avoid large “god components.” Prefer small, focused components and hooks.

---

## 3. Design System & Styling Rules

- Styling is **token-based**:
  - Colors, radii, shadows, and fonts come from CSS variables (e.g., `--background`, `--primary`, `--radius-lg`).
  - Tailwind is configured to use `hsl(var(--...))` for color tokens and variables for radii/fonts.
- Use **semantic Tailwind classes**:
  - `bg-background`, `text-foreground`, `bg-primary`, `border-border`, `text-muted-foreground`, etc.
  - Do **not** hardcode hex colors, one-off border radii, or custom font families in components.
- Use shared primitives:
  - Buttons: `<Button>` from `@/components/ui/button`.
  - Cards: `<Card>` from `@/components/ui/card`.
  - Inputs: `<Input>`, `<Textarea>`, `<Select>`, etc. from `@/components/ui`.
- If you need a new look for a primitive:
  - Extend the shared component (e.g., add a new `variant` prop).
  - Do **not** create ad-hoc, duplicated button styles.

Design goals:

- Simple, modern UX.
- Clean layouts.
- Consistent spacing and hierarchy.

---

## 4. Multi-Theme System

We support **5** style themes:

1. `default` – modern SaaS baseline  
2. `minimalist` – grayscale, typography-led  
3. `earthy` – warm, organic  
4. `cyber-noir` – dark sci-fi with neon accents  
5. `luxury` – gold + plum premium feel  

Implementation contracts:

- `<html>`:
  - `class` controls light/dark mode (`"dark"` class from `next-themes`).
  - `data-theme` controls style theme (`default|minimalist|earthy|cyber-noir|luxury`).
- Theme values:
  - Defined in `styles/themes/*.css` as CSS variables for each theme and mode.
  - Each theme provides values for the full token set described in `design/ui-standards.md`.

To change the look:

- Only modify theme token files (`styles/themes/*.css`) or add a new theme file.
- Do **not** alter component code purely for visual styling.

---

## 5. Responsiveness, UX, and Accessibility

- Responsiveness:
  - All UI must render well on mobile and desktop.
  - Use Tailwind responsive utilities (`sm`, `md`, `lg`, `xl`, etc.).
  - Test layouts at key breakpoints.
- UX patterns:
  - Use consistent patterns for:
    - Loading states (skeletons/spinners)
    - Empty states
    - Error states (banners, inline messages, toasts)
  - Keep interactions predictable and minimal; avoid modal overload.
- Accessibility:
  - Semantic HTML first.
  - Proper labels and roles for interactive elements.
  - Visible focus states and keyboard support.
  - Avoid color-only status indicators; include icons/text as needed.

---

## 6. State Management & Data Fetching

- Follow existing patterns:
  - React hooks and contexts
  - Any query library already in use (e.g., React Query) rather than introducing new ones without discussion.
- Data fetching:
  - Co-locate in hooks or data modules rather than directly in components.
  - Keep components focused on rendering, not side-effects.

Memoize derived state appropriately to avoid re-render storms.

---

## 7. Testing (Frontend)

- Add or update tests for any non-trivial UI change:
  - Component/unit tests for rendering and behavior.
  - Integration/e2e tests for key flows, if supported by the project tooling.
- Use existing test frameworks and conventions (React Testing Library, Cypress/Playwright, etc.).
- Ensure tests cover:
  - Rendering of primary components
  - Core interactions (e.g., clicking primary buttons, filling forms)
  - Important variations (themes or states) where feasible

Do not reduce coverage or delete tests unless explicitly requested.

---

## 8. Interaction Scope

- Do not modify backend logic from frontend files.
- Do not create new CSS frameworks or parallel design systems.
- When a requested UI change is truly global (e.g., button style change), prefer:
  - Updating the shared primitive(s)
  - Updating relevant theme tokens
  - Avoiding per-page overrides

Always align with the design and theming rules defined in:

- `design/ui-standards.md`
- `design/themes.md`
- `global/copilot-instructions.md`
