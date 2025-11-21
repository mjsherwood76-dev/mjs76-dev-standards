# Theme Narratives & Usage

This document adds narrative guidance to the token tables in `design/ui-standards.md`. Every theme must stay in sync with the CSS variables defined there so projects can swap styles without changing component code.

## Shared Principles

- All themes target the same component set (shadcn/ui primitives) and Tailwind token wiring.
- Light/dark variants must ship together and maintain WCAG AA contrast ratios.
- Typography stacks can vary per theme, but follow the size scale in `ui-standards.md`.
- When a feature needs a new visual treatment, adjust these theme specs and the matching CSS tokens rather than hardcoding styles in components.
- Spacing, motion, and iconography are also token-driven (`--control-height`, `--section-gap`, `--motion-duration-*`, `--icon-*`). Update those tokens before considering component-level overrides.

## Theme Profiles

### 1. Default (“Aurora”)

- **Mood**: Modern SaaS, balanced saturation, friendly gradients.
- **Primary use**: Baseline experience for dashboards, internal tools, and most B2B apps.
- **Typography**: `--font-sans = Inter`, `--font-heading = Cal Sans/Poppins`, `--font-mono = IBM Plex Mono`.
- **Behavior**: Plenty of white space, rounded corners, subtle shadows.
- **Spatial & motion cues**: `--control-height = 2.75rem`, `--section-gap = 3rem`, motion eases `cubic-bezier(0.4,0,0.2,1)` for familiar SaaS pacing; icons use 1.75px strokes with 4px corners.
- **When to choose**: Unless a brief explicitly requires another mood, start here.

### 2. Minimalist (“Zen”)

- **Mood**: Monochrome-heavy, typography-first, calm.
- **Primary use**: Content-focused sites, documentation, productivity tools.
- **Typography**: `--font-sans = Source Sans 3`, `--font-heading = Space Grotesk`, `--font-mono = IBM Plex/Input Mono`.
- **Behavior**: Thin borders, low accent usage, ghost buttons favored.
- **Notes**: Keep iconography lightweight and align sections to a strict 4px grid.
- **Spatial & motion cues**: `--control-height = 2.5rem`, `--section-gap = 2.5rem`, motion eases `cubic-bezier(0.33,1,0.68,1)` with slower decays; icons sit at 1.5px strokes and 2px corners to stay understated.

### 3. Earthy (“Terracotta”)

- **Mood**: Warm, organic, tactile.
- **Primary use**: Marketing, lifestyle, sustainability, or coaching experiences.
- **Typography**: `--font-sans = Public Sans`, `--font-heading = Source Serif 4`, `--font-mono = IBM Plex/DM Mono`.
- **Behavior**: Emphasize card surfaces with soft shadows; lean on accent color for CTAs.
- **Notes**: Pair imagery with muted backgrounds; avoid high-gloss gradients.
- **Spatial & motion cues**: `--control-height = 2.85rem`, `--section-gap = 3.5rem`, motion eases `cubic-bezier(0.25,0.1,0.25,1)` for grounded transitions; icons use 1.85px strokes with 6px corners to echo handcrafted edges.

### 4. Cyber-Noir (“Neon”)

- **Mood**: High-contrast, sci-fi neon, dark glass.
- **Primary use**: Developer tooling, media sites, or campaigns needing futuristic energy.
- **Typography**: `--font-sans = Space Grotesk`, `--font-heading = Orbitron`, `--font-mono = JetBrains Mono/Fira Code`.
- **Behavior**: Use glowing focus rings, accent-colored outlines, and blurred backdrops.
- **Notes**: Keep animations snappy (<200 ms) and leverage accent strokes for separators.
- **Spatial & motion cues**: `--control-height = 2.6rem`, `--section-gap = 2.75rem`, ultra-fast motion (90/160/240 ms) with `cubic-bezier(0.83,0,0.17,1)`; icons are razor-thin at 2px stroke with 0px corners.

### 5. Luxury (“Opulence”)

- **Mood**: Premium, editorial, jewel tones with metallic accents.
- **Primary use**: Concierge services, premium memberships, boutique e-commerce.
- **Typography**: `--font-sans = Manrope`, `--font-heading = Cormorant Garamond`, `--font-mono = IBM Plex/Nimbus Mono`.
- **Behavior**: Favor generous spacing, fine borders, and layered cards.
- **Notes**: Use accent gold sparingly for emphasis; rely on deep plum backgrounds for contrast.
- **Spatial & motion cues**: `--control-height = 3rem`, `--section-gap = 3.75rem`, motion 140/260/420 ms with `cubic-bezier(0.19,1,0.22,1)` and icons set to 1.4px strokes plus 10px rounded corners for ornamented finishes.

## Updating a Theme

1. Change the CSS variables for both light and dark variants in `design/ui-standards.md`.
2. Mirror those changes here (color story, typography, usage notes) so downstream teams understand intent.
3. Notify agents via commit notes or `global/copilot-instructions.md` if behavior expectations shift (e.g., new density mode default).

Keeping narrative guidance and token definitions in sync prevents drift when agents scaffold new projects or update shared primitives.
