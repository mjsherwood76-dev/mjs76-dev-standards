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

### 5. Luxury ("Opulence")

- **Mood**: Premium, editorial, jewel tones with metallic accents.
- **Primary use**: Concierge services, premium memberships, boutique e-commerce.
- **Typography**: `--font-sans = Manrope`, `--font-heading = Cormorant Garamond`, `--font-mono = IBM Plex/Nimbus Mono`.
- **Behavior**: Favor generous spacing, fine borders, and layered cards.
- **Notes**: Use accent gold sparingly for emphasis; rely on deep plum backgrounds for contrast.
- **Spatial & motion cues**: `--control-height = 3rem`, `--section-gap = 3.75rem`, motion 140/260/420 ms with `cubic-bezier(0.19,1,0.22,1)` and icons set to 1.4px strokes plus 10px rounded corners for ornamented finishes.

### 6. Soft Pastel

- **Mood**: Gentle, approachable, dreamy pastels.
- **Primary use**: Creative portfolios, wellness apps, children's content.
- **Typography**: Standard Inter-based system fonts with softer weights.
- **Behavior**: Soft shadows, generous spacing, rounded corners.
- **Spatial & motion cues**: Standard motion timings with gentle easing curves.

### 7. Comic

- **Mood**: Playful, energetic, bold illustrations.
- **Primary use**: Gaming, entertainment, youth-focused applications.
- **Typography**: Display fonts with character, bold headings.
- **Behavior**: High contrast, vibrant colors, comic-style borders.
- **Spatial & motion cues**: Snappy animations, bold visual feedback.

### 8. Summit (Outdoor/Adventure)

- **Mood**: Nature-inspired, adventurous, outdoor rugged.
- **Primary use**: Outdoor brands, fitness, adventure travel.
- **Typography**: Strong, bold fonts with outdoor aesthetic.
- **Behavior**: Earthy tones, textured elements, organic shapes.
- **Spatial & motion cues**: Robust controls, natural motion curves.

### 9. Velocity (Action Sports)

- **Mood**: High-energy, dynamic, athletic.
- **Primary use**: Sports apps, fitness tracking, active lifestyle brands.
- **Typography**: Angular, dynamic fonts suggesting motion.
- **Behavior**: Sharp angles, energetic colors, motion-forward design.
- **Spatial & motion cues**: Fast transitions, responsive feedback.

### 10. Valor (Combat/Military)

- **Mood**: Tactical, serious, disciplined.
- **Primary use**: Strategy games, military applications, security software.
- **Typography**: Strong, authoritative fonts with military precision.
- **Behavior**: Structured grids, tactical color schemes, clear hierarchies.
- **Spatial & motion cues**: Precise, controlled animations.

### 11. Vogue (Fashion)

- **Mood**: Elegant, sophisticated, editorial fashion.
- **Primary use**: Fashion e-commerce, luxury retail, style blogs.
- **Typography**: High-fashion editorial fonts, elegant serifs.
- **Behavior**: Clean lines, elegant spacing, sophisticated color palettes.
- **Spatial & motion cues**: Smooth, refined transitions with editorial pacing.

### 12. Vitality (Healthcare)

- **Mood**: Clean, trustworthy, professional healthcare aesthetic.
- **Primary use**: Healthcare applications, medical dashboards, wellness platforms.
- **Typography**: Inter-based fonts throughout for maximum readability.
- **Behavior**: Rounded 0.75rem corners, soft blue shadows, professional spacing.
- **Spatial & motion cues**: `--control-height = 2.75rem`, fast 150-350ms motion, 2px icon strokes, accessible design patterns.

### 13. Sterling (Finance)

- **Mood**: Conservative, formal, traditional financial aesthetic.
- **Primary use**: Banking applications, financial dashboards, investment platforms.
- **Typography**: Crimson Pro serif headings with Inter body for authority and readability.
- **Behavior**: Minimal 0.125rem radius, subtle shadows, conservative spacing.
- **Spatial & motion cues**: `--control-height = 2.5rem`, fast 120-300ms motion, 1.5px icon strokes, 600 font weight buttons for confidence.

### 14. Syntax (Developer/Tech)

- **Mood**: Terminal-like, information-dense, developer-focused aesthetic.
- **Primary use**: Developer tools, code editors, technical documentation, API dashboards.
- **Typography**: JetBrains Mono for ALL text (sans, heading, mono) creating cohesive monospace aesthetic.
- **Behavior**: Sharp 0.25rem corners, hard borders with dual shadows, dense spacing.
- **Spatial & motion cues**: `--control-height = 2.25rem` (compact), snappy 100-250ms motion, 1.5px icon strokes, terminal-inspired design.

### 15. Nexus (Gaming)

- **Mood**: Aggressive, bold, high-energy gaming aesthetic.
- **Primary use**: Gaming platforms, esports applications, competitive gaming dashboards.
- **Typography**: Rajdhani/Orbitron futuristic display fonts for dramatic impact.
- **Behavior**: Angular 0.125rem cuts, dramatic purple glow shadows with 2px borders.
- **Spatial & motion cues**: `--control-height = 2.875rem` (substantial), snappy 80-280ms motion, 2.5px thick icon strokes, 700 font weight for boldness.

### 16. Ember (Culinary/Food)

- **Mood**: Warm, inviting, friendly culinary aesthetic.
- **Primary use**: Restaurant applications, recipe platforms, food delivery services.
- **Typography**: Quicksand/Nunito friendly rounded fonts for approachability.
- **Behavior**: Very rounded 1.25rem corners, 1.5rem pill-shaped buttons, warm orange-tinted layered shadows.
- **Spatial & motion cues**: `--control-height = 3rem` (easy interaction), bouncy 200-500ms spring easing `cubic-bezier(0.34, 1.56, 0.64, 1)`.

### 17. Prism (Creative Agency)

- **Mood**: Bold, dramatic, creative agency aesthetic with experimental design.
- **Primary use**: Creative agencies, design portfolios, innovative digital products.
- **Typography**: Montserrat/Poppins geometric fonts for modern boldness.
- **Behavior**: Dramatic 1.5rem card radius, 2rem pill-shaped buttons, multi-layer purple shadows.
- **Spatial & motion cues**: `--control-height = 3rem` (prominent), dramatic 150-600ms elastic easing `cubic-bezier(0.68, -0.55, 0.265, 1.55)`, expansive 2.5rem gaps.

### 18. Verdant (Pacific Northwest)

- **Mood**: Deep forest green, natural, Pacific Northwest wilderness aesthetic.
- **Primary use**: Environmental organizations, outdoor brands, conservation platforms, nature-focused content.
- **Typography**: `--font-sans = Inter`, `--font-heading = Merriweather`, `--font-mono = IBM Plex Mono`.
- **Behavior**: Organic 1rem corners, earthy shadows with green tint, natural textures.
- **Spatial & motion cues**: `--control-height = 2.75rem` (comfortable), `--section-gap = 3rem`, natural easing 180-420ms `cubic-bezier(0.25, 0.46, 0.45, 0.94)`, icons 1.75px strokes with 5px organic corners.
- **When to choose**: For environmental platforms, Pacific Northwest brands, conservation projects, nature photography sites, outdoor recreation apps, sustainability initiatives.

## Updating a Theme

1. Change the CSS variables for both light and dark variants in `design/ui-standards.md`.
2. Mirror those changes here (color story, typography, usage notes) so downstream teams understand intent.
3. Notify agents via commit notes or `global/copilot-instructions.md` if behavior expectations shift (e.g., new density mode default).

Keeping narrative guidance and token definitions in sync prevents drift when agents scaffold new projects or update shared primitives.
