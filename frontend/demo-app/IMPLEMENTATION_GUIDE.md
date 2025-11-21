# Theme System Implementation Guide

## Overview

This theme system provides 17 professionally designed themes that can be switched dynamically without reloading the page. All components automatically adapt to theme changes via CSS custom properties.

## Available Themes

### Core Themes
- **Aurora** (`default`) - Balanced SaaS baseline with rounded geometry
- **Zen** (`minimalist`) - Monochrome, typography-led calm layouts
- **Terracotta** (`earthy`) - Organic editorial spacing with warm accents

### Specialty Themes
- **Neon** (`cyber-noir`) - Retro-tech 8-bit aesthetic
- **Opulence** (`luxury`) - Jewel tones with metallic gold accents
- **Soft Pastel** (`soft-pastel`) - Gentle pastels with airy layouts
- **Comic** (`comic`) - Bold comic book energy

### Industry Themes
- **Summit** (`summit`) - Technical outdoor gear aesthetic
- **Velocity** (`velocity`) - High-energy extreme sports
- **Valor** (`valor`) - Bold championship styling
- **Vogue** (`vogue`) - Minimalist editorial fashion
- **Vitality** (`vitality`) - Clean healthcare design
- **Sterling** (`sterling`) - Professional finance theme
- **Syntax** (`syntax`) - Developer-focused code editor aesthetic
- **Nexus** (`nexus`) - Modern gaming and esports
- **Ember** (`ember`) - Warm culinary design
- **Prism** (`prism`) - Bold creative agency theme

## Quick Start

### 1. Copy Theme System Files

```bash
# Copy the CSS file to your project
cp frontend/demo-app/app/globals.css your-project/styles/
```

### 2. Import in Your Application

**Next.js:**
```typescript
// app/layout.tsx
import './globals.css';
```

**React/Vite:**
```typescript
// main.tsx or App.tsx
import './styles/globals.css';
```

### 3. Implement Theme Switching

**Basic Implementation:**
```typescript
const setTheme = (themeName: string) => {
  document.documentElement.dataset.theme = themeName;
};

// Usage
setTheme('summit');
setTheme('vitality');
```

**With Persistence:**
```typescript
const STORAGE_KEY = 'app-theme';

export const setTheme = (themeName: string) => {
  document.documentElement.dataset.theme = themeName;
  localStorage.setItem(STORAGE_KEY, themeName);
};

export const loadTheme = () => {
  const savedTheme = localStorage.getItem(STORAGE_KEY) || 'default';
  document.documentElement.dataset.theme = savedTheme;
  return savedTheme;
};

// Call on app initialization
loadTheme();
```

**React Hook Implementation:**
```typescript
import { useEffect, useState } from 'react';

const THEME_STORAGE_KEY = 'app-theme';

export const useTheme = () => {
  const [theme, setThemeState] = useState<string>('default');

  useEffect(() => {
    // Load saved theme
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) || 'default';
    setThemeState(savedTheme);
    document.documentElement.dataset.theme = savedTheme;
  }, []);

  const setTheme = (themeName: string) => {
    setThemeState(themeName);
    document.documentElement.dataset.theme = themeName;
    localStorage.setItem(THEME_STORAGE_KEY, themeName);
  };

  return { theme, setTheme };
};

// Usage in component
const ThemeSelector = () => {
  const { theme, setTheme } = useTheme();
  
  return (
    <select value={theme} onChange={(e) => setTheme(e.target.value)}>
      <option value="default">Aurora</option>
      <option value="summit">Summit</option>
      <option value="vitality">Vitality</option>
      {/* ... other themes */}
    </select>
  );
};
```

## Admin Settings Panel

### Complete Settings Component

```typescript
'use client';

import { useEffect, useState } from 'react';

const THEME_OPTIONS = [
  { value: 'default', label: 'Aurora', category: 'Core' },
  { value: 'minimalist', label: 'Zen', category: 'Core' },
  { value: 'earthy', label: 'Terracotta', category: 'Core' },
  { value: 'cyber-noir', label: 'Neon', category: 'Specialty' },
  { value: 'luxury', label: 'Opulence', category: 'Specialty' },
  { value: 'soft-pastel', label: 'Soft Pastel', category: 'Specialty' },
  { value: 'comic', label: 'Comic', category: 'Specialty' },
  { value: 'summit', label: 'Summit', category: 'Industry' },
  { value: 'velocity', label: 'Velocity', category: 'Industry' },
  { value: 'valor', label: 'Valor', category: 'Industry' },
  { value: 'vogue', label: 'Vogue', category: 'Industry' },
  { value: 'vitality', label: 'Vitality', category: 'Industry' },
  { value: 'sterling', label: 'Sterling', category: 'Industry' },
  { value: 'syntax', label: 'Syntax', category: 'Industry' },
  { value: 'nexus', label: 'Nexus', category: 'Industry' },
  { value: 'ember', label: 'Ember', category: 'Industry' },
  { value: 'prism', label: 'Prism', category: 'Industry' },
];

const MODE_OPTIONS = [
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
];

export default function AdminThemeSettings() {
  const [theme, setTheme] = useState('default');
  const [mode, setMode] = useState('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('app-theme') || 'default';
    const savedMode = localStorage.getItem('app-mode') || 'light';
    setTheme(savedTheme);
    setMode(savedMode);
    document.documentElement.dataset.theme = savedTheme;
    document.documentElement.dataset.mode = savedMode;
  }, []);

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    document.documentElement.dataset.theme = newTheme;
    localStorage.setItem('app-theme', newTheme);
  };

  const handleModeChange = (newMode: string) => {
    setMode(newMode);
    document.documentElement.dataset.mode = newMode;
    localStorage.setItem('app-mode', newMode);
  };

  const groupedThemes = THEME_OPTIONS.reduce((acc, theme) => {
    if (!acc[theme.category]) acc[theme.category] = [];
    acc[theme.category].push(theme);
    return acc;
  }, {} as Record<string, typeof THEME_OPTIONS>);

  return (
    <div className="card">
      <h2>Site Theme Settings</h2>
      <p>Configure the visual appearance of your application</p>
      
      <div style={{ marginTop: '2rem' }}>
        <h3>Color Mode</h3>
        <div className="button-row" style={{ marginTop: '0.5rem' }}>
          {MODE_OPTIONS.map(({ value, label }) => (
            <button
              key={value}
              type="button"
              className="ghost"
              aria-pressed={mode === value}
              onClick={() => handleModeChange(value)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <h3>Theme</h3>
        {Object.entries(groupedThemes).map(([category, themes]) => (
          <div key={category} style={{ marginTop: '1.5rem' }}>
            <h4 style={{ fontSize: '0.875rem', color: 'hsl(var(--muted-foreground))' }}>
              {category}
            </h4>
            <div className="button-row" style={{ marginTop: '0.5rem' }}>
              {themes.map(({ value, label }) => (
                <button
                  key={value}
                  type="button"
                  className="secondary"
                  aria-pressed={theme === value}
                  onClick={() => handleThemeChange(value)}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '2rem', padding: '1rem', background: 'hsl(var(--muted))', borderRadius: 'var(--card-radius)' }}>
        <strong>Current Selection:</strong>
        <p>Theme: {THEME_OPTIONS.find(t => t.value === theme)?.label}</p>
        <p>Mode: {mode}</p>
      </div>
    </div>
  );
}
```

## Server-Side Implementation

### Database Storage

For applications with user accounts, store theme preferences in your database:

```sql
-- Add to user table
ALTER TABLE users ADD COLUMN theme_preference VARCHAR(50) DEFAULT 'default';
ALTER TABLE users ADD COLUMN color_mode VARCHAR(10) DEFAULT 'light';
```

### API Endpoints

```typescript
// app/api/user/theme/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { theme, mode } = await request.json();
  const userId = /* get from session */;
  
  // Save to database
  await db.user.update({
    where: { id: userId },
    data: { 
      theme_preference: theme,
      color_mode: mode 
    }
  });
  
  return NextResponse.json({ success: true });
}

export async function GET() {
  const userId = /* get from session */;
  
  const user = await db.user.findUnique({
    where: { id: userId },
    select: { theme_preference: true, color_mode: true }
  });
  
  return NextResponse.json({
    theme: user?.theme_preference || 'default',
    mode: user?.color_mode || 'light'
  });
}
```

### Server-Side Rendering

Load user preferences on the server:

```typescript
// app/layout.tsx (Next.js App Router)
export default async function RootLayout({ children }) {
  const user = await getCurrentUser();
  const theme = user?.theme_preference || 'default';
  const mode = user?.color_mode || 'light';

  return (
    <html lang="en" data-theme={theme} data-mode={mode}>
      <body>{children}</body>
    </html>
  );
}
```

## Advanced Features

### Theme Transition Animation

```css
/* Add to globals.css */
html {
  transition: background-color 200ms ease, color 200ms ease;
}
```

### Respect System Preferences

```typescript
const getSystemPreference = () => {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

export const initializeTheme = () => {
  const savedMode = localStorage.getItem('app-mode');
  const mode = savedMode || getSystemPreference();
  document.documentElement.dataset.mode = mode;
};
```

### React Context Provider

```typescript
import { createContext, useContext, useEffect, useState } from 'react';

interface ThemeContextType {
  theme: string;
  mode: string;
  setTheme: (theme: string) => void;
  setMode: (mode: string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setThemeState] = useState('default');
  const [mode, setModeState] = useState('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('app-theme') || 'default';
    const savedMode = localStorage.getItem('app-mode') || 'light';
    setThemeState(savedTheme);
    setModeState(savedMode);
    document.documentElement.dataset.theme = savedTheme;
    document.documentElement.dataset.mode = savedMode;
  }, []);

  const setTheme = (newTheme: string) => {
    setThemeState(newTheme);
    document.documentElement.dataset.theme = newTheme;
    localStorage.setItem('app-theme', newTheme);
  };

  const setMode = (newMode: string) => {
    setModeState(newMode);
    document.documentElement.dataset.mode = newMode;
    localStorage.setItem('app-mode', newMode);
  };

  return (
    <ThemeContext.Provider value={{ theme, mode, setTheme, setMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
};
```

## Testing

### Test Theme Switching

```typescript
describe('Theme System', () => {
  it('should apply theme to document', () => {
    setTheme('summit');
    expect(document.documentElement.dataset.theme).toBe('summit');
  });

  it('should persist theme to localStorage', () => {
    setTheme('vitality');
    expect(localStorage.getItem('app-theme')).toBe('vitality');
  });

  it('should load saved theme on initialization', () => {
    localStorage.setItem('app-theme', 'nexus');
    loadTheme();
    expect(document.documentElement.dataset.theme).toBe('nexus');
  });
});
```

## Troubleshooting

### Theme Not Applying
- Ensure `globals.css` is imported before component styles
- Check that data attribute is set: `document.documentElement.dataset.theme`
- Verify CSS custom properties are not being overridden

### Flash of Unstyled Content
- Load theme before React hydration
- Add script in `<head>` to set theme immediately

```html
<script>
  (function() {
    const theme = localStorage.getItem('app-theme') || 'default';
    document.documentElement.dataset.theme = theme;
  })();
</script>
```

### Performance
- Theme switching is instant (no repaints)
- CSS custom properties are highly optimized
- No JavaScript needed after initial setup

## Migration Guide

### From Existing Theme System

1. Map your current themes to new theme values
2. Update component classes to use CSS custom properties
3. Test all components in each theme
4. Migrate user preferences to new theme names

### Adding Custom Themes

Copy an existing theme block and modify colors:

```css
:root[data-mode='light'][data-theme='custom'] {
  --background: /* your values */;
  --foreground: /* your values */;
  /* ... other properties */
}
```

## Support

For questions or issues:
- Review the demo app at `/frontend/demo-app`
- Check CSS documentation in `globals.css`
- Reference theme specifications in `ADDITIONAL_THEMES.md`
