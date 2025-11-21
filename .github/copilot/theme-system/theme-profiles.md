# Theme Profiles

Complete profiles for all 18 visual themes in the mjs76 design system.

---

## Overview

Each theme provides:
- **Complete token set**: All CSS variables for colors, typography, spacing, motion
- **Light & dark variants**: Full support for both modes
- **Design personality**: Mood, use cases, and behavior guidelines
- **Typography system**: Font stacks for sans, heading, and monospace
- **Spatial & motion cues**: Control heights, gaps, animation timings, icon styles

All themes target the same component set and Tailwind token wiring, so projects can swap styles without changing component code.

---

## Shared Principles

- All themes use shadcn/ui primitives and Tailwind token wiring
- Light/dark variants maintain WCAG AA contrast ratios
- Typography follows consistent size scale (see `design/ui-standards.md`)
- Spacing, motion, and iconography are token-driven
- Update theme tokens, not component code, for visual changes

---

## Theme Profiles

### 1. Aurora (Default)

**Mood**: Modern SaaS, balanced saturation, friendly gradients

**Primary Use**: Baseline experience for dashboards, internal tools, and most B2B apps

**Typography**:
- Sans: Inter
- Heading: Cal Sans/Poppins
- Mono: IBM Plex Mono

**Visual Behavior**:
- Plenty of white space
- Rounded corners
- Subtle shadows
- Clean, professional aesthetic

**Spatial & Motion**:
- Control height: `2.75rem`
- Section gap: `3rem`
- Motion: `cubic-bezier(0.4,0,0.2,1)` for familiar SaaS pacing
- Icons: 1.75px strokes with 4px corners

**When to Choose**: Unless a brief explicitly requires another mood, start here.

---

### 2. Zen (Minimalist)

**Mood**: Monochrome-heavy, typography-first, calm

**Primary Use**: Content-focused sites, documentation, productivity tools

**Typography**:
- Sans: Source Sans 3
- Heading: Space Grotesk
- Mono: IBM Plex/Input Mono

**Visual Behavior**:
- Thin borders
- Low accent usage
- Ghost buttons favored
- Lightweight iconography
- Strict 4px grid alignment

**Spatial & Motion**:
- Control height: `2.5rem`
- Section gap: `2.5rem`
- Motion: `cubic-bezier(0.33,1,0.68,1)` with slower decays
- Icons: 1.5px strokes with 2px corners (understated)

**When to Choose**: Content-heavy applications, documentation sites, focus-oriented tools

---

### 3. Terracotta (Earthy)

**Mood**: Warm, organic, tactile

**Primary Use**: Marketing, lifestyle, sustainability, coaching experiences

**Typography**:
- Sans: Public Sans
- Heading: Source Serif 4
- Mono: IBM Plex/DM Mono

**Visual Behavior**:
- Emphasized card surfaces with soft shadows
- Accent color for CTAs
- Muted backgrounds paired with imagery
- Avoid high-gloss gradients

**Spatial & Motion**:
- Control height: `2.85rem`
- Section gap: `3.5rem`
- Motion: `cubic-bezier(0.25,0.1,0.25,1)` for grounded transitions
- Icons: 1.85px strokes with 6px corners (handcrafted feel)

**When to Choose**: Wellness, sustainability, lifestyle brands, coaching platforms

---

### 4. Neon (Cyber-Noir)

**Mood**: High-contrast, sci-fi neon, dark glass

**Primary Use**: Developer tooling, media sites, futuristic campaigns

**Typography**:
- Sans: Space Grotesk
- Heading: Orbitron
- Mono: JetBrains Mono/Fira Code

**Visual Behavior**:
- Glowing focus rings
- Accent-colored outlines
- Blurred backdrops
- Snappy animations (<200ms)
- Accent strokes for separators

**Spatial & Motion**:
- Control height: `2.6rem`
- Section gap: `2.75rem`
- Motion: Ultra-fast (90/160/240ms) with `cubic-bezier(0.83,0,0.17,1)`
- Icons: Razor-thin 2px strokes with 0px corners

**When to Choose**: Developer tools, tech showcases, cyberpunk aesthetics, media platforms

---

### 5. Opulence (Luxury)

**Mood**: Premium, editorial, jewel tones with metallic accents

**Primary Use**: Concierge services, premium memberships, boutique e-commerce

**Typography**:
- Sans: Manrope
- Heading: Cormorant Garamond
- Mono: IBM Plex/Nimbus Mono

**Visual Behavior**:
- Generous spacing
- Fine borders
- Layered cards
- Accent gold used sparingly for emphasis
- Deep plum backgrounds for contrast

**Spatial & Motion**:
- Control height: `3rem`
- Section gap: `3.75rem`
- Motion: 140/260/420ms with `cubic-bezier(0.19,1,0.22,1)`
- Icons: 1.4px strokes with 10px rounded corners (ornamented)

**When to Choose**: Luxury retail, premium services, high-end memberships, boutique experiences

---

### 6. Soft Pastel

**Mood**: Gentle, approachable, dreamy pastels

**Primary Use**: Creative portfolios, wellness apps, children's content

**Typography**:
- Sans: Inter-based system fonts
- Softer font weights
- Friendly, approachable feel

**Visual Behavior**:
- Soft shadows
- Generous spacing
- Rounded corners
- Pastel color palette
- Low contrast for comfort

**Spatial & Motion**:
- Control height: `2.75rem`
- Section gap: `3rem`
- Motion: Standard timings with gentle easing curves
- Icons: Medium weight for approachability

**When to Choose**: Creative portfolios, wellness apps, children's education, calm interfaces

---

### 7. Comic

**Mood**: Playful, energetic, bold illustrations

**Primary Use**: Gaming, entertainment, youth-focused applications

**Typography**:
- Display fonts with character
- Bold headings
- Comic-style typography

**Visual Behavior**:
- High contrast
- Vibrant colors
- Comic-style borders
- Bold visual elements
- Energetic feel

**Spatial & Motion**:
- Control height: `2.75rem`
- Section gap: `3rem`
- Motion: Snappy animations with bold visual feedback
- Icons: Bold, expressive strokes

**When to Choose**: Gaming platforms, entertainment apps, youth markets, playful brands

---

### 8. Summit (Outdoor/Adventure)

**Mood**: Nature-inspired, adventurous, outdoor rugged

**Primary Use**: Outdoor brands, fitness, adventure travel

**Typography**:
- Strong, bold fonts
- Outdoor aesthetic
- Robust letterforms

**Visual Behavior**:
- Earthy tones
- Textured elements
- Organic shapes
- Natural materials feel
- Rugged aesthetic

**Spatial & Motion**:
- Control height: `2.85rem`
- Section gap: `3.25rem`
- Motion: Robust controls with natural curves
- Icons: Strong, clear strokes

**When to Choose**: Outdoor gear, adventure travel, fitness apps, nature-focused brands

---

### 9. Velocity (Action Sports)

**Mood**: High-energy, dynamic, athletic

**Primary Use**: Sports apps, fitness tracking, active lifestyle brands

**Typography**:
- Angular, dynamic fonts
- Suggests motion and speed
- Athletic aesthetic

**Visual Behavior**:
- Sharp angles
- Energetic colors
- Motion-forward design
- Dynamic elements
- Athletic feel

**Spatial & Motion**:
- Control height: `2.75rem`
- Section gap: `2.75rem`
- Motion: Fast transitions with responsive feedback
- Icons: Angular, dynamic strokes

**When to Choose**: Sports apps, fitness tracking, athletic brands, high-energy experiences

---

### 10. Valor (Combat/Military)

**Mood**: Tactical, serious, disciplined

**Primary Use**: Strategy games, military applications, security software

**Typography**:
- Strong, authoritative fonts
- Military precision
- Disciplined aesthetic

**Visual Behavior**:
- Structured grids
- Tactical color schemes
- Clear hierarchies
- Precision elements
- Serious tone

**Spatial & Motion**:
- Control height: `2.5rem`
- Section gap: `2.5rem`
- Motion: Precise, controlled animations
- Icons: Clean, tactical design

**When to Choose**: Strategy games, military simulations, security software, tactical applications

---

### 11. Vogue (Fashion)

**Mood**: Elegant, sophisticated, editorial fashion

**Primary Use**: Fashion e-commerce, luxury retail, style blogs

**Typography**:
- High-fashion editorial fonts
- Elegant serifs
- Sophisticated letterforms

**Visual Behavior**:
- Clean lines
- Elegant spacing
- Sophisticated color palettes
- Editorial layout
- Refined aesthetic

**Spatial & Motion**:
- Control height: `2.85rem`
- Section gap: `3.5rem`
- Motion: Smooth, refined transitions with editorial pacing
- Icons: Elegant, refined strokes

**When to Choose**: Fashion e-commerce, luxury retail, style magazines, high-end brands

---

### 12. Vitality (Healthcare)

**Mood**: Clean, trustworthy, professional healthcare aesthetic

**Primary Use**: Healthcare applications, medical dashboards, wellness platforms

**Typography**:
- Inter-based fonts throughout
- Maximum readability
- Professional feel

**Visual Behavior**:
- Rounded 0.75rem corners
- Soft blue shadows
- Professional spacing
- Clean, clinical aesthetic
- Trustworthy design

**Spatial & Motion**:
- Control height: `2.75rem`
- Section gap: `3rem`
- Motion: Fast 150-350ms motion
- Icons: 2px strokes, accessible design patterns

**When to Choose**: Healthcare apps, medical dashboards, wellness platforms, health tech

---

### 13. Sterling (Finance)

**Mood**: Conservative, formal, traditional financial aesthetic

**Primary Use**: Banking applications, financial dashboards, investment platforms

**Typography**:
- Crimson Pro serif headings
- Inter body text
- Authority and readability

**Visual Behavior**:
- Minimal 0.125rem radius
- Subtle shadows
- Conservative spacing
- Traditional financial design
- Formal aesthetic

**Spatial & Motion**:
- Control height: `2.5rem`
- Section gap: `2.75rem`
- Motion: Fast 120-300ms motion
- Icons: 1.5px strokes, 600 font weight buttons for confidence

**When to Choose**: Banking apps, financial services, investment platforms, fintech

---

### 14. Syntax (Developer/Tech)

**Mood**: Terminal-like, information-dense, developer-focused aesthetic

**Primary Use**: Developer tools, code editors, technical documentation, API dashboards

**Typography**:
- JetBrains Mono for ALL text
- Cohesive monospace aesthetic
- Terminal-inspired

**Visual Behavior**:
- Sharp 0.25rem corners
- Hard borders with dual shadows
- Dense spacing
- Terminal aesthetic
- Information-dense layouts

**Spatial & Motion**:
- Control height: `2.25rem` (compact)
- Section gap: `2.5rem`
- Motion: Snappy 100-250ms motion
- Icons: 1.5px strokes, terminal-inspired design

**When to Choose**: Developer tools, code editors, technical docs, API platforms

---

### 15. Nexus (Gaming)

**Mood**: Aggressive, bold, high-energy gaming aesthetic

**Primary Use**: Gaming platforms, esports applications, competitive gaming dashboards

**Typography**:
- Rajdhani headings (system fonts for body text)
- Futuristic display fonts
- Dramatic impact

**Visual Behavior**:
- Angular 0.125rem cuts
- Dramatic purple glow shadows
- 2px borders
- Gaming aesthetic
- High-energy design

**Spatial & Motion**:
- Control height: `2.875rem` (substantial)
- Section gap: `3rem`
- Motion: Snappy 80-280ms motion
- Icons: 2.5px thick strokes, 700 font weight for boldness

**When to Choose**: Gaming platforms, esports, competitive gaming, gaming communities

---

### 16. Ember (Culinary/Food)

**Mood**: Warm, inviting, friendly culinary aesthetic

**Primary Use**: Restaurant applications, recipe platforms, food delivery services

**Typography**:
- Quicksand/Nunito
- Friendly rounded fonts
- Approachable feel

**Visual Behavior**:
- Very rounded 1.25rem corners
- 1.5rem pill-shaped buttons
- Warm orange-tinted layered shadows
- Inviting aesthetic
- Culinary warmth

**Spatial & Motion**:
- Control height: `3rem` (easy interaction)
- Section gap: `3.5rem`
- Motion: Bouncy 200-500ms spring easing `cubic-bezier(0.34, 1.56, 0.64, 1)`
- Icons: Friendly, rounded design

**When to Choose**: Restaurant apps, recipe sites, food delivery, culinary platforms

---

### 17. Prism (Creative Agency)

**Mood**: Bold, dramatic, creative agency aesthetic with experimental design

**Primary Use**: Creative agencies, design portfolios, innovative digital products

**Typography**:
- Montserrat/Poppins
- Geometric fonts
- Modern boldness

**Visual Behavior**:
- Dramatic 1.5rem card radius
- 2rem pill-shaped buttons
- Multi-layer purple shadows
- Experimental design
- Bold visual statements

**Spatial & Motion**:
- Control height: `3rem` (prominent)
- Section gap: `3.75rem` (expansive 2.5rem gaps)
- Motion: Dramatic 150-600ms elastic easing `cubic-bezier(0.68, -0.55, 0.265, 1.55)`
- Icons: Bold, creative design

**When to Choose**: Creative agencies, design portfolios, innovative products, artistic brands

---

## Using Themes

### Setting a Theme

```tsx
// Set theme via data attribute
document.documentElement.setAttribute('data-theme', 'neon')

// Set color mode
document.documentElement.classList.add('dark')
```

### Theme Switching Component

```tsx
import { useState } from 'react'

const themes = [
  'aurora', 'zen', 'terracotta', 'neon', 'opulence',
  'soft-pastel', 'comic', 'summit', 'velocity', 'valor',
  'vogue', 'vitality', 'sterling', 'syntax', 'nexus',
  'ember', 'prism', 'verdant'
]

function ThemeSwitcher() {
  const [theme, setTheme] = useState('aurora')
  
  const changeTheme = (newTheme: string) => {
    document.documentElement.setAttribute('data-theme', newTheme)
    setTheme(newTheme)
  }
  
  return (
    <select value={theme} onChange={(e) => changeTheme(e.target.value)}>
      {themes.map(t => (
        <option key={t} value={t}>{t}</option>
      ))}
    </select>
  )
}
```

---

## Updating Themes

When updating a theme:

1. **Change CSS variables** in `design/ui-standards.md` for both light and dark variants
2. **Update this file** with narrative changes (color story, typography, usage notes)
3. **Test across modes** - verify light/dark both work
4. **Check accessibility** - maintain WCAG AA contrast ratios
5. **Document changes** in commit messages

---

## Theme Selection Guide

### By Industry

- **SaaS/B2B**: Aurora, Zen, Syntax
- **Healthcare**: Vitality
- **Finance**: Sterling
- **Gaming**: Nexus, Valor
- **Food/Culinary**: Ember
- **Fashion**: Vogue, Opulence
- **Outdoor/Fitness**: Summit, Velocity
- **Creative**: Prism, Soft Pastel
- **Entertainment**: Comic
- **Developer Tools**: Syntax, Neon

### By Aesthetic

- **Minimal**: Zen, Sterling
- **Bold**: Nexus, Prism, Comic
- **Elegant**: Opulence, Vogue
- **Warm**: Terracotta, Ember
- **Cool**: Neon, Syntax
- **Natural**: Summit, Terracotta, Verdant
- **Professional**: Aurora, Vitality, Sterling

### By User Experience

- **Content-Heavy**: Zen, Syntax
- **Visual-Heavy**: Prism, Vogue, Comic
- **Data-Dense**: Syntax, Sterling, Aurora
- **Interactive**: Nexus, Velocity, Comic
- **Calm**: Zen, Soft Pastel, Vitality, Verdant
- **Energetic**: Velocity, Nexus, Comic

---

## Additional Resources

- [Design System Standards](../../../design/ui-standards.md)
- [Theme Implementation Guide](../../../design/themes.md)
- [Accessibility Guidelines](../../../design/accessibility.md)
- [Frontend Guide](../stack-guides/nextjs.md)
