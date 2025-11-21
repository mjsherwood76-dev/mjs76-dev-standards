# UI & Theming Standards

This document defines the **canonical UI stack**, **design system**, and **multi-theme setup** for all of Michael’s projects.

All frontend work must comply with these standards unless a documented exception is made.

---

## 1. Canonical Frontend Stack

All web UIs must use:

- **Next.js (App Router)** + React function components
- **TypeScript** for all components, hooks, and utilities
- **Tailwind CSS** for styling
- **shadcn/ui** (Radix-based) for UI primitives under `@/components/ui`
- **next-themes** for light/dark color modes
- A **multi-style theme system** using `data-theme` on `<html>` for:
  - `default`
  - `minimalist`
  - `earthy`
  - `cyber-noir`
  - `luxury`

Any deviation from this stack must be explicitly justified and documented in the consuming project.

---

## 2. Design System: Tokens Over Ad-hoc Styles

All visual design is driven by **CSS variables** (tokens) that map into Tailwind’s theme.

### 2.1 Core Token Categories

Each theme must provide values for these tokens:

**Colors**

- `--background`
- `--foreground`
- `--primary`, `--primary-foreground`
- `--secondary`, `--secondary-foreground`
- `--muted`, `--muted-foreground`
- `--accent`, `--accent-foreground`
- `--border`
- `--destructive`, `--destructive-foreground`
- `--success`, `--success-foreground`
- `--warning`, `--warning-foreground`
- `--info`, `--info-foreground`

**Radius**

- `--radius-lg`
- `--radius-md`
- `--radius-sm`

**Typography**

- `--font-sans`
- (optional) `--font-heading`
- (optional) `--font-mono`

**Component-level tokens**

- `--button-radius`
- `--button-font-weight`
- `--card-radius`
- `--card-shadow`
- (optional) `--button-uppercase`

**Spatial rhythm**

- `--control-height`
- `--stack-gap`
- `--section-gap`

**Motion**

- `--motion-duration-fast`
- `--motion-duration-base`
- `--motion-duration-slow`
- `--motion-ease`
- `--motion-ease-emphasis`

**Iconography**

- `--icon-stroke`
- `--icon-corner`

Every theme must set these so buttons, cards, and other primitives can adopt different shapes, weights, and elevation profiles without editing component code.

Components **must not** hardcode visual constants. They should rely on these tokens via Tailwind classes and shared component styling.

---

## 3. Tailwind Configuration Pattern

All projects must use the same Tailwind configuration pattern:

```ts
// tailwind.config.ts
import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        success: {
          DEFAULT: "hsl(var(--success))",
          foreground: "hsl(var(--success-foreground))",
        },
        warning: {
          DEFAULT: "hsl(var(--warning))",
          foreground: "hsl(var(--warning-foreground))",
        },
        info: {
          DEFAULT: "hsl(var(--info))",
          foreground: "hsl(var(--info-foreground))",
        },
        border: "hsl(var(--border))",
      },
      borderRadius: {
        lg: "var(--radius-lg)",
        md: "var(--radius-md)",
        sm: "var(--radius-sm)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
---

## 4. Theme Families & Token Maps

All projects must ship the same five branded styles (`default`, `minimalist`, `earthy`, `cyber-noir`, `luxury`). Each style provides **light and dark** variants via `data-theme='<style>-<mode>'` on `<html>`. Tokens are expressed as `H S L` triples (without commas) so Tailwind can pick them up through `hsl(var(--token))`.

### 4.1 Usage Notes

- Define every token listed in Section 2.1 for each theme variant; do **not** skip complements like `--warning-foreground`, typography variables, or geometry tokens.
- Keep hue consistent between light/dark variants, only adjusting saturation/luminance for contrast.
- Place the snippets below into a shared stylesheet (for example `app/globals.css`) so agents can import the exact same contract.
- When a new style is needed, copy this structure, update this document, and publish the change before any downstream project consumes it.

#### 4.1.1 Default ('Aurora')

```css
:root[data-theme='default-light'] {
  --background: 210 20% 98%;
  --foreground: 222 47% 11%;
  --primary: 221 83% 53%;
  --primary-foreground: 0 0% 100%;
  --secondary: 217 33% 90%;
  --secondary-foreground: 222 47% 11%;
  --accent: 160 84% 39%;
  --accent-foreground: 0 0% 100%;
  --muted: 220 14% 96%;
  --muted-foreground: 221 15% 38%;
  --border: 218 15% 85%;
  --destructive: 0 84% 60%;
  --destructive-foreground: 0 0% 100%;
  --success: 142 72% 29%;
  --success-foreground: 140 43% 93%;
  --warning: 38 92% 50%;
  --warning-foreground: 40 100% 98%;
  --info: 201 96% 32%;
  --info-foreground: 199 89% 96%;
  --radius-lg: 1.25rem;
  --radius-md: 0.75rem;
  --radius-sm: 0.375rem;
  --button-radius: 0.75rem;
  --button-font-weight: 600;
  --card-radius: 1.25rem;
  --card-shadow: 0 25px 45px -20px rgba(15,23,42,0.25);
  --control-height: 2.75rem;
  --stack-gap: 1.25rem;
  --section-gap: 3rem;
  --motion-duration-fast: 120ms;
  --motion-duration-base: 200ms;
  --motion-duration-slow: 320ms;
  --motion-ease: cubic-bezier(0.4, 0, 0.2, 1);
  --motion-ease-emphasis: cubic-bezier(0.2, 0, 0, 1);
  --icon-stroke: 1.75px;
  --icon-corner: 4px;
  --font-sans: "Inter", "Source Sans 3", system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
  --font-heading: "Cal Sans", "Poppins", "Inter", system-ui, sans-serif;
  --font-mono: "IBM Plex Mono", "Fira Code", "JetBrains Mono", ui-monospace, SFMono-Regular, monospace;
}

:root[data-theme='default-dark'] {
  --background: 222 47% 11%;
  --foreground: 210 20% 98%;
  --primary: 217 91% 60%;
  --primary-foreground: 222 47% 11%;
  --secondary: 222 14% 25%;
  --secondary-foreground: 210 20% 98%;
  --accent: 160 84% 39%;
  --accent-foreground: 0 0% 0%;
  --muted: 222 14% 25%;
  --muted-foreground: 215 20% 80%;
  --border: 217 15% 35%;
  --destructive: 0 72% 51%;
  --destructive-foreground: 0 0% 100%;
  --success: 142 72% 45%;
  --success-foreground: 144 70% 96%;
  --warning: 38 92% 60%;
  --warning-foreground: 48 100% 92%;
  --info: 201 96% 45%;
  --info-foreground: 199 89% 96%;
  --radius-lg: 1.25rem;
  --radius-md: 0.75rem;
  --radius-sm: 0.375rem;
  --button-radius: 0.75rem;
  --button-font-weight: 600;
  --card-radius: 1.25rem;
  --card-shadow: 0 30px 55px -25px rgba(0,5,20,0.65);
  --control-height: 2.75rem;
  --stack-gap: 1.25rem;
  --section-gap: 3rem;
  --motion-duration-fast: 120ms;
  --motion-duration-base: 200ms;
  --motion-duration-slow: 320ms;
  --motion-ease: cubic-bezier(0.4, 0, 0.2, 1);
  --motion-ease-emphasis: cubic-bezier(0.2, 0, 0, 1);
  --icon-stroke: 1.75px;
  --icon-corner: 4px;
  --font-sans: "Inter", "Source Sans 3", system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
  --font-heading: "Cal Sans", "Poppins", "Inter", system-ui, sans-serif;
  --font-mono: "IBM Plex Mono", "Fira Code", "JetBrains Mono", ui-monospace, SFMono-Regular, monospace;
}
```

#### 4.1.2 Minimalist ('Zen')

```css
:root[data-theme='minimalist-light'] {
  --background: 0 0% 100%;
  --foreground: 210 10% 20%;
  --primary: 210 16% 24%;
  --primary-foreground: 0 0% 100%;
  --secondary: 210 10% 92%;
  --secondary-foreground: 210 10% 30%;
  --accent: 210 8% 25%;
  --accent-foreground: 0 0% 100%;
  --muted: 210 12% 96%;
  --muted-foreground: 210 8% 45%;
  --border: 210 7% 85%;
  --destructive: 0 65% 55%;
  --destructive-foreground: 0 0% 100%;
  --success: 150 15% 32%;
  --success-foreground: 0 0% 100%;
  --warning: 42 70% 50%;
  --warning-foreground: 35 100% 96%;
  --info: 210 60% 45%;
  --info-foreground: 210 40% 96%;
  --radius-lg: 0.75rem;
  --radius-md: 0.5rem;
  --radius-sm: 0.25rem;
  --button-radius: 0.35rem;
  --button-font-weight: 500;
  --card-radius: 0.5rem;
  --card-shadow: 0 18px 28px -24px rgba(15,23,42,0.35);
  --control-height: 2.5rem;
  --stack-gap: 1rem;
  --section-gap: 2.5rem;
  --motion-duration-fast: 160ms;
  --motion-duration-base: 240ms;
  --motion-duration-slow: 360ms;
  --motion-ease: cubic-bezier(0.33, 1, 0.68, 1);
  --motion-ease-emphasis: cubic-bezier(0.16, 1, 0.3, 1);
  --icon-stroke: 1.5px;
  --icon-corner: 2px;
  --font-sans: "Source Sans 3", "Inter", system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
  --font-heading: "Space Grotesk", "Clash Display", "Poppins", system-ui, sans-serif;
  --font-mono: "IBM Plex Mono", "Input Mono", ui-monospace, SFMono-Regular, monospace;
}

:root[data-theme='minimalist-dark'] {
  --background: 210 15% 10%;
  --foreground: 210 20% 92%;
  --primary: 210 15% 90%;
  --primary-foreground: 210 15% 15%;
  --secondary: 210 9% 18%;
  --secondary-foreground: 210 20% 92%;
  --accent: 210 5% 70%;
  --accent-foreground: 210 15% 15%;
  --muted: 210 8% 18%;
  --muted-foreground: 210 5% 65%;
  --border: 210 9% 35%;
  --destructive: 0 65% 60%;
  --destructive-foreground: 0 0% 100%;
  --success: 150 25% 60%;
  --success-foreground: 150 45% 15%;
  --warning: 42 80% 64%;
  --warning-foreground: 42 100% 12%;
  --info: 210 70% 72%;
  --info-foreground: 210 30% 12%;
  --radius-lg: 0.75rem;
  --radius-md: 0.5rem;
  --radius-sm: 0.25rem;
  --button-radius: 0.35rem;
  --button-font-weight: 500;
  --card-radius: 0.5rem;
  --card-shadow: 0 20px 38px -30px rgba(3,5,12,0.65);
  --control-height: 2.5rem;
  --stack-gap: 1rem;
  --section-gap: 2.5rem;
  --motion-duration-fast: 160ms;
  --motion-duration-base: 240ms;
  --motion-duration-slow: 360ms;
  --motion-ease: cubic-bezier(0.33, 1, 0.68, 1);
  --motion-ease-emphasis: cubic-bezier(0.16, 1, 0.3, 1);
  --icon-stroke: 1.5px;
  --icon-corner: 2px;
  --font-sans: "Source Sans 3", "Inter", system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
  --font-heading: "Space Grotesk", "Clash Display", "Poppins", system-ui, sans-serif;
  --font-mono: "IBM Plex Mono", "Input Mono", ui-monospace, SFMono-Regular, monospace;
}
```

#### 4.1.3 Earthy ('Terracotta')

```css
:root[data-theme='earthy-light'] {
  --background: 32 60% 96%;
  --foreground: 26 35% 18%;
  --primary: 145 25% 34%;
  --primary-foreground: 42 27% 95%;
  --secondary: 32 35% 86%;
  --secondary-foreground: 26 35% 25%;
  --accent: 14 70% 55%;
  --accent-foreground: 28 64% 96%;
  --muted: 35 30% 90%;
  --muted-foreground: 24 20% 35%;
  --border: 32 25% 80%;
  --destructive: 4 65% 48%;
  --destructive-foreground: 26 35% 96%;
  --success: 140 32% 36%;
  --success-foreground: 42 64% 95%;
  --warning: 36 78% 52%;
  --warning-foreground: 32 80% 96%;
  --info: 194 48% 46%;
  --info-foreground: 195 62% 92%;
  --radius-lg: 1.5rem;
  --radius-md: 1rem;
  --radius-sm: 0.5rem;
  --button-radius: 0.875rem;
  --button-font-weight: 600;
  --card-radius: 1.5rem;
  --card-shadow: 0 30px 50px -25px rgba(68,42,28,0.35);
  --control-height: 2.85rem;
  --stack-gap: 1.5rem;
  --section-gap: 3.5rem;
  --motion-duration-fast: 150ms;
  --motion-duration-base: 260ms;
  --motion-duration-slow: 380ms;
  --motion-ease: cubic-bezier(0.25, 0.1, 0.25, 1);
  --motion-ease-emphasis: cubic-bezier(0.05, 0.7, 0.1, 1);
  --icon-stroke: 1.85px;
  --icon-corner: 6px;
  --font-sans: "Public Sans", "Inter", system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
  --font-heading: "Source Serif 4", "Playfair Display", serif;
  --font-mono: "IBM Plex Mono", "DM Mono", ui-monospace, SFMono-Regular, monospace;
}

:root[data-theme='earthy-dark'] {
  --background: 24 35% 12%;
  --foreground: 35 65% 94%;
  --primary: 145 30% 45%;
  --primary-foreground: 42 64% 95%;
  --secondary: 24 28% 22%;
  --secondary-foreground: 35 65% 90%;
  --accent: 16 74% 60%;
  --accent-foreground: 26 35% 12%;
  --muted: 24 25% 20%;
  --muted-foreground: 32 25% 75%;
  --border: 24 23% 32%;
  --destructive: 4 65% 55%;
  --destructive-foreground: 26 35% 96%;
  --success: 140 36% 55%;
  --success-foreground: 140 25% 14%;
  --warning: 36 78% 58%;
  --warning-foreground: 34 90% 12%;
  --info: 194 54% 62%;
  --info-foreground: 194 54% 12%;
  --radius-lg: 1.5rem;
  --radius-md: 1rem;
  --radius-sm: 0.5rem;
  --button-radius: 0.875rem;
  --button-font-weight: 600;
  --card-radius: 1.5rem;
  --card-shadow: 0 32px 52px -24px rgba(30,15,8,0.65);
  --control-height: 2.85rem;
  --stack-gap: 1.5rem;
  --section-gap: 3.5rem;
  --motion-duration-fast: 150ms;
  --motion-duration-base: 260ms;
  --motion-duration-slow: 380ms;
  --motion-ease: cubic-bezier(0.25, 0.1, 0.25, 1);
  --motion-ease-emphasis: cubic-bezier(0.05, 0.7, 0.1, 1);
  --icon-stroke: 1.85px;
  --icon-corner: 6px;
  --font-sans: "Public Sans", "Inter", system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
  --font-heading: "Source Serif 4", "Playfair Display", serif;
  --font-mono: "IBM Plex Mono", "DM Mono", ui-monospace, SFMono-Regular, monospace;
}
```

#### 4.1.4 Cyber-Noir ('Neon')

```css
:root[data-theme='cyber-noir-light'] {
  --background: 220 60% 98%;
  --foreground: 248 50% 12%;
  --primary: 260 83% 56%;
  --primary-foreground: 0 0% 100%;
  --secondary: 230 29% 90%;
  --secondary-foreground: 248 50% 20%;
  --accent: 175 100% 40%;
  --accent-foreground: 0 0% 10%;
  --muted: 230 25% 93%;
  --muted-foreground: 248 30% 25%;
  --border: 235 28% 82%;
  --destructive: 347 87% 55%;
  --destructive-foreground: 0 0% 100%;
  --success: 160 84% 34%;
  --success-foreground: 168 78% 92%;
  --warning: 45 100% 55%;
  --warning-foreground: 48 100% 12%;
  --info: 200 100% 45%;
  --info-foreground: 200 100% 96%;
  --radius-lg: 1rem;
  --radius-md: 0.5rem;
  --radius-sm: 0.3rem;
  --button-radius: 999px;
  --button-font-weight: 600;
  --card-radius: 0.75rem;
  --card-shadow: 0 40px 65px -28px rgba(26,4,60,0.55);
  --control-height: 2.6rem;
  --stack-gap: 1.1rem;
  --section-gap: 2.75rem;
  --motion-duration-fast: 90ms;
  --motion-duration-base: 160ms;
  --motion-duration-slow: 240ms;
  --motion-ease: cubic-bezier(0.83, 0, 0.17, 1);
  --motion-ease-emphasis: cubic-bezier(0.68, -0.6, 0.32, 1.6);
  --icon-stroke: 2px;
  --icon-corner: 0px;
  --font-sans: "Space Grotesk", "Inter", system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
  --font-heading: "Orbitron", "Space Grotesk", "Poppins", system-ui, sans-serif;
  --font-mono: "JetBrains Mono", "Fira Code", ui-monospace, SFMono-Regular, monospace;
}

:root[data-theme='cyber-noir-dark'] {
  --background: 248 53% 12%;
  --foreground: 220 60% 94%;
  --primary: 284 86% 62%;
  --primary-foreground: 248 53% 12%;
  --secondary: 240 29% 20%;
  --secondary-foreground: 220 60% 90%;
  --accent: 175 100% 50%;
  --accent-foreground: 248 53% 12%;
  --muted: 248 30% 20%;
  --muted-foreground: 220 30% 80%;
  --border: 248 30% 32%;
  --destructive: 347 87% 60%;
  --destructive-foreground: 0 0% 100%;
  --success: 160 84% 48%;
  --success-foreground: 168 78% 10%;
  --warning: 45 100% 58%;
  --warning-foreground: 48 100% 12%;
  --info: 200 100% 62%;
  --info-foreground: 200 100% 10%;
  --radius-lg: 1rem;
  --radius-md: 0.5rem;
  --radius-sm: 0.3rem;
  --button-radius: 999px;
  --button-font-weight: 600;
  --card-radius: 0.75rem;
  --card-shadow: 0 45px 70px -30px rgba(2,0,12,0.75);
  --control-height: 2.6rem;
  --stack-gap: 1.1rem;
  --section-gap: 2.75rem;
  --motion-duration-fast: 90ms;
  --motion-duration-base: 160ms;
  --motion-duration-slow: 240ms;
  --motion-ease: cubic-bezier(0.83, 0, 0.17, 1);
  --motion-ease-emphasis: cubic-bezier(0.68, -0.6, 0.32, 1.6);
  --icon-stroke: 2px;
  --icon-corner: 0px;
  --font-sans: "Space Grotesk", "Inter", system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
  --font-heading: "Orbitron", "Space Grotesk", "Poppins", system-ui, sans-serif;
  --font-mono: "JetBrains Mono", "Fira Code", ui-monospace, SFMono-Regular, monospace;
}
```

#### 4.1.5 Luxury ('Opulence')

```css
:root[data-theme='luxury-light'] {
  --background: 40 33% 98%;
  --foreground: 277 28% 18%;
  --primary: 277 55% 32%;
  --primary-foreground: 43 100% 96%;
  --secondary: 43 64% 90%;
  --secondary-foreground: 277 28% 25%;
  --accent: 43 74% 55%;
  --accent-foreground: 277 28% 18%;
  --muted: 43 30% 92%;
  --muted-foreground: 277 20% 35%;
  --border: 43 30% 82%;
  --destructive: 355 65% 48%;
  --destructive-foreground: 43 100% 98%;
  --success: 151 30% 32%;
  --success-foreground: 43 100% 94%;
  --warning: 32 80% 50%;
  --warning-foreground: 43 100% 96%;
  --info: 210 70% 42%;
  --info-foreground: 43 100% 98%;
  --radius-lg: 1.25rem;
  --radius-md: 0.75rem;
  --radius-sm: 0.375rem;
  --button-radius: 999px;
  --button-font-weight: 600;
  --card-radius: 1rem;
  --card-shadow: 0 35px 55px -28px rgba(90,70,20,0.35);
  --control-height: 3rem;
  --stack-gap: 1.4rem;
  --section-gap: 3.75rem;
  --motion-duration-fast: 140ms;
  --motion-duration-base: 260ms;
  --motion-duration-slow: 420ms;
  --motion-ease: cubic-bezier(0.19, 1, 0.22, 1);
  --motion-ease-emphasis: cubic-bezier(0.22, 1, 0.36, 1);
  --icon-stroke: 1.4px;
  --icon-corner: 10px;
  --font-sans: "Manrope", "Inter", system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
  --font-heading: "Cormorant Garamond", "Playfair Display", serif;
  --font-mono: "IBM Plex Mono", "Nimbus Mono", ui-monospace, SFMono-Regular, monospace;
}

:root[data-theme='luxury-dark'] {
  --background: 277 28% 10%;
  --foreground: 43 100% 92%;
  --primary: 277 45% 55%;
  --primary-foreground: 277 28% 10%;
  --secondary: 277 28% 20%;
  --secondary-foreground: 43 100% 92%;
  --accent: 43 80% 55%;
  --accent-foreground: 277 28% 10%;
  --muted: 277 20% 18%;
  --muted-foreground: 43 64% 82%;
  --border: 277 22% 32%;
  --destructive: 355 65% 56%;
  --destructive-foreground: 0 0% 100%;
  --success: 151 32% 48%;
  --success-foreground: 43 100% 12%;
  --warning: 32 80% 58%;
  --warning-foreground: 43 100% 12%;
  --info: 210 70% 58%;
  --info-foreground: 210 70% 12%;
  --radius-lg: 1.75rem;
  --radius-md: 1rem;
  --radius-sm: 0.5rem;
  --button-radius: 999px;
  --button-font-weight: 600;
  --card-radius: 1.5rem;
  --card-shadow: 0 38px 65px -28px rgba(6,2,14,0.75);
  --control-height: 3rem;
  --stack-gap: 1.4rem;
  --section-gap: 3.75rem;
  --motion-duration-fast: 140ms;
  --motion-duration-base: 260ms;
  --motion-duration-slow: 420ms;
  --motion-ease: cubic-bezier(0.19, 1, 0.22, 1);
  --motion-ease-emphasis: cubic-bezier(0.22, 1, 0.36, 1);
  --icon-stroke: 1.4px;
  --icon-corner: 10px;
  --font-sans: "Manrope", "Inter", system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
  --font-heading: "Cormorant Garamond", "Playfair Display", serif;
  --font-mono: "IBM Plex Mono", "Nimbus Mono", ui-monospace, SFMono-Regular, monospace;
}
```

### 4.2 Typography Pairings by Theme

| Theme | `--font-sans` | `--font-heading` | `--font-mono` | Notes |
| --- | --- | --- | --- | --- |
| Default / Aurora | Inter · Source Sans 3 | Cal Sans · Poppins | IBM Plex Mono · Fira Code | Balanced SaaS typography with gentle curvature. |
| Minimalist / Zen | Source Sans 3 | Space Grotesk | IBM Plex Mono · Input Mono | Keeps interfaces calm and content-forward. |
| Earthy / Terracotta | Public Sans | Source Serif 4 | IBM Plex Mono · DM Mono | Blends organic warmth with editorial polish. |
| Cyber-Noir / Neon | Space Grotesk | Orbitron | JetBrains Mono · Fira Code | High-tech geometry that mirrors neon accents. |
| Luxury / Opulence | Manrope | Cormorant Garamond | IBM Plex Mono · Nimbus Mono | Premium editorial feel with precise body copy. |
| Verdant / Pacific Northwest | Inter | Merriweather | IBM Plex Mono · Fira Code | Natural editorial with forest-inspired warmth. |

### 4.3 Component Geometry & Elevation by Theme

| Theme | `--radius-lg / md / sm` | `--button-radius` | `--card-radius` | `--card-shadow` Highlights |
| --- | --- | --- | --- | --- |
| Default / Aurora | 1.25 / 0.75 / 0.375 rem | 0.75 rem | 1.25 rem | Soft but modern shadow for general SaaS apps. |
| Minimalist / Zen | 0.75 / 0.5 / 0.25 rem | 0.35 rem | 0.5 rem | Squarer blocks with restrained elevation. |
| Earthy / Terracotta | 1.5 / 1 / 0.5 rem | 0.875 rem | 1.5 rem | Rounded capsules + warm, diffuse shadows. |
| Cyber-Noir / Neon | 1 / 0.5 / 0.3 rem | 999px (pill) | 0.75 rem | Glassy floating cards with dramatic glow. |
| Luxury / Opulence | 1.75 / 1 / 0.5 rem | 999px (capsule) | 1.5 rem | Deep, velvety shadow evoking premium layers. |
| Verdant / Pacific NW | 1 / 0.625 / 0.375 rem | 0.625 rem | 1 rem | Organic rounding with forest-tinted shadows. |

The tokens in each CSS block mirror this table so components automatically inherit their shape and elevation from the active theme.

### 4.4 Spacing & Density Tokens by Theme

| Theme | `--control-height` | `--stack-gap` | `--section-gap` | Density Notes |
| --- | --- | --- | --- | --- |
| Default / Aurora | 2.75rem | 1.25rem | 3rem | Balanced comfort for product UIs. |
| Minimalist / Zen | 2.5rem | 1rem | 2.5rem | Compact footprint with calm whitespace. |
| Earthy / Terracotta | 2.85rem | 1.5rem | 3.5rem | Generous breathing room for editorial feel. |
| Cyber-Noir / Neon | 2.6rem | 1.1rem | 2.75rem | Agile layouts with tight stack spacing. |
| Luxury / Opulence | 3rem | 1.4rem | 3.75rem | Tall controls and elongated sections for drama. |
| Verdant / Pacific NW | 2.75rem | 1.25rem | 3rem | Balanced comfort with natural breathing room. |

### 4.5 Motion & Iconography Tokens by Theme

| Theme | Motion (fast / base / slow) | `--motion-ease` | `--motion-ease-emphasis` | Icon Style (`--icon-stroke` · `--icon-corner`) | Notes |
| --- | --- | --- | --- | --- | --- |
| Default / Aurora | 120 / 200 / 320 ms | `cubic-bezier(0.4, 0, 0.2, 1)` | `cubic-bezier(0.2, 0, 0, 1)` | 1.75px · 4px | Familiar SaaS pacing with rounded glyph caps. |
| Minimalist / Zen | 160 / 240 / 360 ms | `cubic-bezier(0.33, 1, 0.68, 1)` | `cubic-bezier(0.16, 1, 0.3, 1)` | 1.5px · 2px | Ease-out glide plus slim icon strokes. |
| Earthy / Terracotta | 150 / 260 / 380 ms | `cubic-bezier(0.25, 0.1, 0.25, 1)` | `cubic-bezier(0.05, 0.7, 0.1, 1)` | 1.85px · 6px | Organic easing with softened glyph corners. |
| Cyber-Noir / Neon | 90 / 160 / 240 ms | `cubic-bezier(0.83, 0, 0.17, 1)` | `cubic-bezier(0.68, -0.6, 0.32, 1.6)` | 2px · 0px | Snappy, high-tech motion and razor icons. |
| Luxury / Opulence | 140 / 260 / 420 ms | `cubic-bezier(0.19, 1, 0.22, 1)` | `cubic-bezier(0.22, 1, 0.36, 1)` | 1.4px · 10px | Languid easing with jeweler-grade cornering. |
| Verdant / Pacific NW | 180 / 280 / 420 ms | `cubic-bezier(0.25, 0.46, 0.45, 0.94)` | `cubic-bezier(0.19, 1, 0.22, 1)` | 1.75px · 5px | Natural easing with organic glyph rounding. |

## 5. Baseline Token Defaults

| Token | Value | Notes |
| --- | --- | --- |
| `--font-sans` | `'Inter', 'Source Sans 3', system` | Primary body font. |
| `--font-heading` | `'Clash Display', 'Poppins', system` | Reserved for headlines and hero sections. |
| `--font-mono` | `'IBM Plex Mono', 'Fira Code', monospace` | For code snippets, metrics, and tabular figures. |
| `--radius-lg` | `1.25rem` | Cards, sheets, modals. |
| `--radius-md` | `0.75rem` | Inputs, buttons, menus. |
| `--radius-sm` | `0.375rem` | Chips, badges. |
| `--button-radius` | `0.75rem` | Standard Aurora button rounding. |
| `--card-shadow` | `0 25px 45px -20px rgba(15,23,42,0.25)` | Raise/float elevation. |
| `--control-height` | `2.75rem` | Default vertical size for buttons/inputs. |
| `--stack-gap` | `1.25rem` | Baseline gap for columnar layouts. |
| `--section-gap` | `3rem` | Distance between major layout groupings. |
| `--motion-duration-fast` | `120ms` | Quick affordance feedback. |
| `--motion-duration-base` | `200ms` | Standard nav/hover transitions. |
| `--motion-duration-slow` | `320ms` | Overlays, hero reveals. |
| `--motion-ease` | `cubic-bezier(0.4, 0, 0.2, 1)` | Material-like ease-in-out. |
| `--motion-ease-emphasis` | `cubic-bezier(0.2, 0, 0, 1)` | Emphasized exits/enters. |
| `--icon-stroke` | `1.75px` | Icon stroke weight for shared set. |
| `--icon-corner` | `4px` | Icon corner rounding radius. |

_Note: These values represent the **Default/Aurora** baseline. Each theme overrides the same tokens within Section 4 to stay on-brand while preserving sizing scale alignment._

Spacing follows a **4px grid**. Document component padding/margins as multiples of `0.25rem` to maintain rhythm. Extend Tailwind's spacing scale through at least `24` (6rem) and keep layout widths bounded by `max-w-screen-*` utilities to guarantee consistent breakpoints.

## 6. Component Primitives & States

### 6.1 Buttons & Iconography

- Sizes stay fixed at `sm (0.5rem x 2rem)`, `md (0.75rem x 2.5rem)`, `lg (1rem x 3rem)`; height ties directly to `--control-height` so density adjustments happen theme-wide.
- Variants (`primary`, `secondary`, `accent`, `ghost`, `link`, `destructive`) always map to the corresponding tokens. Hover states shift luminance ±5%; disabled states drop opacity to 60% but keep spacing. Apply `font-weight: var(--button-font-weight)` and `border-radius: var(--button-radius)`.
- Focus rings: `outline: 2px solid hsl(var(--accent)); outline-offset: 2px`. When accent contrast is <3:1, use `var(--info)` as backup to maintain visibility.

| Theme | Icon placement & gap | Icon scale & stroke | Personality cues |
| --- | --- | --- | --- |
| Default / Aurora | Leading icons default, trailing only for pagination. `gap-2` aligns with `--stack-gap`. | `text-[1em]` icons honoring `--icon-stroke` 1.75px. | Balanced look; uppercase reserved for CTAs with `data-size='lg'`. |
| Minimalist / Zen | Icons are optional; when present they sit trailing with `gap-1.5` to keep layouts airy. | `text-[0.95em]` with `--icon-stroke` 1.5px and soft corner tokens. | Limit to monochrome glyphs; avoid filled icons except destructive. |
| Earthy / Terracotta | Icons precede labels for action verbs, with `gap-2.5` to echo generous `--stack-gap`. | `text-[1.05em]` and `--icon-stroke` 1.85px for handcrafted feel. | Allow subtle textured backgrounds via `bg-secondary/60`. |
| Cyber-Noir / Neon | Either leading or trailing icons depending on direction; use `gap-1`. | `text-[1.1em]` with `--icon-stroke` 2px and squared corners. | Enable animated icon shifts using `--motion-duration-fast`. |
| Luxury / Opulence | Icons trail labels unless it's a single glyph pill. `gap-2.5` and slightly increased letter spacing (`tracking-wide`). | `text-[0.9em]` with `--icon-stroke` 1.4px and high corner rounding. | Gold-gradient strokes allowed on `accent` variant only. |

### 6.2 Inputs & Density Controls

- Inputs, selects, comboboxes, and textareas use `border border-border bg-background`, padding `px-4` and `py-[calc((var(--control-height)-1.25rem)/2)]` to stay in sync with `--control-height`.
- Placeholder text uses `color: hsl(var(--muted-foreground) / 0.8)`. Always provide `aria-describedby` for helper/error copy.
- Density toggles (`data-density='compact'`) subtract `0.25rem` vertical padding and `0.5rem` from `--section-gap` by applying CSS calc with the theme tokens so the rhythm stays proportional.

### 6.3 Cards, Surfaces & Dividers

- Base padding `1.5rem`, vertical stacking `gap-4`, but the perceived spaciousness is governed by each theme’s `--stack-gap` and `--section-gap`.
- Dividers inherit from the `border` token but vary by style to emphasize theme DNA.

| Theme | Divider spec | Surface treatment | Notes |
| --- | --- | --- | --- |
| Default / Aurora | `1px solid hsl(var(--border))` | `bg-background` with `shadow-[var(--card-shadow)]`. | Use for general SaaS dashboards. |
| Minimalist / Zen | `0.5px solid hsl(var(--border) / 0.6)` or dotted hairlines. | Flat cards with `border border-border` and no shadow on mobile. | Keeps emphasis on content grids. |
| Earthy / Terracotta | `1px solid hsl(var(--muted))` plus `md:border-l-2` accent lines. | Diffuse `var(--card-shadow)` and optional `bg-accent/5` wash. | Mimic artisanal print layouts. |
| Cyber-Noir / Neon | `1px` linear-gradient divider using `primary` → `accent`. | `backdrop-blur` + `shadow-[var(--card-shadow)]` for glass panels. | Pair with glowing corner accents via pseudo-elements. |
| Luxury / Opulence | `1px solid hsl(var(--secondary) / 0.5)` plus `box-shadow: inset 0 1px hsl(var(--primary)/0.4)`. | Layered cards with double borders (`border` + `border-primary/30`). | Suggests premium metallic insets. |

### 6.4 Typography Roles by Theme

| Theme | Headings | Body copy | Accent usage |
| --- | --- | --- | --- |
| Default / Aurora | `Cal Sans`/`Poppins` for H1–H3 at 600 weight; H4+ fallback to `Inter`. | `Inter` 400/500 for general UI, 600 for metric labels. | Use `Cal Sans` italics sparingly for marketing callouts. |
| Minimalist / Zen | `Space Grotesk` only on H1/H2 with tracking-tight; H3+ swap to `Source Sans 3`. | `Source Sans 3` 400 with +2 tracking; keep paragraphs <75ch. | Avoid italics; use weight shifts instead. |
| Earthy / Terracotta | `Source Serif 4` for H1–H4 with ligatures enabled; `Public Sans` for captions. | `Public Sans` 400 for body, 500 for form labels. | Serif pull quotes at 500 italic for storytelling moments. |
| Cyber-Noir / Neon | `Orbitron` uppercase for H1/H2, `Space Grotesk` for H3–H6. | `Space Grotesk` 500 for body, 400 for metadata. | Monospaced accent lines (JetBrains Mono) for data-heavy UI. |
| Luxury / Opulence | `Cormorant Garamond` H1/H2 with optical sizing; H3–H5 use `Manrope` 600. | `Manrope` 400 baseline with `line-height: 1.7`. | Use small caps (`font-variant: small-caps`) for section labels. |

### 6.5 Navigation, Chips & Feedback

- **Navigation**: Sticky headers use translucent backgrounds `bg-background/80 backdrop-blur`. Active nav items rely on `primary` tokens; hover uses `accent`. Hamburger/command bars adopt `accent` for focus and should animate using each theme’s `--motion-duration-base`.
- **Chips & badges**: `text-sm font-medium px-3 py-1`, `border border-border`, radius `--radius-sm` or `999px` for pills. Variants map to state tokens (success, warning, info). Icon-only chips must respect `--icon-stroke`.
- **Feedback**: Toasts, alerts, and banners consume `success`, `warning`, `destructive`, `info` tokens. Pair with matching icons and set `role='status'` or `role='alert'` plus `aria-live='polite'`. Motion should not exceed the theme’s `--motion-duration-base` for entrance or `--motion-duration-slow` for exit.

Component API docs live beside primitives (`@/components/ui/<component>.mdx`). Never redefine token values inside component files; only reference them via Tailwind utilities or CSS vars.

## 7. Interaction, Motion, and Accessibility

- **Motion**: Use the per-theme `--motion-duration-*` values for transitions and feed `--motion-ease` into custom keyframes. Overlays/drawers should cap at the theme’s `--motion-duration-slow`. Always honor `@media (prefers-reduced-motion)` by zeroing these tokens.
- **Focus**: Every interactive element needs a visible outline derived from `--accent`. Do not remove outlines except for custom keyboard-visible replacements. Add a secondary outline using `--info` for dark themes if `accent` contrast drops below 3:1.
- **Density**: Support `data-density='comfortable' | 'compact'` wrappers; `compact` subtracts `0.25rem` padding from vertical rhythm but retains typography scale by referencing `--control-height` and `--stack-gap`.
- **Elevation**: Only three layers: flat, raised (`--card-shadow`), floating (shadow plus `border-border/60`). Pair floating layers with backdrop blur for modals and keep shadows theme-specific.
- **Contrast**: Maintain WCAG AA (4.5:1 for body text, 3:1 for large text). Adjust `*-foreground` tokens rather than injecting ad-hoc colors when contrast fails. Enforce a minimum `16px` body size and `24px` hit target for all themes, even when `--control-height` shrinks.

### 7.1 Theme-specific Hover & Focus Cues

- **Default / Aurora**: Hover shifts lighten/darken backgrounds by 5% while keeping elevation constant. Focus rings stay `accent`-based with subtle box-shadows `0 0 0 4px hsl(var(--accent) / 0.15)`.
- **Minimalist / Zen**: Hover states rely on border opacity changes instead of fills. Focus rings use `outline-offset: 4px` and may switch to `--info` hues for calm emphasis.
- **Earthy / Terracotta**: Hover uses a tinted overlay `bg-accent/10`; focus combines `accent` outline with `box-shadow: 0 0 0 2px hsl(var(--secondary) / 0.5)` to mimic handcrafted edges.
- **Cyber-Noir / Neon**: Hover toggles neon glows (`shadow-[0_0_12px_hsl(var(--accent)/0.6)]`). Focus rings animate from dashed to solid using `--motion-duration-fast` and rely on `accent` or `info` to meet contrast.
- **Luxury / Opulence**: Hover adds a soft gradient shift plus slight scale (`1.01`) governed by `--motion-duration-base`. Focus uses double outlines: `accent` outer ring and `secondary` inner ring to evoke layered metals.

## 8. Agent Consumption & Extension Workflow

1. **Sync**: During scaffolding, copy this file (and the CSS tokens) into the project or consume it via a git submodule/standards package.
2. **Apply**: Set `<html data-theme='default-light'>` (or the project's chosen variant) and reuse the Tailwind config in Section 3. Register other variants in the theme switcher but keep tokens centralized.
3. **Extend**: When adding a new style, work in a scratch branch, run visual QA for light/dark, then append the finalized tokens to this document so every future agent inherits them.
4. **Fallback**: If a requirement falls outside these definitions, default to `default-*` tokens and follow the hierarchy from Sections 5-7 (typography scale, spacing, accessibility cues) before proposing custom colors.
5. **Verify**: Before merging, capture Storybook or Playwright screenshots for both light and dark modes of the active theme to detect regressions.

Keeping this standard in `design/ui-standards.md` ensures every new project and agent consumes the same palette, typography, and interaction rules without divergence.
