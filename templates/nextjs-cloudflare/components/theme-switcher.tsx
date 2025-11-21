'use client';

import * as React from 'react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { MoonIcon, SunIcon } from 'lucide-react';

const themes = [
  { value: 'aurora', label: 'Default (Aurora)' },
  { value: 'zen', label: 'Minimalist (Zen)' },
  { value: 'terracotta', label: 'Earthy (Terracotta)' },
  { value: 'neon', label: 'Cyber-Noir (Neon)' },
  { value: 'opulence', label: 'Luxury (Opulence)' },
];

export function ThemeSwitcher() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const [mode, setMode] = React.useState<'light' | 'dark'>('light');

  React.useEffect(() => {
    setMounted(true);
    if (typeof document !== 'undefined') {
      const currentMode = document.documentElement.getAttribute('data-mode') as 'light' | 'dark';
      setMode(currentMode || 'light');
    }
  }, []);

  if (!mounted) {
    return null;
  }

  const toggleMode = () => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    setMode(newMode);
    document.documentElement.setAttribute('data-mode', newMode);
    document.documentElement.setAttribute('data-theme', theme || 'aurora');
  };

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    document.documentElement.setAttribute('data-mode', mode);
  };

  return (
    <div className="flex items-center gap-2">
      <Select value={theme} onValueChange={handleThemeChange}>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Select theme" />
        </SelectTrigger>
        <SelectContent>
          {themes.map((t) => (
            <SelectItem key={t.value} value={t.value}>
              {t.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Button variant="ghost" size="icon" onClick={toggleMode}>
        {mode === 'light' ? (
          <SunIcon className="h-5 w-5" />
        ) : (
          <MoonIcon className="h-5 w-5" />
        )}
        <span className="sr-only">Toggle theme mode</span>
      </Button>
    </div>
  );
}
