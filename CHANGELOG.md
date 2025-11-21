# Changelog

All notable changes to the mjs76 Development Standards will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.1.0] - 2025-01-XX

### Added
- **Repository Governance**
  - MIT LICENSE for open source usage
  - CONTRIBUTING.md with submission guidelines and development workflow
  - CODE_OF_CONDUCT.md (Contributor Covenant v2.1)
  - GitHub issue templates (Bug Report, Feature Request, Documentation)
  - Pull request template with comprehensive checklist
  
- **Testing Infrastructure**
  - Seven comprehensive test examples covering unit, integration, and E2E patterns
  - Vitest configuration with @cloudflare/vitest-pool-workers
  - React Testing Library setup for component testing
  - Playwright configuration for E2E testing
  - API mocking patterns and accessibility testing examples
  - GitHub Actions workflow for automated testing (test.yml)
  
- **CI/CD Automation**
  - Continuous integration workflow (test.yml) with Node.js 20, linting, type checking, unit/integration tests
  - Deployment workflow (deploy.yml) for Cloudflare Pages with preview/production environments
  - Environment-specific secrets management
  
- **Backend Security Standards**
  - Comprehensive security documentation in backend/security/
  - Configuration management best practices (environment variables, runtime config)
  - Secrets management patterns (local dev, Cloudflare secrets, rotation)
  - Authentication implementation examples (JWT, session-based, OAuth2)
  - Input validation, CORS, rate limiting, and SQL injection prevention
  
- **Accessibility Documentation**
  - Complete WCAG 2.1 Level AA guidelines in frontend/accessibility/
  - Semantic HTML patterns and ARIA usage
  - Keyboard navigation, focus management, screen reader optimization
  - Color contrast requirements and testing tools
  - Comprehensive accessibility testing checklist
  
- **Component Library Documentation**
  - shadcn/ui component reference in frontend/components/
  - Implementation examples for Button, Card, Input, Select, Dialog, Toast
  - Accessibility features and keyboard interactions per component
  - Theme integration patterns
  
- **Performance Guidelines**
  - Core Web Vitals targets in frontend/performance/
  - Bundle size budgets (First Load JS < 200KB, Route chunks < 50KB)
  - Optimization strategies (code splitting, image optimization, React best practices)
  - Monitoring and measurement tools
  
- **Project Template Starter Kit**
  - Complete Next.js 14 + Cloudflare project template in templates/nextjs-cloudflare/
  - All five themes pre-configured (Aurora, Zen, Terracotta, Neon, Opulence) with light/dark modes
  - shadcn/ui components included (Button, Card, Input, Select)
  - ThemeProvider and ThemeSwitcher components
  - Cloudflare Worker with CORS, health check, and example API endpoint
  - Complete configuration files (TypeScript, Tailwind, ESLint, Prettier, Wrangler)
  - Node.js initialization script (scripts/init.js) for project scaffolding
  - Comprehensive template documentation in templates/README.md

### Changed
- Next.js dependency upgraded to 14.2.33 (security patch for CVE-2024-46982 and CVE-2024-50339)
- Improved demo-app package.json with updated dependencies and comprehensive scripts

### Fixed
- Critical server-side request forgery (SSRF) vulnerabilities in Next.js
- Experimental Server Actions security issues

## [1.0.0] - 2025-11-20

### Added
- Initial release of mjs76 Development Standards
- Five-theme design system (Default/Aurora, Minimalist/Zen, Earthy/Terracotta, Cyber-Noir/Neon, Luxury/Opulence)
- Comprehensive UI standards with token-based styling
- Backend instructions for Cloudflare stack (Workers/Pages/D1/KV/R2/Queues)
- Frontend instructions for Next.js + React + TypeScript + Tailwind
- Global Copilot instructions for AI-assisted development
- AI Agent framework (Planning, Implementation, Testing agents)
- Static demo showcase (HTML/CSS/JS)
- Interactive Next.js demo application with theme switcher
- Typography, spacing, motion, and iconography specifications per theme
- Component primitives and state guidelines
- Interaction and accessibility standards

### Design System Tokens
- Color tokens: background, foreground, primary, secondary, accent, muted, border, destructive, success, warning, info (with foreground pairs)
- Radius tokens: lg, md, sm (plus component-specific button-radius, card-radius)
- Typography tokens: font-sans, font-heading, font-mono (per theme)
- Spatial tokens: control-height, stack-gap, section-gap
- Motion tokens: duration-fast/base/slow, ease, ease-emphasis
- Icon tokens: stroke, corner

## Version Guidelines

### Major Version (X.0.0)
Breaking changes that require project migration:
- Token removals or renames
- Theme structure changes
- Component API breaking changes
- Stack requirement changes (e.g., Next.js major version bump)

### Minor Version (0.X.0)
Backward-compatible additions:
- New themes
- Additional tokens (with fallbacks)
- New components or utilities
- Enhanced documentation
- New agent capabilities

### Patch Version (0.0.X)
Backward-compatible fixes:
- Token value adjustments (color refinements, spacing tweaks)
- Documentation clarifications
- Bug fixes in demo applications
- Dependency security updates

## Migration Guides

### Upgrading from Pre-1.0 Projects
If your project was created before these standards:

1. **Audit Current Tokens**: Compare your CSS variables against Section 4 of `design/ui-standards.md`
2. **Update Tailwind Config**: Match the pattern in Section 3
3. **Migrate Components**: Replace hardcoded colors/radii with token-based classes
4. **Add Theme Attributes**: Ensure `<html>` has `data-theme` and `data-mode` attributes
5. **Install Required Packages**: `next-themes`, `tailwindcss-animate`
6. **Test All Themes**: Verify UI works across all 5 themes and light/dark modes

[Unreleased]: https://github.com/mjsherwood76-dev/mjs76-dev-standards/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/mjsherwood76-dev/mjs76-dev-standards/releases/tag/v1.0.0
