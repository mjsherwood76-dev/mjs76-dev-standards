# **Michaels Development Standards**

This repository is the **single source of truth** for all engineering standards used across Jonathan’s projects.
It defines the architecture, coding conventions, design system principles, testing requirements, and AI agent behavior for every project built with:

* **Cloudflare infrastructure** (Workers, Pages, D1, KV, R2, Queues)
* **TypeScript** across backend and frontend
* **Node/Cloudflare Workers backend**
* **React + Tailwind CSS frontend**
* **Fluent UI–inspired UX**
* **AI-assisted development with GitHub Copilot agents**

Every new project references this repository for consistent, reliable, scalable development—while allowing each project to override or extend rules where necessary.

---

## **Purpose of this Repository**

This repo provides:

### 1. **Global Development Standards**

Clear, high-signal rules that guide architecture, coding style, secrets handling, accessibility, responsiveness, testing, and deployment.

### 2. **Agent Instructions**

Custom agent definitions for:

* **Planning Agent**
* **Implementation Agent**
* **Testing Agent**

These ensure Copilot agents behave consistently across all projects and always follow the global standards.

### 3. **Project Templates and Patterns**

Standard folder structures, recommended file naming, and conventions for backend, frontend, shared utilities, and testing.

### 4. **Design System Philosophy**

Guidelines for:

* Centralized styling
* Tailwind configuration and design tokens
* Shared UI components
* Light/dark theming
* Fluent UI alignment
* Minimalist, accessible interfaces

### 5. **Versioned Evolution Over Time**

Standards evolve. Each version is tracked so older projects remain stable and newer ones can upgrade intentionally.

---

## **Repository Structure**

```
jonathan-dev-standards/
  global/
    global-instructions.md

  agents/
    planning.agent.md
    implementation.agent.md
    testing.agent.md

  backend/
    backend.instructions.md

  frontend/
    frontend.instructions.md

  design/
    design-system.md

  ai/
    AGENTS.md

  CHANGELOG.md
  README.md
```

Each section contains concise, composable rules designed for direct use by Copilot agents.

---

## **How Projects Use These Standards**

### **1. Global Copilot Instructions (VS Code)**

Paste the global standards into VS Code’s Copilot “Custom Instructions” panel to enforce architecture and coding preferences across *all* projects.

### **2. Copy Minimal Local Instruction Files into Each Repo**

Every new project includes:

```
.github/copilot-instructions.md         # References global standards
backend.instructions.md                 # Scoped backend rules
frontend.instructions.md                # Scoped frontend rules
docs/ai/ (agent files)                  # Planner / Implementer / Tester agents
```

These reference the master repo so projects remain small and maintainable.

### **3. Version Pinning**

Each project chooses a version:

```
This project follows Jonathan Development Standards v1.0  
Reference: https://github.com/<your-org>/jonathan-dev-standards/tree/v1.0
```

Older projects stay stable.
New projects adopt improved versions.

---

## **How to Evolve the Standards**

1. Modify files in this repo (global rules, agent definitions, backend/frontend rules, design philosophy, testing guidelines).
2. Commit changes with version tags (`v1.1`, `v1.2`, `v2.0`, etc.).
3. Update the `CHANGELOG.md`.
4. New projects automatically start with the latest version.
5. Existing projects update only if you choose to adopt the new version.

This gives you long-term stability with rapid improvement when desired.

---

## **AI Agent Workflow Overview**

### **Planning Agent**

* Analyzes the code
* Reads relevant files
* Produces a minimal, safe implementation plan
* Defines testing strategy

### **Implementation Agent**

* Implements changes with minimal scope
* Obeys architecture rules
* Uses shared design system components
* Updates docs
* Marks deprecated files

### **Testing Agent**

* Writes or updates tests
* Ensures coverage
* Checks mobile/desktop behavior
* Validates correctness
* Hands off to implementation if behavior is wrong

This tri-agent pattern dramatically reduces breakages, inconsistent coding, and refactors that touch too much code.

---

## **Design Principles**

All projects must follow:

* **Centralized design system**
  No one-off component styling unless explicitly needed.

* **Tailwind design tokens**
  Colors, spacing, typography, and themes come from shared configuration.

* **Fluent UI principles**
  Clear hierarchy, spacing, focus states, motion, and interaction patterns.

* **Accessibility**
  Semantic HTML, proper labeling, keyboard navigation, visible focus, WCAG-conscious UI.

* **Responsive by default**
  Mobile-first layouts with desktop scaling.

* **Light/Dark Themes**
  Driven by a single theme system, not duplicated styles.

---

## **Technical Principles**

* **Function isolation**
  Code should be easy to modify in one place without unintended side effects.

* **Clear separation of concerns**
  Route handlers, services, DB/data access, utilities, and shared components have defined roles.

* **No secrets in code**
  All credentials come from Cloudflare/environment secrets.

* **Test everything that matters**
  Unit, integration, and (when available) UI/e2e tests for critical flows.

* **Minimal-scope changes**
  Never modify unrelated files unless explicitly requested.

---

## **Recommended Project Template Repo**

For quickest project startup, use a project template that includes:

* Pre-configured Cloudflare Worker backend
* React + Tailwind frontend
* Shared UI folder
* Testing framework
* Scoped instruction files
* Agent files
* Route handlers + utilities structure
* Environment/secrets setup

This keeps every project consistent from day one.

---

## **License**

Your choice — MIT is recommended for open standards, but you can also use private licensing for internal org use.

---

## **Conclusion**

This repository is the foundation of Michael’s entire engineering workflow.
It ensures:

* Higher-quality code
* Faster development
* Consistent user experience
* Stronger architecture
* Minimal breakage
* Reliable agent-assisted development

Used correctly, it becomes the backbone of every project you start going forward.

Just say the word.
