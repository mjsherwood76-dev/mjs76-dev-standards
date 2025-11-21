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
  - A **multi-theme system** with **17 visual themes**:
    - Aurora (Modern SaaS), Zen (Minimalist), Terracotta (Earthy), Neon (Cyber-noir), Opulence (Luxury)
    - Soft Pastel, Comic, Summit, Velocity, Valor
    - Vogue, Vitality, Sterling, Syntax, Nexus
    - Ember, Prism
- Testing requirements
- AI agent behavior (planning, implementation, testing) and global Copilot instructions

Every new project must reference this repo at creation time and follow these standards unless an explicit, documented exception is made.

---

## Quick Start for AI Agents

**👉 Start here:** [`.github/copilot-instructions.md`](.github/copilot-instructions.md)

This is the single entry point for all AI agents. It provides:
- Core principles and quick navigation
- Links to detailed stack guides (Next.js, Cloudflare)
- Theme system overview
- Agent workflow guidance

**Don't read everything at once** - use the navigation to find what you need.

---

## Repository Structure

New consolidated structure:

```text
mjs76-dev-standards/
  README.md

  .github/
    copilot-instructions.md       # 🎯 SINGLE ENTRY POINT for AI agents
    copilot/
      stack-guides/               # Detailed tech stack documentation
        nextjs.md                 # Frontend guide
        backend-workers.md        # Backend guide
      agent-workflows/            # Multi-step task workflows
        WORKFLOWS.md              # Planning → Implementation → Testing
      theme-system/               # Design system details
        theme-profiles.md         # All 17 theme profiles
      git-guidelines.md           # Git best practices

  backend/
    backend.instructions.md       # DEPRECATED - see .github/copilot/stack-guides/

  frontend/
    frontend.instructions.md      # DEPRECATED - see .github/copilot/stack-guides/

  design/
    ui-standards.md      # canonical UI + theming spec (tokens, components)
    themes.md            # narrative guide for each visual style

  global/
    copilot-instructions.md
