# AI Instructions: Icon Library Usage

## Overview
When starting new projects or adding icons to existing projects, follow these guidelines for selecting and implementing icon libraries based on the design theme.

---

## Default Icon Library Selection

### Primary Recommendation: **Lucide React**
For most projects, use Lucide as the default choice:

```bash
npm install lucide-react
```

**Reasons:**
- MIT licensed (completely free)
- Tree-shakeable (only imports icons you use)
- Consistent 24px grid
- TypeScript support
- React components
- ~1,400+ icons

**Usage:**
```tsx
import { Search, Heart, Settings, Mail, File } from 'lucide-react';

export function MyComponent() {
  return (
    <button>
      <Search className="w-5 h-5" strokeWidth={1.75} />
      Search
    </button>
  );
}
```

---

## Theme-Specific Icon Library Instructions

### When Theme is: **Aurora / Default / Modern**
**Library:** Lucide or Heroicons
```bash
npm install lucide-react
# OR
npm install @heroicons/react
```

**Configuration:**
```tsx
import { Search } from 'lucide-react';
<Search strokeWidth={1.75} className="w-5 h-5" />
```

**CSS Variables:**
```css
--icon-stroke: 1.75px;
--icon-corner: 4px;
```

---

### When Theme is: **Zen / Minimalist**
**Library:** Feather Icons or Phosphor (Thin weight)
```bash
npm install react-icons
```

**Usage:**
```tsx
import { FiSearch } from 'react-icons/fi'; // Feather
<FiSearch className="w-5 h-5" strokeWidth={1} />
```

**CSS Variables:**
```css
--icon-stroke: 1px;
--icon-corner: 2px;
```

---

### When Theme is: **Terracotta / Earthy / Organic**
**Library:** Ionicons or Remix Icon (rounded)
```bash
npm install react-icons
```

**Usage:**
```tsx
import { IoSearchOutline } from 'react-icons/io5'; // Ionicons
import { RiSearchLine } from 'react-icons/ri'; // Remix
<IoSearchOutline className="w-6 h-6" />
```

**CSS Variables:**
```css
--icon-stroke: 2px;
--icon-corner: 6px;
```

---

### When Theme is: **Neon / Cyber / Retro-Tech**
**Library:** Bootstrap Icons or Custom Pixel Icons
```bash
npm install react-icons
```

**Usage:**
```tsx
import { BsSearch } from 'react-icons/bs'; // Bootstrap
<BsSearch className="w-6 h-6" style={{ imageRendering: 'pixelated' }} />
```

**Or use ASCII/Unicode:**
```tsx
<span className="icon-pixel">⌕</span>
<span className="icon-pixel">■</span>
<span className="icon-pixel">▶</span>
```

**CSS Variables:**
```css
--icon-stroke: 2.5px;
--icon-corner: 0px;
image-rendering: pixelated;
```

---

### When Theme is: **Opulence / Luxury / Premium**
**Library:** Font Awesome (Solid) or Material Symbols (Filled)
```bash
npm install @fortawesome/react-fontawesome @fortawesome/free-solid-svg-icons
```

**Usage:**
```tsx
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

<FontAwesomeIcon icon={faSearch} className="w-6 h-6" />
```

**CSS Variables:**
```css
--icon-stroke: 2.25px;
--icon-corner: 8px;
```

---

### When Theme is: **Soft Pastel / Playful / Friendly**
**Library:** Phosphor (Regular) or Iconoir
```bash
npm install @phosphor-icons/react
```

**Usage:**
```tsx
import { MagnifyingGlass } from '@phosphor-icons/react';
<MagnifyingGlass size={24} weight="regular" />
```

**CSS Variables:**
```css
--icon-stroke: 1.75px;
--icon-corner: 12px;
```

---

### When Theme is: **Comic / Bold / Cartoon**
**Library:** Font Awesome (Solid) with custom styling
```bash
npm install @fortawesome/react-fontawesome @fortawesome/free-solid-svg-icons
```

**Usage:**
```tsx
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

<FontAwesomeIcon 
  icon={faSearch} 
  className="w-7 h-7"
  style={{
    filter: 'drop-shadow(3px 3px 0 #000)',
    WebkitTextStroke: '2px black'
  }}
/>
```

**CSS Variables:**
```css
--icon-stroke: 3px;
--icon-corner: 4px;
font-weight: 900;
```

---

## Universal Icon Component Pattern

Create a reusable icon wrapper that adapts to theme:

```tsx
// components/Icon.tsx
import { LucideIcon } from 'lucide-react';
import { useTheme } from './ThemeProvider';

interface IconProps {
  icon: LucideIcon;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const sizeMap = {
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6',
  xl: 'w-8 h-8',
};

export function Icon({ icon: IconComponent, size = 'md', className = '' }: IconProps) {
  const { theme } = useTheme();
  
  // Get theme-specific stroke width
  const strokeWidth = {
    default: 1.75,
    minimalist: 1,
    earthy: 2,
    'cyber-noir': 2.5,
    luxury: 2.25,
    'soft-pastel': 1.75,
    comic: 3,
  }[theme] || 1.75;

  return (
    <IconComponent 
      className={`${sizeMap[size]} ${className}`}
      strokeWidth={strokeWidth}
    />
  );
}
```

**Usage:**
```tsx
import { Search } from 'lucide-react';
import { Icon } from './components/Icon';

<Icon icon={Search} size="md" />
```

---

## Installation Commands by Library

### Lucide (Recommended Default)
```bash
npm install lucide-react
```

### Heroicons
```bash
npm install @heroicons/react
```

### React Icons (All-in-One)
```bash
npm install react-icons
```
Includes: Feather, Ionicons, Bootstrap, Remix, Font Awesome, Material, and more

### Font Awesome
```bash
npm install @fortawesome/react-fontawesome @fortawesome/free-solid-svg-icons
```

### Phosphor
```bash
npm install @phosphor-icons/react
```

### Material Symbols
```bash
npm install @mui/icons-material @mui/material @emotion/react @emotion/styled
```

---

## AI Prompt Template

When asking AI to add icons to a project, use this template:

```
Add icons to this component using [LIBRARY NAME] based on the [THEME NAME] theme.

Requirements:
- Use stroke-width: [X]px
- Icon size: [SIZE]
- Style: [outlined/filled/rounded]
- Ensure icons match theme aesthetic

Example:
"Add search, filter, and settings icons using Lucide React for the Aurora theme. Use 1.75px stroke width and 20px size."
```

---

## Icon Size Guidelines

| Context | Size Class | Pixels | Use Case |
|---------|-----------|--------|----------|
| Small | `w-4 h-4` | 16px | Inline text, dense UI |
| Medium | `w-5 h-5` | 20px | Buttons, form inputs |
| Large | `w-6 h-6` | 24px | Card headers, nav items |
| XL | `w-8 h-8` | 32px | Hero sections, empty states |

---

## Color Guidelines

Always use theme tokens for icon colors:

```tsx
// Primary accent color
<Search className="text-accent" />

// Muted/secondary
<Search className="text-muted-foreground" />

// Destructive/error
<Search className="text-destructive" />

// Success
<Search className="text-success" />

// With CSS
.icon {
  color: hsl(var(--accent));
}
```

---

## Accessibility Requirements

1. **Icon-only buttons MUST have aria-label:**
```tsx
<button aria-label="Search">
  <Search className="w-5 h-5" />
</button>
```

2. **Decorative icons MUST have aria-hidden:**
```tsx
<div>
  <Mail aria-hidden="true" className="w-5 h-5" />
  <span>Email</span>
</div>
```

3. **Interactive icons need proper ARIA:**
```tsx
<button 
  aria-label="Close dialog"
  aria-pressed={isOpen}
>
  <X className="w-5 h-5" />
</button>
```

---

## Performance Best Practices

1. **Tree-shake imports:**
```tsx
// ✅ Good - only imports Search
import { Search } from 'lucide-react';

// ❌ Bad - imports entire library
import * as Icons from 'lucide-react';
```

2. **Use React Icons for multiple libraries:**
```tsx
// Single package, tree-shakeable
import { FiSearch } from 'react-icons/fi'; // Feather
import { HiSearch } from 'react-icons/hi'; // Heroicons
```

3. **Lazy load icon sets:**
```tsx
const IconSet = lazy(() => import('./icons/IconSet'));
```

---

## Quick Reference: Library Comparison

| Library | License | Size | Icons | Tree-Shake | TypeScript | Best For |
|---------|---------|------|-------|------------|------------|----------|
| Lucide | MIT | Small | 1,400+ | ✅ | ✅ | Modern, clean |
| Heroicons | MIT | Small | 300+ | ✅ | ✅ | Minimalist |
| React Icons | MIT | Medium | 50,000+ | ✅ | ✅ | Multiple styles |
| Font Awesome | MIT/Pro | Large | 2,000+ free | ✅ | ✅ | Bold, iconic |
| Phosphor | MIT | Medium | 7,000+ | ✅ | ✅ | Playful, varied |
| Material | Apache 2.0 | Large | 2,000+ | ✅ | ✅ | Google aesthetic |

---

## Example: Complete Implementation

```tsx
// Icon configuration
import { 
  Search, 
  Heart, 
  Settings, 
  Mail, 
  File,
  ChevronDown 
} from 'lucide-react';

export function IconDemo() {
  return (
    <div className="flex gap-4 items-center">
      {/* Button with icon */}
      <button className="flex items-center gap-2">
        <Search strokeWidth={1.75} className="w-5 h-5" />
        Search
      </button>

      {/* Icon-only button */}
      <button aria-label="Favorite">
        <Heart strokeWidth={1.75} className="w-5 h-5 text-destructive" />
      </button>

      {/* Decorative icon */}
      <div className="flex items-center gap-2">
        <Mail aria-hidden="true" strokeWidth={1.75} className="w-5 h-5 text-muted-foreground" />
        <span>contact@example.com</span>
      </div>
    </div>
  );
}
```

---

## Summary for AI

When adding icons to a project:
1. Check the theme from design system
2. Select appropriate library from table above
3. Install with npm/pnpm/yarn
4. Import specific icons (tree-shake)
5. Apply theme-specific stroke-width
6. Use theme color tokens
7. Add proper ARIA labels
8. Test in all theme modes (light/dark)
