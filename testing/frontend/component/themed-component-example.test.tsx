import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

/**
 * Example: Testing a themed Button component
 * 
 * This demonstrates testing components that rely on design tokens and themes.
 * Tests should verify behavior across different theme contexts.
 */

import React from 'react';

// Example Button component using token-based styling
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'accent' | 'destructive' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  'aria-label'?: string;
}

function Button({
  variant = 'primary',
  size = 'md',
  disabled = false,
  children,
  onClick,
  type = 'button',
  'aria-label': ariaLabel,
}: ButtonProps) {
  // Token-based classes (from Tailwind + design system)
  const baseClasses = 'inline-flex items-center justify-center rounded-[--button-radius] font-[--button-font-weight] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:opacity-60 disabled:pointer-events-none';

  const variantClasses = {
    primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
    accent: 'bg-accent text-accent-foreground hover:bg-accent/90',
    destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
    ghost: 'hover:bg-accent hover:text-accent-foreground',
  };

  const sizeClasses = {
    sm: 'h-8 px-3 text-sm',
    md: 'h-10 px-4 text-base',
    lg: 'h-12 px-6 text-lg',
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]}`;

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={classes}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}

// ============================================================================
// TESTS
// ============================================================================

describe('Button Component', () => {
  // Basic rendering
  it('should render with children text', () => {
    render(<Button>Click me</Button>);

    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
  });

  it('should render with aria-label when provided', () => {
    render(<Button aria-label="Custom label">Icon only</Button>);

    expect(screen.getByRole('button', { name: /custom label/i })).toBeInTheDocument();
  });

  // Variants
  it('should apply primary variant classes by default', () => {
    render(<Button>Primary</Button>);

    const button = screen.getByRole('button');
    expect(button.className).toContain('bg-primary');
    expect(button.className).toContain('text-primary-foreground');
  });

  it('should apply secondary variant classes when specified', () => {
    render(<Button variant="secondary">Secondary</Button>);

    const button = screen.getByRole('button');
    expect(button.className).toContain('bg-secondary');
  });

  it('should apply destructive variant classes when specified', () => {
    render(<Button variant="destructive">Delete</Button>);

    const button = screen.getByRole('button');
    expect(button.className).toContain('bg-destructive');
  });

  // Sizes
  it('should apply medium size classes by default', () => {
    render(<Button>Medium</Button>);

    const button = screen.getByRole('button');
    expect(button.className).toContain('h-10');
    expect(button.className).toContain('px-4');
  });

  it('should apply small size classes when specified', () => {
    render(<Button size="sm">Small</Button>);

    const button = screen.getByRole('button');
    expect(button.className).toContain('h-8');
    expect(button.className).toContain('px-3');
  });

  it('should apply large size classes when specified', () => {
    render(<Button size="lg">Large</Button>);

    const button = screen.getByRole('button');
    expect(button.className).toContain('h-12');
    expect(button.className).toContain('px-6');
  });

  // Disabled state
  it('should be disabled when disabled prop is true', () => {
    render(<Button disabled>Disabled</Button>);

    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  it('should have disabled opacity class when disabled', () => {
    render(<Button disabled>Disabled</Button>);

    const button = screen.getByRole('button');
    expect(button.className).toContain('disabled:opacity-60');
  });

  it('should not trigger onClick when disabled', async () => {
    const handleClick = vi.fn();
    render(<Button disabled onClick={handleClick}>Disabled</Button>);

    const user = userEvent.setup();
    const button = screen.getByRole('button');

    await user.click(button);

    expect(handleClick).not.toHaveBeenCalled();
  });

  // Interactions
  it('should call onClick handler when clicked', async () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);

    const user = userEvent.setup();
    const button = screen.getByRole('button');

    await user.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should be keyboard accessible', async () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Press me</Button>);

    const user = userEvent.setup();
    const button = screen.getByRole('button');

    button.focus();
    expect(button).toHaveFocus();

    await user.keyboard('{Enter}');
    expect(handleClick).toHaveBeenCalledTimes(1);

    await user.keyboard(' ');
    expect(handleClick).toHaveBeenCalledTimes(2);
  });

  // Type attribute
  it('should default to button type', () => {
    render(<Button>Button</Button>);

    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('type', 'button');
  });

  it('should accept submit type', () => {
    render(<Button type="submit">Submit</Button>);

    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('type', 'submit');
  });

  // Accessibility
  it('should have focus ring classes for keyboard navigation', () => {
    render(<Button>Accessible</Button>);

    const button = screen.getByRole('button');
    expect(button.className).toContain('focus-visible:ring-2');
    expect(button.className).toContain('focus-visible:ring-accent');
  });
});

// ============================================================================
// Theme-Specific Tests
// ============================================================================

/**
 * For testing theme-specific behavior, wrap components in theme providers
 * or set data-theme on document root in test setup.
 */

describe('Button Component - Theme Integration', () => {
  it('should work with different themes (integration test)', () => {
    // This would typically use a theme provider wrapper
    // For example with next-themes:
    // render(<ThemeProvider><Button>Themed</Button></ThemeProvider>)

    // In a real project, you might test computed styles or use visual regression
    render(<Button>Theme-aware button</Button>);

    const button = screen.getByRole('button');

    // The button should use token-based classes that respond to theme
    expect(button.className).toContain('bg-primary');
    expect(button.className).toContain('text-primary-foreground');

    // These classes get their actual colors from CSS variables
    // which change based on data-theme attribute on <html>
  });
});

/**
 * Key Component Testing Patterns:
 * 
 * 1. **Semantic Queries**: Use getByRole, getByLabelText, etc. (not getByClassName)
 * 2. **User Interactions**: Use @testing-library/user-event for realistic events
 * 3. **Accessibility**: Verify ARIA attributes, keyboard navigation, focus management
 * 4. **Token-Based Styling**: Verify semantic class names, not specific colors
 * 5. **States**: Test all states (default, hover, disabled, loading, etc.)
 * 6. **Variants**: Test all prop combinations that affect appearance/behavior
 * 
 * For visual/theme testing, consider:
 * - Storybook with Chromatic for visual regression
 * - Playwright screenshots comparing themes
 * - Computed style assertions for critical properties
 * 
 * Setup:
 * ```bash
 * npm install -D @testing-library/react @testing-library/user-event vitest jsdom
 * ```
 * 
 * Vitest config (vitest.config.ts):
 * ```typescript
 * import { defineConfig } from 'vitest/config';
 * 
 * export default defineConfig({
 *   test: {
 *     environment: 'jsdom',
 *     setupFiles: ['./testing/shared/setup.ts'],
 *   },
 * });
 * ```
 * 
 * To Run:
 * ```bash
 * npx vitest testing/frontend/component/themed-component-example.test.tsx
 * ```
 */
