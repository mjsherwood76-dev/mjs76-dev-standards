# GitHub Copilot Instructions

**Entry Point for AI Agents** - Start here for all project work.

---

## Quick Start

1. **Choose your path:**
   - 🚀 New project? See [Stack Guides](#stack-guides) for templates
   - 🎨 Working with themes? See [Theme System](#theme-system)  
   - 🔄 Multi-step task? See [Agent Workflows](#agent-workflows)
   - 📋 General development? Read [Core Principles](#core-principles) below

2. **Read relevant deep-dive docs** only when needed (see links below)

---

## Core Principles

### Stack & Infrastructure
- **TypeScript everywhere** - backend and frontend; avoid plain JavaScript unless explicitly required
- **Backend:** Cloudflare (Workers/Pages/D1/KV/R2/Queues)
- **Frontend:** Next.js (App Router) + React + TypeScript + Tailwind CSS + shadcn/ui
- **Prefer:** Functional, composable code and small, focused modules

### Architecture
- **Understand first** - Read existing code and database structure before editing
- **Minimal changes** - Touch only files required for the specific change
- **Isolated responsibilities** - Each function/module/component does one clear job
- **Share logic** - Use utilities/services instead of copy-pasting
- **Do not refactor** unrelated areas unless explicitly requested

### Git & Version Control
**CRITICAL:** Never commit:
- `node_modules/` directories
- Build outputs (`.next/`, `dist/`, `build/`, `out/`)
- Lock files from unused package managers
- Environment files (`.env*`)
- IDE/OS files (`.vscode/`, `.DS_Store`, etc.)

Always check `.gitignore` before committing. See [detailed git rules](./.copilot/git-guidelines.md).

### Secrets & Configuration
- **Never hardcode** secrets, API keys, tokens, or passwords
- Use Cloudflare secrets/environment variables via central config modules
- Centralize permissions in dedicated modules (e.g., `/config`)
- Document environment variables when adding integrations

### Design System & Theming
- **Token-based styling** - Use semantic Tailwind classes (`bg-background`, `text-primary`, etc.)
- **18 themes available** - All UI must work across themes and light/dark modes
- **Shared components** - Use `@/components/ui` primitives; don't create ad-hoc styles
- **Responsive** - All UI must work on mobile and desktop
- **Accessible** - Semantic HTML, labels, keyboard navigation, visible focus states

For detailed design rules → [Design System Docs](../design/ui-standards.md)  
For theme details → [Theme System](#theme-system) below

### Testing & Quality
- **Add tests** for any non-trivial change
- **Test types:** Unit tests for logic, integration tests for APIs, e2e tests for critical flows
- **Coverage:** Happy path + edge cases + error handling
- **Don't reduce coverage** unless explicitly requested

### Comments & Documentation
- Comment non-obvious logic; avoid redundant comments
- Update docs for new APIs/modules in `/docs`
- Keep AI instructions in `.github/copilot/` (not in source directories)

---

## Stack Guides

**When to use:** Starting a new project, need stack-specific patterns

Detailed instructions for each stack:
- [Next.js Frontend Guide](./.copilot/stack-guides/nextjs.md)
- [Cloudflare Backend Guide](./.copilot/stack-guides/backend-workers.md)

---

## Theme System

**When to use:** Working with UI, visual changes, theme implementation

### Overview
- **18 visual themes** with full light/dark mode support
- **Implementation:** `data-theme` attribute on `<html>` controls theme, `class="dark"` controls mode
- **Tokens:** All themes provide same CSS variables (`--background`, `--primary`, `--radius-lg`, etc.)

### Available Themes
Aurora, Zen, Terracotta, Neon, Opulence, Soft Pastel, Comic, Summit, Velocity, Valor, Vogue, Vitality, Sterling, Syntax, Nexus, Ember, Prism, Verdant, Verdant

### Key Rules
- ✅ Use semantic Tailwind classes (`bg-primary`, `text-foreground`)
- ✅ Modify theme tokens in `styles/themes/*.css`, not component code
- ❌ Never hardcode colors, radii, or fonts in components
- ❌ Don't create one-off button/card styles; extend shared components

**Detailed theme documentation:**
- [Complete theme profiles](./.copilot/theme-system/theme-profiles.md)
- [Theme implementation guide](../design/themes.md)
- [Design standards](../design/ui-standards.md)

---

## Agent Workflows

**When to use:** Complex multi-step tasks requiring planning, implementation, and testing

AI agents should work in this sequence:

1. **Planning Phase** - Analyze, scope, create plan
2. **Implementation Phase** - Execute plan with minimal changes
3. **Testing Phase** - Verify with automated tests

See detailed workflow instructions → [Agent Workflows Guide](./.copilot/agent-workflows/WORKFLOWS.md)

---

## File Lifecycle

- **Do not delete files** unless explicitly told to
- **Mark deprecated files** with `z_deprecated_` prefix + comment explaining why/when
- **Unused code** sorts to bottom for later cleanup

---

## AI Behavior

- **Assume autonomy** - Act without asking unless ambiguity could break data/security/UX
- **Conflict resolution** - If requested change conflicts with these rules, highlight conflict and propose safer alternative
- **Minimal scope** - Only touch files needed for the specific change
- **Keep standards current** - This repo is source of truth; update here first, then mirror to projects

---

## Additional Resources

- [Design System](../design/ui-standards.md)
- [Accessibility Guidelines](../design/accessibility.md)
- [Component Library](../components/README.md)
- [Testing Documentation](../testing/README.md)
- [Contributing Guide](../CONTRIBUTING.md)
- [Changelog](../CHANGELOG.md)
