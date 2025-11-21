# Backend Instructions (API / Server)

Scope: All backend code in this folder (Cloudflare / Node / TypeScript).

---

## 1. Stack & Structure

- Use **TypeScript only**; no plain JavaScript.
- Target **Cloudflare runtime** (Workers/Pages/D1/KV/R2/Queues) using existing helpers and patterns.
- Maintain a clear separation between:
  - **Route/handler layer** – HTTP routing, input parsing, response formatting.
  - **Service layer** – business logic, domain rules.
  - **Data access layer** – DB/ORM or raw queries via existing utilities.
  - **Shared utilities** – pure helpers and cross-cutting logic.

Route handlers should be thin; services and data layers should be reusable and testable.

---

## 2. Architecture & Isolation

- When changing a feature:
  - Identify the minimum set of handlers, services, and data modules that need editing.
  - Do not touch unrelated services or data models unless absolutely necessary.
- Keep side effects localized:
  - Services should be **as pure as possible**; push I/O to boundaries.
- Data access:
  - Use existing DB helpers, models, and query abstractions.
  - Avoid inlining SQL or duplicating query logic where patterns exist.

If you need a new abstraction (e.g., repository or service), design it to fit the existing architecture.

---

## 3. Validation, Errors, and Logging

- Validation:
  - Use existing schema/validator utilities for all external input (HTTP params, body, headers).
  - Fail fast on invalid input with consistent error shapes.
- Errors:
  - Use centralized error-handling patterns; don’t invent new error formats.
  - Prefer custom error types or tagged error objects defined in shared modules.
- Logging:
  - Use existing logging utilities.
  - Do **not** introduce raw `console.log` in production paths.
  - Never log secrets, passwords, tokens, or sensitive PII.

---

## 4. Config, Secrets, and Permissions

- All config and secrets must come from:
  - Cloudflare environment bindings
  - Central config modules
- Do not introduce new ways to read env vars:
  - Extend existing config modules instead.
- For new integrations:
  - Add keys/IDs to central config.
  - Respect and reuse existing permission/role checks.
  - Document expected environment variables and roles.

---

## 5. Performance & Reliability

- Avoid:
  - N+1 queries
  - Redundant API calls
  - Unbounded loops or unpaginated heavy queries
- Prefer:
  - Batching and pagination for large data sets
  - Idempotent behavior for background jobs and retries
- For long-running tasks:
  - Use existing background processing patterns (Queues, scheduled Workers, etc.).
  - Be explicit about timeouts and retries where infrastructure allows.

---

## 6. Testing (Backend)

- When behavior changes:
  - Add/update **unit tests** for services and utilities.
  - Add/update **integration tests** for handlers and DB interactions, if applicable.
- Test placement:
  - Use existing backend test locations (e.g., `tests/backend`, `__tests__`, or `*.test.ts` near the code).
  - Follow existing naming conventions.
- Coverage:
  - Happy path
  - Key edge cases
  - Error handling, including validation failures and external dependency failures

Do not reduce test coverage unless explicitly requested.

---

## 7. Interaction Scope

- Do **not** modify frontend behavior from backend files.
- Do **not** change CI/CD, environment configuration, or secrets wiring from backend code unless explicitly requested.
- If a requirement conflicts with:
  - Security rules
  - Secrets handling
  - Architectural boundaries

  then note the conflict clearly and propose a safer alternative.

Backend must remain stable, predictable, and aligned with the standards defined in:

- `global/copilot-instructions.md`
- `design/ui-standards.md` (for API contracts that support frontend UX)
