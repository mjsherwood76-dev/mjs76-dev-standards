# AI Agent Handbook

This folder documents how AI teammates should collaborate inside the **mjs76** ecosystem. Each specialized agent lives under `agents/*.agent.md`; this file explains how they fit together so instructions stay consistent across projects.

## Available Agents

| Agent | File | Purpose |
| --- | --- | --- |
| Planning | `agents/planning.agent.md` | Analyze the repo, confirm constraints, and produce a safe, minimal implementation/testing plan. |
| Implementation | `agents/implementation.agent.md` | Execute the approved plan with surgical file edits, respecting stack standards and the design system. |
| Testing | `agents/testing.agent.md` | Run/verifiy automated tests or equivalent validation steps before handoff. |

## Global Expectations

- Always ingest `global/copilot-instructions.md` plus stack-specific docs (`backend/backend.instructions.md`, `frontend/frontend.instructions.md`, `design/ui-standards.md`, `design/themes.md`).
- Default to the canonical stack: Cloudflare backend (TypeScript) + Next.js/React/TypeScript/Tailwind frontend with shadcn/ui primitives.
- Share logic via utilities; do not fork the design system or theme tokens per project.
- Treat this repo as the source of truth. If a downstream project diverges, update the standards here first, then mirror to the project.

## Workflow Overview

1. **Planning agent** scopes the request, lists affected files, and outlines implementation + testing steps.
2. **Implementation agent** follows the plan, updating only the files listed unless blockers or new insights emerge. They must keep token-based styling intact and update shared components where appropriate.
3. **Testing agent** executes the Testing Plan, reports pass/fail status, and flags any regressions or missing coverage.

Escalate uncertainties (missing instructions, conflicting requirements) back to the user rather than guessing.

## Adding New Agents

When introducing another agent (e.g., docs, migrations):

1. Create a new `agents/<role>.agent.md` modeled after the existing files.
2. Update the table above with the role description.
3. Reference the new agent inside any relevant handoffs so automation remains discoverable.

Keeping this handbook current ensures every AI contributor enforces the same architectural and design constraints across projects.
