# Component Library Documentation

This document covers the customized **shadcn/ui** components used across mjs76 Development Standards projects.

## Table of Contents

- [Overview](#overview)
- [Installation](#installation)
- [Theming System](#theming-system)
- [Component Reference](#component-reference)
  - [Button](#button)
  - [Card](#card)
  - [Input](#input)
  - [Select](#select)
  - [Badge](#badge)
  - [Alert](#alert)
  - [Dialog](#dialog)
  - [Dropdown Menu](#dropdown-menu)
- [Custom Patterns](#custom-patterns)
- [Accessibility](#accessibility)

---

## Overview

All components are built with **shadcn/ui** as the foundation, customized to work seamlessly with our **17 theme system** (Aurora, Zen, Terracotta, Neon, Opulence, Soft Pastel, Comic, Summit, Velocity, Valor, Vogue, Vitality, Sterling, Syntax, Nexus, Ember, Prism) across light and dark modes.

### Design Principles

1. **Token-Driven**: All colors reference CSS variables from `globals.css`
2. **Accessible**: WCAG 2.1 AA compliant (4.5:1 contrast for text)
3. **Responsive**: Mobile-first design, tested on 320px - 2560px
4. **Composable**: Small, single-purpose components
5. **Type-Safe**: Full TypeScript support with exported types

---

## Installation

### Add a Component

```bash
# Add individual components
npx shadcn-ui@latest add button
npx shadcn-ui@latest add card
npx shadcn-ui@latest add input

# Add all at once
npx shadcn-ui@latest add --all
```

Components are copied to `components/ui/` and can be customized directly.

### Manual Setup

If not using the CLI, install dependencies:

```bash
npm install class-variance-authority clsx tailwind-merge
npm install lucide-react # For icons
```

---

## Theming System

All components use CSS variables that adapt to the selected theme and mode.

### CSS Variables

```css
:root {
  --background: 0 0% 100%;        /* Page background */
  --foreground: 222 47% 11%;      /* Primary text */
  --primary: 217 70% 58%;         /* Primary actions */
  --primary-foreground: 0 0% 100%; /* Text on primary */
  --accent: 147 50% 47%;          /* Accents/focus */
  --accent-foreground: 0 0% 100%; /* Text on accent */
  --destructive: 0 84% 60%;       /* Errors/warnings */
  /* ... see globals.css for full list */
}
```

### Using Tokens in Components

```tsx
// ✅ Good - Uses theme tokens
<button className="bg-primary text-primary-foreground">
  Click me
</button>

// ❌ Bad - Hardcoded colors break theming
<button className="bg-blue-500 text-white">
  Click me
</button>
```

---

## Component Reference

### Button

Primary interactive element for actions.

#### Variants

```tsx
import { Button } from '@/components/ui/button';

// Primary (default)
<Button>Save Changes</Button>

// Secondary
<Button variant="secondary">Cancel</Button>

// Accent (call-to-action)
<Button variant="accent">Get Started</Button>

// Destructive (delete/remove actions)
<Button variant="destructive">Delete Account</Button>

// Ghost (subtle, text-like)
<Button variant="ghost">Learn More</Button>

// Link (no background, underline on hover)
<Button variant="link">View Details</Button>
```

#### Sizes

```tsx
// Small (32px height)
<Button size="sm">Small</Button>

// Medium (40px height, default)
<Button size="md">Medium</Button>

// Large (48px height)
<Button size="lg">Large</Button>

// Icon (square, 40px × 40px)
<Button size="icon">
  <TrashIcon className="h-4 w-4" />
</Button>
```

#### States

```tsx
// Disabled
<Button disabled>Loading...</Button>

// Loading with spinner
<Button disabled>
  <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
  Please wait
</Button>

// Full width
<Button className="w-full">Sign In</Button>
```

#### Accessibility

- Use `type="button"` (default), `type="submit"`, or `type="reset"` appropriately
- Add `aria-label` for icon-only buttons
- Provide clear, action-oriented text ("Delete post" not "Delete")

#### Do's and Don'ts

✅ **Do**:
- Use `primary` for main actions
- Use `destructive` for irreversible actions
- Include icons for clarity (`<TrashIcon />` + "Delete")

❌ **Don't**:
- Use more than one `primary` button per view
- Nest buttons inside links
- Use vague text ("Click here", "Submit")

---

### Card

Container for grouping related content.

#### Basic Usage

```tsx
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';

<Card>
  <CardHeader>
    <CardTitle>Project Name</CardTitle>
    <CardDescription>A brief description of the project</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Main content goes here.</p>
  </CardContent>
  <CardFooter>
    <Button>View Project</Button>
  </CardFooter>
</Card>
```

#### Variants

```tsx
// Elevated (subtle shadow, default)
<Card>Content</Card>

// Flat (no shadow)
<Card className="shadow-none">Content</Card>

// Bordered (visible border)
<Card className="border-2">Content</Card>

// Interactive (hover effect)
<Card className="hover:shadow-lg transition-shadow cursor-pointer">
  Clickable content
</Card>
```

#### Accessibility

- Use semantic HTML inside cards (`<article>`, `<section>`)
- If entire card is clickable, wrap in `<a>` or use `role="button"`

#### Do's and Don'ts

✅ **Do**:
- Group related information
- Use consistent card layouts
- Add subtle hover effects for interactive cards

❌ **Don't**:
- Nest cards deeply (max 2 levels)
- Mix elevated and flat cards in the same grid
- Use cards for single lines of text (use list items)

---

### Input

Text input field for forms.

#### Basic Usage

```tsx
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

<div>
  <Label htmlFor="email">Email</Label>
  <Input
    id="email"
    type="email"
    placeholder="you@example.com"
  />
</div>
```

#### Types

```tsx
// Text (default)
<Input type="text" placeholder="Enter name" />

// Email
<Input type="email" placeholder="you@example.com" />

// Password
<Input type="password" placeholder="••••••••" />

// Number
<Input type="number" min={0} max={100} />

// Search
<Input type="search" placeholder="Search..." />

// File
<Input type="file" accept="image/*" />
```

#### States

```tsx
// Disabled
<Input disabled value="Read-only" />

// Error
<Input
  className="border-destructive focus-visible:ring-destructive"
  aria-invalid="true"
  aria-describedby="error-message"
/>
<span id="error-message" className="text-sm text-destructive">
  Email is required
</span>

// With Icon
<div className="relative">
  <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
  <Input className="pl-10" placeholder="Search..." />
</div>
```

#### Accessibility

- Always pair with `<Label>`
- Use `aria-describedby` for hints and errors
- Mark required fields with `required` attribute

#### Do's and Don'ts

✅ **Do**:
- Provide clear labels
- Show inline validation errors
- Use appropriate `type` attributes

❌ **Don't**:
- Use placeholders as labels
- Hide error messages
- Make inputs too narrow (min 200px)

---

### Select

Dropdown for choosing from multiple options.

#### Basic Usage

```tsx
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

<Select>
  <SelectTrigger className="w-[180px]">
    <SelectValue placeholder="Select theme" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="aurora">Aurora</SelectItem>
    <SelectItem value="zen">Zen</SelectItem>
    <SelectItem value="terracotta">Terracotta</SelectItem>
    <SelectItem value="neon">Neon</SelectItem>
    <SelectItem value="opulence">Opulence</SelectItem>
    <SelectItem value="soft-pastel">Soft Pastel</SelectItem>
    <SelectItem value="comic">Comic</SelectItem>
    <SelectItem value="summit">Summit</SelectItem>
    <SelectItem value="velocity">Velocity</SelectItem>
    <SelectItem value="valor">Valor</SelectItem>
    <SelectItem value="vogue">Vogue</SelectItem>
    <SelectItem value="vitality">Vitality</SelectItem>
    <SelectItem value="sterling">Sterling</SelectItem>
    <SelectItem value="syntax">Syntax</SelectItem>
    <SelectItem value="nexus">Nexus</SelectItem>
    <SelectItem value="ember">Ember</SelectItem>
    <SelectItem value="prism">Prism</SelectItem>
  </SelectContent>
</Select>
```

#### With Labels and Groups

```tsx
<Select>
  <Label>Choose a theme</Label>
  <SelectTrigger>
    <SelectValue placeholder="Select..." />
  </SelectTrigger>
  <SelectContent>
    <SelectGroup>
      <SelectLabel>Light Themes</SelectLabel>
      <SelectItem value="aurora">Aurora</SelectItem>
      <SelectItem value="zen">Zen</SelectItem>
    </SelectGroup>
    <SelectGroup>
      <SelectLabel>Dark Themes</SelectLabel>
      <SelectItem value="neon">Neon</SelectItem>
      <SelectItem value="opulence">Opulence</SelectItem>
    </SelectGroup>
  </SelectContent>
</Select>
```

#### Accessibility

- Use `<Label>` to associate with select
- Keyboard navigation: Arrow keys, Enter to select, Esc to close

#### Do's and Don'ts

✅ **Do**:
- Limit options to < 15 (use search for larger lists)
- Use descriptive option text
- Group related options

❌ **Don't**:
- Use for binary choices (use toggle/switch)
- Nest multiple dropdowns
- Use tiny font sizes (min 14px)

---

### Badge

Small label for status, categories, or counts.

#### Variants

```tsx
import { Badge } from '@/components/ui/badge';

// Default
<Badge>New</Badge>

// Primary
<Badge variant="primary">Beta</Badge>

// Secondary (subtle)
<Badge variant="secondary">Draft</Badge>

// Accent
<Badge variant="accent">Featured</Badge>

// Destructive
<Badge variant="destructive">Error</Badge>

// Outline
<Badge variant="outline">Pending</Badge>
```

#### Sizes

```tsx
// Small
<Badge className="text-xs px-2 py-0.5">3</Badge>

// Medium (default)
<Badge>Verified</Badge>

// Large
<Badge className="text-sm px-3 py-1">Premium</Badge>
```

#### Accessibility

- Use `aria-label` if badge alone isn't descriptive:
  ```tsx
  <Badge aria-label="3 unread messages">3</Badge>
  ```

#### Do's and Don'ts

✅ **Do**:
- Use for status (Active, Completed, Failed)
- Show counts (5 new, 12 items)
- Indicate categories (Design, Code, Bug)

❌ **Don't**:
- Use for long text (use tags or chips)
- Make badges clickable (use buttons)
- Overuse colors (stick to semantic meanings)

---

### Alert

Contextual message for feedback or information.

#### Variants

```tsx
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { InfoIcon, CheckCircleIcon, AlertTriangleIcon, XCircleIcon } from 'lucide-react';

// Info (default)
<Alert>
  <InfoIcon className="h-4 w-4" />
  <AlertTitle>Heads up!</AlertTitle>
  <AlertDescription>
    You can add custom content here.
  </AlertDescription>
</Alert>

// Success
<Alert variant="success">
  <CheckCircleIcon className="h-4 w-4" />
  <AlertTitle>Success</AlertTitle>
  <AlertDescription>Your changes have been saved.</AlertDescription>
</Alert>

// Warning
<Alert variant="warning">
  <AlertTriangleIcon className="h-4 w-4" />
  <AlertTitle>Warning</AlertTitle>
  <AlertDescription>This action cannot be undone.</AlertDescription>
</Alert>

// Destructive
<Alert variant="destructive">
  <XCircleIcon className="h-4 w-4" />
  <AlertTitle>Error</AlertTitle>
  <AlertDescription>An unexpected error occurred.</AlertDescription>
</Alert>
```

#### Accessibility

- Use `role="alert"` for dynamic alerts (auto-added by component)
- For critical errors, use `aria-live="assertive"`

#### Do's and Don'ts

✅ **Do**:
- Use icons to reinforce meaning
- Provide actionable next steps
- Dismiss non-critical alerts after 5s

❌ **Don't**:
- Stack multiple alerts (show one at a time)
- Use for validation errors (use inline messages)
- Hide important alerts automatically

---

### Dialog

Modal overlay for focused tasks or confirmations.

#### Basic Usage

```tsx
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog';

<Dialog>
  <DialogTrigger asChild>
    <Button>Open Dialog</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Are you sure?</DialogTitle>
      <DialogDescription>
        This action cannot be undone.
      </DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <Button variant="secondary">Cancel</Button>
      <Button variant="destructive">Delete</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

#### Sizes

```tsx
// Small (400px)
<DialogContent className="sm:max-w-[400px]">...</DialogContent>

// Medium (500px, default)
<DialogContent className="sm:max-w-[500px]">...</DialogContent>

// Large (800px)
<DialogContent className="sm:max-w-[800px]">...</DialogContent>

// Full width
<DialogContent className="sm:max-w-full">...</DialogContent>
```

#### Accessibility

- Focus automatically moves to dialog on open
- Pressing `Esc` closes dialog
- Focus returns to trigger element on close
- Use `DialogTitle` for screen readers

#### Do's and Don'ts

✅ **Do**:
- Use for critical decisions (delete confirmation)
- Keep content focused (one task per dialog)
- Provide clear "Cancel" and "Confirm" actions

❌ **Don't**:
- Nest dialogs (max 1 open at a time)
- Use for complex forms (use separate pages)
- Auto-open on page load (poor UX)

---

### Dropdown Menu

Context menu for actions related to a specific element.

#### Basic Usage

```tsx
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="ghost" size="icon">
      <MoreVerticalIcon className="h-4 w-4" />
    </Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>Actions</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem>Edit</DropdownMenuItem>
    <DropdownMenuItem>Duplicate</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem className="text-destructive">
      Delete
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

#### With Icons and Shortcuts

```tsx
<DropdownMenuContent>
  <DropdownMenuItem>
    <EditIcon className="mr-2 h-4 w-4" />
    <span>Edit</span>
    <span className="ml-auto text-xs text-muted-foreground">⌘E</span>
  </DropdownMenuItem>
  <DropdownMenuItem>
    <CopyIcon className="mr-2 h-4 w-4" />
    <span>Duplicate</span>
    <span className="ml-auto text-xs">⌘D</span>
  </DropdownMenuItem>
</DropdownMenuContent>
```

#### Accessibility

- Keyboard: Arrow keys navigate, Enter selects, Esc closes
- Use `DropdownMenuLabel` for context

#### Do's and Don'ts

✅ **Do**:
- Group related actions
- Use icons for clarity
- Show keyboard shortcuts

❌ **Don't**:
- Include > 10 items (use submenu or separate page)
- Use for navigation (use nav links)
- Mix read-only and action items

---

## Custom Patterns

### Form with Validation

```tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const schema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Must be at least 8 characters'),
});

function LoginForm() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" {...register('email')} />
        {errors.email && (
          <span className="text-sm text-destructive">{errors.email.message}</span>
        )}
      </div>
      <Button type="submit">Sign In</Button>
    </form>
  );
}
```

### Loading States

```tsx
function DataTable() {
  const [loading, setLoading] = useState(true);

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-12">
          <Loader2Icon className="h-8 w-8 animate-spin text-muted-foreground" />
          <span className="ml-2">Loading...</span>
        </CardContent>
      </Card>
    );
  }

  return <Table>...</Table>;
}
```

### Empty States

```tsx
function EmptyState() {
  return (
    <Card>
      <CardContent className="flex flex-col items-center justify-center py-12">
        <InboxIcon className="h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-lg font-semibold mb-2">No projects yet</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Get started by creating your first project.
        </p>
        <Button>
          <PlusIcon className="mr-2 h-4 w-4" />
          Create Project
        </Button>
      </CardContent>
    </Card>
  );
}
```

---

## Accessibility

All components meet WCAG 2.1 AA requirements. See [design/accessibility.md](./accessibility.md) for full guidelines.

### Quick Checklist

- [ ] All interactive elements are keyboard accessible
- [ ] Focus indicators visible on all elements
- [ ] Color contrast ≥ 4.5:1 for text, ≥ 3:1 for UI components
- [ ] Forms have associated labels
- [ ] Error messages use `role="alert"`
- [ ] Dialogs trap focus and restore on close
- [ ] Icon-only buttons have `aria-label`

---

## Theme Testing

When modifying components, test across all 34 combinations (17 themes × 2 modes):

| Theme | Light Mode | Dark Mode |
|-------|------------|--------|
| Aurora | ✅ | ✅ |
| Zen | ✅ | ✅ |
| Terracotta | ✅ | ✅ |
| Neon | ✅ | ✅ |
| Opulence | ✅ | ✅ |
| Soft Pastel | ✅ | ✅ |
| Comic | ✅ | ✅ |
| Summit | ✅ | ✅ |
| Velocity | ✅ | ✅ |
| Valor | ✅ | ✅ |
| Vogue | ✅ | ✅ |
| Vitality | ✅ | ✅ |
| Sterling | ✅ | ✅ |
| Syntax | ✅ | ✅ |
| Nexus | ✅ | ✅ |
| Ember | ✅ | ✅ |
| Prism | ✅ | ✅ |

Use the demo app at `frontend/demo-app` to visually verify.

---

## Adding New Components

1. **Use shadcn CLI**:
   ```bash
   npx shadcn-ui@latest add <component-name>
   ```

2. **Customize**:
   - Replace hardcoded colors with theme tokens
   - Add theme-specific variants if needed
   - Test across all 10 theme/mode combinations

3. **Document**:
   - Add section to this file
   - Include examples, props, accessibility notes
   - Update [CHANGELOG.md](../CHANGELOG.md)

4. **Test**:
   - Add component tests to `testing/frontend/component/`
   - Verify keyboard navigation
   - Run `npm test` and `npm run test:e2e`

---

## Resources

- [shadcn/ui Documentation](https://ui.shadcn.com/)
- [Radix UI Primitives](https://www.radix-ui.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Accessibility Guidelines](./accessibility.md)
