import { test, expect, Page } from '@playwright/test';

/**
 * Example: E2E test for theme switching functionality
 * 
 * This demonstrates end-to-end testing with Playwright, including:
 * - User interactions across pages
 * - Visual verification of theme changes
 * - State persistence (localStorage)
 * - Accessibility checks
 */

// Helper to wait for theme to be applied
async function waitForThemeApplied(page: Page, theme: string, mode: 'light' | 'dark') {
  await page.waitForFunction(
    ({ expectedTheme, expectedMode }) => {
      const root = document.documentElement;
      const actualTheme = root.dataset.theme;
      const actualMode = root.classList.contains('dark') ? 'dark' : 'light';
      return actualTheme === expectedTheme && actualMode === expectedMode;
    },
    { expectedTheme: theme, expectedMode: mode }
  );
}

test.describe('Theme Switching', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to demo app
    await page.goto('http://localhost:3000');
  });

  test('should display theme controls on page load', async ({ page }) => {
    // Verify control panel is visible
    await expect(page.getByRole('heading', { name: /theme controls/i })).toBeVisible();

    // Verify all theme options are present
    await expect(page.getByRole('radio', { name: /aurora/i })).toBeVisible();
    await expect(page.getByRole('radio', { name: /zen/i })).toBeVisible();
    await expect(page.getByRole('radio', { name: /terracotta/i })).toBeVisible();
    await expect(page.getByRole('radio', { name: /neon/i })).toBeVisible();
    await expect(page.getByRole('radio', { name: /opulence/i })).toBeVisible();

    // Verify mode toggle
    await expect(page.getByRole('button', { name: /light|dark/i })).toBeVisible();
  });

  test('should switch from light to dark mode', async ({ page }) => {
    // Initial state should be light mode
    await expect(page.locator('html')).not.toHaveClass(/dark/);

    // Click dark mode toggle
    await page.getByRole('button', { name: /toggle.*mode/i }).click();

    // Verify dark mode applied
    await expect(page.locator('html')).toHaveClass(/dark/);

    // Verify background color changed (computed style)
    const bgColor = await page.locator('body').evaluate((el) => {
      return window.getComputedStyle(el).backgroundColor;
    });

    // Dark mode should have darker background (this is a basic check)
    expect(bgColor).not.toBe('rgb(255, 255, 255)');
  });

  test('should switch between themes', async ({ page }) => {
    // Start with default theme
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'default');

    // Switch to Minimalist (Zen)
    await page.getByRole('radio', { name: /zen/i }).click();
    await waitForThemeApplied(page, 'minimalist', 'light');

    // Verify theme attribute changed
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'minimalist');

    // Switch to Cyber-Noir (Neon)
    await page.getByRole('radio', { name: /neon/i }).click();
    await waitForThemeApplied(page, 'cyber-noir', 'light');

    await expect(page.locator('html')).toHaveAttribute('data-theme', 'cyber-noir');
  });

  test('should persist theme selection in localStorage', async ({ page }) => {
    // Select a specific theme
    await page.getByRole('radio', { name: /luxury|opulence/i }).click();
    await waitForThemeApplied(page, 'luxury', 'light');

    // Reload page
    await page.reload();

    // Theme should be restored from localStorage
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'luxury');
  });

  test('should update button styles when theme changes', async ({ page }) => {
    // Get a button element
    const primaryButton = page.getByRole('button', { name: /primary button/i }).first();

    // Capture initial button styles
    const initialBgColor = await primaryButton.evaluate((el) => {
      return window.getComputedStyle(el).backgroundColor;
    });

    // Switch to a different theme
    await page.getByRole('radio', { name: /earthy|terracotta/i }).click();
    await waitForThemeApplied(page, 'earthy', 'light');

    // Button background should change (different theme = different primary color)
    const newBgColor = await primaryButton.evaluate((el) => {
      return window.getComputedStyle(el).backgroundColor;
    });

    expect(newBgColor).not.toBe(initialBgColor);
  });

  test('should maintain accessibility when switching themes', async ({ page }) => {
    // Check initial accessibility
    await expect(page.getByRole('main')).toBeVisible();

    const themes = ['minimalist', 'earthy', 'cyber-noir', 'luxury'];

    for (const theme of themes) {
      // Switch theme
      await page.getByRole('radio', { name: new RegExp(theme, 'i') }).click();

      // Verify all interactive elements remain accessible
      await expect(page.getByRole('button').first()).toBeVisible();
      await expect(page.getByRole('radio').first()).toBeVisible();

      // Verify focus is still visible (keyboard navigation)
      await page.keyboard.press('Tab');
      const focusedElement = await page.evaluate(() => document.activeElement?.tagName);
      expect(focusedElement).toBeTruthy();
    }
  });

  test('should render all component examples correctly', async ({ page }) => {
    // Verify key sections are present
    await expect(page.getByRole('heading', { name: /buttons/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /cards/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /forms/i })).toBeVisible();

    // Verify components render
    await expect(page.getByRole('button')).toHaveCount(await page.getByRole('button').count());
    expect(await page.getByRole('button').count()).toBeGreaterThan(5);

    // Verify inputs are functional
    const textInput = page.getByRole('textbox').first();
    await textInput.fill('Test input');
    await expect(textInput).toHaveValue('Test input');
  });

  test('should handle rapid theme switching without errors', async ({ page }) => {
    // Rapidly switch between themes
    const themes = ['minimalist', 'earthy', 'cyber-noir', 'luxury', 'default'];

    for (let i = 0; i < 3; i++) {
      for (const theme of themes) {
        await page.getByRole('radio', { name: new RegExp(theme, 'i') }).click();
        // Small delay to allow CSS transitions
        await page.waitForTimeout(50);
      }
    }

    // Page should still be functional
    await expect(page.getByRole('heading').first()).toBeVisible();
    await expect(page.getByRole('button').first()).toBeEnabled();
  });
});

test.describe('Theme + Mode Combinations', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
  });

  test('should test all theme/mode combinations', async ({ page }) => {
    const themes = [
      { value: 'default', label: /aurora/i },
      { value: 'minimalist', label: /zen/i },
      { value: 'earthy', label: /terracotta/i },
      { value: 'cyber-noir', label: /neon/i },
      { value: 'luxury', label: /opulence/i },
    ];

    const modes: Array<'light' | 'dark'> = ['light', 'dark'];

    for (const theme of themes) {
      for (const mode of modes) {
        // Select theme
        await page.getByRole('radio', { name: theme.label }).click();

        // Set mode
        const currentMode = await page.locator('html').evaluate((el) => {
          return el.classList.contains('dark') ? 'dark' : 'light';
        });

        if (currentMode !== mode) {
          await page.getByRole('button', { name: /toggle.*mode/i }).click();
        }

        await waitForThemeApplied(page, theme.value, mode);

        // Take screenshot for visual regression (optional)
        await page.screenshot({
          path: `screenshots/${theme.value}-${mode}.png`,
          fullPage: true,
        });

        // Verify theme and mode are applied
        await expect(page.locator('html')).toHaveAttribute('data-theme', theme.value);

        if (mode === 'dark') {
          await expect(page.locator('html')).toHaveClass(/dark/);
        } else {
          await expect(page.locator('html')).not.toHaveClass(/dark/);
        }

        // Basic contrast check: background and foreground should be different
        const bgColor = await page.locator('body').evaluate((el) => {
          return window.getComputedStyle(el).backgroundColor;
        });
        const textColor = await page.locator('body').evaluate((el) => {
          return window.getComputedStyle(el).color;
        });

        expect(bgColor).not.toBe(textColor);
      }
    }
  });
});

test.describe('Responsive Theme Behavior', () => {
  test('should work correctly on mobile viewport', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('http://localhost:3000');

    // Theme controls should still be accessible
    await expect(page.getByRole('radio', { name: /aurora/i })).toBeVisible();

    // Switch theme on mobile
    await page.getByRole('radio', { name: /zen/i }).click();
    await waitForThemeApplied(page, 'minimalist', 'light');

    await expect(page.locator('html')).toHaveAttribute('data-theme', 'minimalist');

    // Verify layout is still functional
    await expect(page.getByRole('button').first()).toBeVisible();
  });

  test('should work correctly on desktop viewport', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('http://localhost:3000');

    await expect(page.getByRole('radio', { name: /aurora/i })).toBeVisible();
  });
});

/**
 * E2E Testing Best Practices:
 * 
 * 1. **User-Centric Queries**: Use roles, labels, and accessible selectors
 * 2. **Wait for State**: Use waitForFunction for dynamic content
 * 3. **Visual Regression**: Take screenshots for before/after comparison
 * 4. **Isolation**: Each test should be independent
 * 5. **Real User Flows**: Test complete journeys, not just individual actions
 * 6. **Cross-Browser**: Run tests on Chromium, Firefox, and WebKit
 * 
 * Setup (playwright.config.ts):
 * ```typescript
 * import { defineConfig, devices } from '@playwright/test';
 * 
 * export default defineConfig({
 *   testDir: './testing/frontend/e2e',
 *   fullyParallel: true,
 *   forbidOnly: !!process.env.CI,
 *   retries: process.env.CI ? 2 : 0,
 *   use: {
 *     baseURL: 'http://localhost:3000',
 *     trace: 'on-first-retry',
 *   },
 *   projects: [
 *     { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
 *     { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
 *     { name: 'webkit', use: { ...devices['Desktop Safari'] } },
 *     { name: 'mobile', use: { ...devices['iPhone 12'] } },
 *   ],
 *   webServer: {
 *     command: 'npm run dev',
 *     url: 'http://localhost:3000',
 *     reuseExistingServer: !process.env.CI,
 *   },
 * });
 * ```
 * 
 * To Run:
 * ```bash
 * npx playwright test testing/frontend/e2e/theme-switching-example.spec.ts
 * 
 * # With UI mode
 * npx playwright test --ui
 * 
 * # Generate screenshots
 * npx playwright test --update-snapshots
 * ```
 */
