# Next.js Frontend Guide

Comprehensive guide for building frontends with Next.js, React, TypeScript, Tailwind CSS, and shadcn/ui.

---

## Canonical Frontend Stack

All new frontend work must use:

- **Next.js (App Router)** with React function components
- **TypeScript** for all components, hooks, and utilities
- **Tailwind CSS** for styling, wired to shared design tokens
- **shadcn/ui** (Radix-based components) for UI primitives under `@/components/ui`
- **next-themes** for light/dark color modes
- **Multi-theme system** using `data-theme` on `<html>` (17 themes available)

For detailed design & theming contracts, see:
- [Design System](../../../design/ui-standards.md)
- [Theme System](../theme-system/theme-profiles.md)

---

## Project Structure

```
app/                      # Next.js App Router
├── page.tsx             # Route pages
├── layout.tsx           # Shared layouts
└── api/                 # API routes

components/
├── ui/                  # shadcn/ui primitives (Button, Card, Input, etc.)
├── layout/              # Layout components (Header, Sidebar, Footer)
└── features/            # Feature-specific components

hooks/                   # Custom React hooks
lib/                     # Utilities and helpers
styles/                  # Global styles and theme CSS
```

---

## Component Architecture

### Pages (App Router)
- **Thin orchestration**: routing, data fetching, layout composition
- **Minimal logic**: delegate to hooks/services
- Keep pages focused on composition, not business logic

### Components
- **UI primitives** in `@/components/ui/*` (shadcn/ui-based)
- **Layout components** in `@/components/layout/*`
- **Feature components** in `@/components/features/*`
- Compose from UI + layout primitives
- Avoid large "god components"; prefer small, focused components

### Hooks (`@/hooks`)
- Encapsulate data fetching and stateful behavior
- Reuse patterns for data loading, forms, modals
- Keep components focused on rendering

---

## Design System & Styling

### Token-Based Styling
- Colors, radii, shadows, and fonts come from CSS variables
- Examples: `--background`, `--primary`, `--radius-lg`, `--font-sans`
- Tailwind configured to use `hsl(var(--...))` for colors

### Semantic Tailwind Classes
✅ **USE:**
- `bg-background`, `text-foreground`
- `bg-primary`, `bg-secondary`, `bg-accent`
- `border-border`, `text-muted-foreground`
- `rounded-lg` (uses `--radius-lg`)

❌ **AVOID:**
- Hardcoded hex colors: `bg-[#3b82f6]`
- Custom radii: `rounded-[12px]`
- Custom font families in components

### Shared Primitives
Always use shared components from `@/components/ui`:
- **Buttons**: `<Button>` with variants (`default`, `secondary`, `outline`, `ghost`)
- **Cards**: `<Card>`, `<CardHeader>`, `<CardContent>`, `<CardFooter>`
- **Inputs**: `<Input>`, `<Textarea>`, `<Select>`
- **Dialogs**: `<Dialog>`, `<AlertDialog>`
- **Forms**: Use with `react-hook-form` and `zod`

**Need a new style?**
- Extend the shared component (add variant prop)
- Don't create one-off duplicates

---

## Multi-Theme System

### Available Themes (17 Total)
1. **Aurora** (default) - Modern SaaS
2. **Zen** - Minimalist typography
3. **Terracotta** - Warm organic
4. **Neon** - Cyberpunk neon
5. **Opulence** - Luxury premium
6. **Soft Pastel** - Gentle dreamy
7. **Comic** - Playful energetic
8. **Summit** - Outdoor adventure
9. **Velocity** - Action sports
10. **Valor** - Tactical military
11. **Vogue** - Fashion editorial
12. **Vitality** - Healthcare clean
13. **Sterling** - Finance formal
14. **Syntax** - Developer terminal
15. **Nexus** - Gaming aggressive
16. **Ember** - Culinary warm
17. **Prism** - Creative agency

### Implementation
- `<html>` element controls themes:
  - `class="dark"` for dark mode (from `next-themes`)
  - `data-theme="aurora"` for style theme
- Theme CSS in `styles/themes/*.css`
- All themes provide same token set

### Theme Switching
```tsx
import { useTheme } from 'next-themes'

function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()
  const [styleTheme, setStyleTheme] = useState('aurora')
  
  // Set color mode (light/dark)
  setTheme('dark')
  
  // Set style theme
  document.documentElement.setAttribute('data-theme', 'neon')
}
```

### Rules for Theme Compatibility
✅ **DO:**
- Use semantic Tailwind classes
- Modify tokens in `styles/themes/*.css`
- Test across multiple themes

❌ **DON'T:**
- Hardcode colors in components
- Create theme-specific component variants
- Override tokens with inline styles

---

## Responsiveness & UX

### Responsive Design
- All UI must work on mobile and desktop
- Use Tailwind responsive utilities: `sm:`, `md:`, `lg:`, `xl:`
- Test at key breakpoints: 375px (mobile), 768px (tablet), 1024px (desktop)

### Loading States
- Use skeleton components from shadcn/ui
- Show spinners for async operations
- Provide feedback for all user actions

### Error States
- Display errors inline when possible
- Use toast notifications for global errors
- Provide actionable error messages

### Empty States
- Show helpful messages when no data
- Include CTAs to guide users
- Use illustrations or icons

---

## Accessibility

### Essential Practices
- **Semantic HTML**: Use proper HTML5 elements
- **Labels**: All form inputs need labels
- **Keyboard Navigation**: All interactive elements accessible via keyboard
- **Focus States**: Visible focus indicators
- **ARIA**: Use ARIA attributes when semantic HTML isn't enough
- **Color Contrast**: Maintain WCAG AA ratios (handled by theme tokens)

### Testing Accessibility
- Test with keyboard only (no mouse)
- Use screen reader (NVDA, JAWS, VoiceOver)
- Run Lighthouse accessibility audits
- Check color contrast in both light/dark modes

---

## State Management

### Recommended Patterns
- **React hooks** for local state
- **Contexts** for shared state (theme, auth, etc.)
- **React Query** (if already in use) for server state
- Don't introduce new state libraries without discussion

### Data Fetching
- Co-locate fetching in hooks or data modules
- Keep components focused on rendering
- Handle loading, error, and success states
- Use proper TypeScript types for API responses

---

## Testing

### Test Coverage Requirements
Add or update tests for any non-trivial UI change:

1. **Component Tests** (React Testing Library)
   - Rendering of primary components
   - User interactions (clicks, form inputs)
   - Conditional rendering

2. **Integration Tests**
   - Complete user flows
   - API integration points
   - Form submissions

3. **E2E Tests** (Cypress/Playwright)
   - Critical user journeys
   - Multi-step processes
   - Cross-browser compatibility

### Testing Best Practices
- Test behavior, not implementation
- Use proper test IDs (`data-testid`)
- Test accessibility (roles, labels)
- Mock external dependencies
- Don't reduce coverage

---

## Performance

### Optimization Strategies
- Use Next.js Image component for images
- Implement code splitting via dynamic imports
- Memoize expensive computations (`useMemo`)
- Prevent unnecessary re-renders (`useCallback`, `memo`)
- Lazy load non-critical components
- Use proper caching strategies

### Performance Monitoring
- Monitor Core Web Vitals
- Use Lighthouse for audits
- Profile with React DevTools
- Watch bundle size

---

## Common Patterns

### Form Handling
```tsx
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

const schema = z.object({
  email: z.string().email(),
  name: z.string().min(2)
})

function MyForm() {
  const form = useForm({
    resolver: zodResolver(schema)
  })
  
  // Form implementation
}
```

### Data Fetching Hook
```tsx
function useData<T>(url: string) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  
  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false))
  }, [url])
  
  return { data, loading, error }
}
```

### Modal Pattern
```tsx
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'

function MyModal({ open, onClose }) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Modal Title</DialogTitle>
        </DialogHeader>
        {/* Modal content */}
      </DialogContent>
    </Dialog>
  )
}
```

---

## Deployment

### Next.js on Cloudflare Pages
- Build command: `npm run build`
- Output directory: `.next`
- Node.js compatibility required
- Set environment variables in Cloudflare dashboard

### Environment Variables
- Use `.env.local` for local development
- Never commit `.env` files
- Access via `process.env.NEXT_PUBLIC_*` for client-side
- Access via `process.env.*` for server-side only

---

## Migration from Old Patterns

### Upgrading from Pages Router
- Move pages from `pages/` to `app/`
- Replace `_app.tsx` with `layout.tsx`
- Replace `getServerSideProps` with `async` components
- Update routing to use folder structure

### Adopting Theme System
- Replace hardcoded colors with semantic classes
- Import theme CSS files
- Add theme provider to layout
- Test across all themes

---

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [React Hook Form](https://react-hook-form.com)
- [Design System](../../../design/ui-standards.md)
- [Accessibility Guidelines](../../../design/accessibility.md)
