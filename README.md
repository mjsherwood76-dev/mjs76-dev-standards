# mjs76 Development Standards

This repository is the **single source of truth** for all engineering and design standards used across Michael’s projects.

It defines:

- Architecture and coding conventions for:
  - **Cloudflare backend** (Workers/Pages/D1/KV/R2/Queues)
  - **Node/TypeScript** services
  - **Next.js + React + TypeScript** frontend
- A **centralized design system**:
  - Tailwind-based tokens
  - Shared UI components (shadcn/ui on top of Radix)
  - A **multi-theme system** with 5 visual styles:
    - `default` (Modern)
    - `minimalist`
    - `earthy`
    - `cyber-noir`
    - `luxury`
- Testing requirements
- AI agent behavior (planning, implementation, testing) and global Copilot instructions

Every new project must reference this repo at creation time and follow these standards unless an explicit, documented exception is made.

---

## Repository Structure

Current structure (simplified):

```text
mjs76-dev-standards/
  README.md

  .github/
    instructions/         # reserved for CI/tooling guidance (currently empty)

  agents/
    planning.agent.md
    implementation.agent.md
    testing.agent.md

  ai/
    AGENTS.md

  backend/
    backend.instructions.md

  frontend/
    frontend.instructions.md

  design/
    ui-standards.md      # canonical UI + theming spec (tokens, components)
    themes.md            # narrative guide for each visual style

  global/
    copilot-instructions.md
