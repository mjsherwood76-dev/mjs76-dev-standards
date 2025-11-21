# Icon Guidelines by Theme

This document provides icon library recommendations and styling guidelines for each theme in the demo app.

## Theme-Specific Icon Recommendations

### 1. **Aurora (Default Theme)**
**Recommended Libraries:**
- [Lucide](https://lucide.dev/) - Clean, minimal, consistent stroke width
- [Heroicons](https://heroicons.com/) - Modern, outlined style
- [Tabler Icons](https://tabler.io/icons) - Crisp, professional

**Icon Style:**
- Stroke width: `1.75px`
- Corner radius: `4px`
- Size: `20-24px`
- Style: Outlined, clean lines
- Example classes: `lucide-search`, `lucide-file`, `lucide-heart`

**CSS Custom Properties:**
```css
--icon-stroke: 1.75px;
--icon-corner: 4px;
--icon-style: 'outlined';
```

---

### 2. **Zen (Minimalist Theme)**
**Recommended Libraries:**
- [Feather Icons](https://feathericons.com/) - Ultra minimal, thin strokes
- [Phosphor Icons](https://phosphoricons.com/) - Light weight variant
- [Lucide](https://lucide.dev/) - Thin variant

**Icon Style:**
- Stroke width: `1px` (ultra thin)
- Corner radius: `2px` (minimal)
- Size: `18-22px` (understated)
- Style: Thin outlined, maximum simplicity
- Example: Use the lightest/thinnest variants available

**CSS Custom Properties:**
```css
--icon-stroke: 1px;
--icon-corner: 2px;
--icon-style: 'thin';
```

---

### 3. **Terracotta (Earthy Theme)**
**Recommended Libraries:**
- [Ionicons](https://ionic.io/ionicons) - Rounded, friendly
- [Font Awesome](https://fontawesome.com/) - Regular style
- [Remix Icon](https://remixicon.com/) - Rounded variants

**Icon Style:**
- Stroke width: `2px`
- Corner radius: `6px` (soft, rounded)
- Size: `22-26px`
- Style: Rounded, organic feel
- Prefer filled variants for primary actions

**CSS Custom Properties:**
```css
--icon-stroke: 2px;
--icon-corner: 6px;
--icon-style: 'rounded';
```

---

### 4. **Neon / Cyber-Noir (Retro-Tech Theme)**
**Recommended Libraries:**
- [Material Design Icons](https://pictogrammers.com/library/mdi/) - Sharp, geometric
- [Bootstrap Icons](https://icons.getbootstrap.com/) - Square variants
- Custom pixel art icons (8x8, 16x16, 32x32)

**Icon Style:**
- Stroke width: `2.5px` (bold, chunky)
- Corner radius: `0px` (perfectly square)
- Size: `24px` or `32px` (pixel-perfect multiples of 8)
- Style: Sharp angles, no curves, pixelated aesthetic
- Use monochrome with terminal green (#00ff00) or cyan (#00ffff)

**CSS Custom Properties:**
```css
--icon-stroke: 2.5px;
--icon-corner: 0px;
--icon-style: 'pixelated';
```

**Special Considerations:**
- Use `image-rendering: pixelated;` for pixel art
- Prefer grid-based, monospace icon layouts
- Consider ASCII art alternatives (▶, ■, ◆, ●)

---

### 5. **Opulence (Luxury Theme)**
**Recommended Libraries:**
- [Font Awesome](https://fontawesome.com/) - Solid style (premium feel)
- [Material Symbols](https://fonts.google.com/icons) - Filled variants
- [Remix Icon](https://remixicon.com/) - Fill style

**Icon Style:**
- Stroke width: `2.25px` (substantial)
- Corner radius: `8px` (elegant curves)
- Size: `24-28px` (generous sizing)
- Style: Filled/solid, ornate where appropriate
- Use subtle gradients or metallic effects

**CSS Custom Properties:**
```css
--icon-stroke: 2.25px;
--icon-corner: 8px;
--icon-style: 'filled';
```

**Special Considerations:**
- Add subtle shadows or glow effects
- Use gold/metallic colors from theme palette
- Consider adding shine/gradient overlays

---

### 6. **Soft Pastel (Playful Theme)**
**Recommended Libraries:**
- [Phosphor Icons](https://phosphoricons.com/) - Rounded, friendly
- [Iconoir](https://iconoir.com/) - Soft, modern
- [Eva Icons](https://akveo.github.io/eva-icons/) - Rounded variants

**Icon Style:**
- Stroke width: `1.75px`
- Corner radius: `12px` (extra rounded)
- Size: `22-26px`
- Style: Soft rounded, friendly curves
- Prefer duotone or subtle color fills

**CSS Custom Properties:**
```css
--icon-stroke: 1.75px;
--icon-corner: 12px;
--icon-style: 'soft-rounded';
```

**Special Considerations:**
- Use pastel color fills from theme
- Add subtle drop shadows
- Consider animated hover states (bounce, wiggle)

---

### 7. **Comic (Bold Theme)**
**Recommended Libraries:**
- [Font Awesome](https://fontawesome.com/) - Solid style
- Custom SVG with thick strokes
- [Material Icons](https://fonts.google.com/icons) - Filled variants

**Icon Style:**
- Stroke width: `3px` (extra bold)
- Corner radius: `4px`
- Size: `26-32px` (large, impactful)
- Style: Bold, thick outlines with offset shadows
- Add black stroke outlines (comic book effect)

**CSS Custom Properties:**
```css
--icon-stroke: 3px;
--icon-corner: 4px;
--icon-style: 'bold-comic';
```

**Special Considerations:**
- Add `text-shadow: 2px 2px 0 #000` for comic effect
- Use primary colors (red, blue, yellow)
- Add offset shadows (3px 3px 0 #000)
- Consider speech bubble containers

---

## Implementation Guide

### Using CSS Custom Properties

Each theme defines icon-specific variables that components can reference:

```css
.icon {
  stroke-width: var(--icon-stroke);
  border-radius: var(--icon-corner);
}
```

### Icon Color Mapping

All icons should use theme tokens for colors:

```css
.icon-primary {
  color: hsl(var(--accent));
}

.icon-secondary {
  color: hsl(var(--muted-foreground));
}

.icon-destructive {
  color: hsl(var(--destructive));
}
```

### Size Classes

Standard icon size classes:

```css
.icon-sm { width: 16px; height: 16px; }
.icon-md { width: 20px; height: 20px; }
.icon-lg { width: 24px; height: 24px; }
.icon-xl { width: 32px; height: 32px; }
```

### Accessibility

- Always provide `aria-label` for icon-only buttons
- Use `aria-hidden="true"` for decorative icons
- Ensure sufficient color contrast (WCAG AA: 4.5:1 minimum)

---

## Installation Examples

### Lucide React
```bash
npm install lucide-react
```

```tsx
import { Search, Heart, Settings } from 'lucide-react';

<Search className="icon-md" strokeWidth={var(--icon-stroke)} />
```

### Heroicons
```bash
npm install @heroicons/react
```

```tsx
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

<MagnifyingGlassIcon className="icon-md" />
```

### React Icons (All-in-one)
```bash
npm install react-icons
```

```tsx
import { FiSearch } from 'react-icons/fi'; // Feather
import { HiOutlineSearch } from 'react-icons/hi'; // Heroicons
import { TbSearch } from 'react-icons/tb'; // Tabler
```

---

## Theme-Icon Pairings Summary

| Theme | Primary Library | Style | Stroke | Radius |
|-------|----------------|-------|--------|--------|
| Aurora | Lucide | Outlined | 1.75px | 4px |
| Zen | Feather | Thin | 1px | 2px |
| Terracotta | Ionicons | Rounded | 2px | 6px |
| Neon | Bootstrap/Custom | Pixelated | 2.5px | 0px |
| Opulence | Font Awesome | Filled | 2.25px | 8px |
| Soft Pastel | Phosphor | Soft-Rounded | 1.75px | 12px |
| Comic | Font Awesome | Bold | 3px | 4px |
