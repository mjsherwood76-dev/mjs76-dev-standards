# Accessibility Standards

All projects following mjs76 Development Standards must meet **WCAG 2.1 Level AA** requirements at minimum.

## Table of Contents

- [Core Principles](#core-principles)
- [WCAG 2.1 AA Checklist](#wcag-21-aa-checklist)
- [Theme-Specific Considerations](#theme-specific-considerations)
- [Component Accessibility Patterns](#component-accessibility-patterns)
- [Testing Strategies](#testing-strategies)
- [Tools & Resources](#tools--resources)

---

## Core Principles

### 1. Perceivable
Information and UI components must be presentable to users in ways they can perceive.

### 2. Operable
UI components and navigation must be operable by all users.

###3. Understandable
Information and UI operation must be understandable.

### 4. Robust
Content must be robust enough to be interpreted by a wide variety of user agents, including assistive technologies.

---

## WCAG 2.1 AA Checklist

### Perceivable

#### 1.1 Text Alternatives
- [ ] All images have meaningful `alt` text
- [ ] Decorative images use `alt=""` or `role="presentation"`
- [ ] Icon-only buttons have `aria-label` or `aria-labelledby`
- [ ] Form inputs have associated `<label>` elements

#### 1.2 Time-Based Media
- [ ] Audio content has transcripts
- [ ] Video content has captions
- [ ] Audio descriptions provided for video (where applicable)

#### 1.3 Adaptable
- [ ] Semantic HTML used (`<header>`, `<nav>`, `<main>`, `<article>`, `<aside>`, `<footer>`)
- [ ] Heading hierarchy is logical (`<h1>` → `<h2>` → `<h3>`, no skips)
- [ ] Lists use proper markup (`<ul>`, `<ol>`, `<dl>`)
- [ ] Tables use `<th>` with `scope` attribute
- [ ] Form fields use `<fieldset>` and `<legend>` for groups

#### 1.4 Distinguishable
- [ ] **Color Contrast**: Text meets WCAG AA ratios
  - Normal text (< 24px): **4.5:1**
  - Large text (≥ 24px or ≥ 19px bold): **3:1**
  - UI components and graphics: **3:1**
- [ ] Color is not the only way to convey information
- [ ] Text can be resized up to 200% without loss of content
- [ ] Images of text avoided (use real text with CSS styling)
- [ ] No audio plays automatically for >3 seconds

### Operable

#### 2.1 Keyboard Accessible
- [ ] All functionality available via keyboard
- [ ] No keyboard traps (focus can move away from any element)
- [ ] Skip links provided (`Skip to main content`)
- [ ] Focus order is logical
- [ ] Shortcuts don't conflict with assistive tech

#### 2.2 Enough Time
- [ ] Users can turn off, adjust, or extend time limits
- [ ] Moving, blinking, or scrolling content can be paused
- [ ] Auto-updating content can be paused, stopped, or hidden

#### 2.3 Seizures and Physical Reactions
- [ ] No content flashes more than 3 times per second
- [ ] Motion effects can be disabled via `prefers-reduced-motion`

#### 2.4 Navigable
- [ ] Each page has a unique, descriptive `<title>`
- [ ] Focus order matches visual order
- [ ] Link purpose is clear from link text or context
- [ ] Multiple ways to find pages (navigation, search, sitemap)
- [ ] Headings and labels are descriptive
- [ ] Visible focus indicator on all interactive elements

#### 2.5 Input Modalities
- [ ] Touch targets are at least **24px × 24px** (prefer 44px × 44px)
- [ ] Functionality operable via pointer, keyboard, and touch
- [ ] No down-event activation (use click/up events)

### Understandable

#### 3.1 Readable
- [ ] Page language specified (`<html lang="en">`)
- [ ] Language changes marked (`<span lang="es">`)
- [ ] Jargon and unusual words defined

#### 3.2 Predictable
- [ ] Navigation is consistent across pages
- [ ] Components behave consistently
- [ ] No change of context on focus (auto-submit avoided)
- [ ] No change of context on input unless user is warned

#### 3.3 Input Assistance
- [ ] Error messages are clear and specific
- [ ] Labels or instructions provided for user input
- [ ] Error suggestions provided when possible
- [ ] Forms allow review and correction before submission
- [ ] Required fields clearly marked

### Robust

#### 4.1 Compatible
- [ ] HTML is valid (no duplicate IDs, proper nesting)
- [ ] Name, role, and value determinable for UI components
- [ ] Status messages use `role="status"` or `aria-live`

---

## Theme-Specific Considerations

All 5 themes must maintain accessibility across light/dark modes.

### Color Contrast Validation

Use tools to verify contrast ratios for each theme:

| Theme | Light Mode | Dark Mode | Notes |
|-------|------------|-----------|-------|
| **Default (Aurora)** | Primary: `#3B7EED` on white | Primary: `#5B9BFF` on `#1C2532` | Verify accent green meets 3:1 for UI elements |
| **Minimalist (Zen)** | Primary: `#3A4250` on white | Primary: `#E5E7EB` on `#1A1D23` | High contrast by design |
| **Earthy (Terracotta)** | Primary: `#4A7257` on `#F5F0EA` | Primary: `#6FA87E` on `#1F221E` | Warm tones must still hit 4.5:1 for body text |
| **Cyber-Noir (Neon)** | Primary: `#7C3AED` on white | Primary: `#A78BFA` on `#1C1540` | Neon accents (`#00FFCC`) for decoration only, not text |
| **Luxury (Opulence)** | Primary: `#5A3E6E` on `#FAF8F4` | Primary: `#8B6FA8` on `#1A1225` | Gold accents must meet 3:1 for icons/borders |

**Testing Command**:
```bash
npx @axe-core/cli http://localhost:3000 --tags wcag2aa
```

### Focus Indicators

Each theme provides a `--accent` token for focus rings:

```css
:focus-visible {
  outline: 2px solid hsl(var(--accent));
  outline-offset: 2px;
}
```

If accent contrast < 3:1 against background, fall back to `--info` token.

### Motion & Animation

Respect `prefers-reduced-motion`:

```css
@media (prefers-reduced-motion: reduce) {
  * {
    --motion-duration-fast: 0ms !important;
    --motion-duration-base: 0ms !important;
    --motion-duration-slow: 0ms !important;
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Component Accessibility Patterns

### Buttons

```tsx
// ✅ Good
<button type="button" onClick={handleClick}>
  Save Changes
</button>

// ✅ Icon button with label
<button type="button" aria-label="Close dialog" onClick={onClose}>
  <XIcon />
</button>

// ❌ Bad - no accessible name
<button type="button">
  <XIcon />
</button>
```

### Links

```tsx
// ✅ Good - descriptive
<a href="/docs/themes">Learn about themes</a>

// ⚠️ Acceptable with context
<p>
  See our theming documentation.
  <a href="/docs/themes">Read more</a>
</p>

// ❌ Bad - ambiguous
<a href="/docs/themes">Click here</a>
```

### Form Inputs

```tsx
// ✅ Good
<label htmlFor="email">Email address</label>
<input
  id="email"
  type="email"
  required
  aria-describedby="email-hint email-error"
/>
<span id="email-hint">We'll never share your email.</span>
{error && <span id="email-error" role="alert">{error}</span>}

// ❌ Bad - no label
<input type="email" placeholder="Email" />
```

### Modals/Dialogs

```tsx
<div
  role="dialog"
  aria-labelledby="dialog-title"
  aria-modal="true"
>
  <h2 id="dialog-title">Confirm deletion</h2>
  <p>This action cannot be undone.</p>
  <button onClick={onConfirm}>Delete</button>
  <button onClick={onCancel}>Cancel</button>
</div>
```

**Requirements**:
- Trap focus inside dialog
- Restore focus to trigger element on close
- Close on `Esc` key
- First focusable element receives focus on open

### Loading States

```tsx
<button disabled aria-busy="true">
  <span className="sr-only">Loading...</span>
  <SpinnerIcon aria-hidden="true" />
</button>

// Or with live region
<div aria-live="polite" aria-atomic="true">
  {isLoading ? 'Loading content...' : 'Content loaded'}
</div>
```

### Error Messages

```tsx
<div role="alert" aria-live="assertive">
  <strong>Error:</strong> Please enter a valid email address.
</div>
```

---

## Testing Strategies

### Automated Testing

#### Axe DevTools
```bash
npm install -D @axe-core/cli

# Test single page
npx @axe-core/cli http://localhost:3000 --exit

# Test with specific tags
npx @axe-core/cli http://localhost:3000 --tags wcag2aa,best-practice
```

#### Playwright Accessibility Tests
```typescript
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('should not have accessibility violations', async ({ page }) => {
  await page.goto('http://localhost:3000');

  const accessibilityScanResults = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa'])
    .analyze();

  expect(accessibilityScanResults.violations).toEqual([]);
});
```

### Manual Testing

#### Keyboard Navigation Checklist
- [ ] Tab through all interactive elements in logical order
- [ ] Shift+Tab moves focus backward
- [ ] Enter/Space activates buttons and links
- [ ] Arrow keys work in dropdowns, radio groups, tabs
- [ ] Esc closes modals and dismisses overlays
- [ ] Skip links allow bypassing navigation

#### Screen Reader Testing

**Recommended Tools**:
- **NVDA** (Windows, free)
- **JAWS** (Windows, paid)
- **VoiceOver** (macOS/iOS, built-in)
- **TalkBack** (Android, built-in)

**Test Scenarios**:
1. Navigate by headings (`H` key in NVDA/JAWS)
2. Navigate by landmarks (`D` key)
3. Read form labels and error messages
4. Verify button/link purpose is clear
5. Test live regions announce dynamically

#### Color Contrast Tools
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- Chrome DevTools: Inspect > Color picker shows contrast ratio
- [Colour Contrast Analyser](https://www.tpgi.com/color-contrast-checker/) (CCA)

#### Zoom Testing
- Test at 200% zoom (browser zoom, not OS zoom)
- Verify no horizontal scrolling (unless intentional)
- Confirm all text remains readable
- Check that UI controls don't overlap

---

## Tools & Resources

### Browser Extensions
- [axe DevTools](https://www.deque.com/axe/devtools/) - Free a11y testing
- [WAVE](https://wave.webaim.org/extension/) - Visual feedback on accessibility
- [Lighthouse](https://developers.google.com/web/tools/lighthouse) - Built into Chrome DevTools

### Checklists
- [WebAIM WCAG 2 Checklist](https://webaim.org/standards/wcag/checklist)
- [A11y Project Checklist](https://www.a11yproject.com/checklist/)

### Learning Resources
- [MDN Web Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
- [Web.dev Accessibility](https://web.dev/learn/accessibility/)
- [Inclusive Components](https://inclusive-components.design/)

### Testing Services
- [Pa11y](https://pa11y.org/) - Automated a11y testing CLI
- [Axe-core](https://github.com/dequelabs/axe-core) - A11y testing engine

---

## Quick Wins

Start with these high-impact, low-effort improvements:

1. **Add alt text** to all images
2. **Use semantic HTML** (`<button>` not `<div onclick>`)
3. **Associate labels** with form inputs
4. **Add focus indicators** to all interactive elements
5. **Test keyboard navigation** on every page
6. **Verify color contrast** for all text
7. **Add skip links** to main content
8. **Use `aria-live`** for dynamic updates
9. **Test with screen reader** at least once
10. **Run axe DevTools** on every major component

---

## Enforcement

All pull requests affecting UI must:
- [ ] Pass automated axe-core tests
- [ ] Include keyboard navigation verification
- [ ] Maintain WCAG AA contrast ratios
- [ ] Update this document if new patterns are introduced

Accessibility is not optional—it's a core requirement of the mjs76 Development Standards.
