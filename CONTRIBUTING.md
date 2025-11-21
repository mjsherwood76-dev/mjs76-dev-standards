# Contributing to mjs76 Development Standards

Thank you for your interest in contributing to the mjs76 Development Standards! This repository serves as the single source of truth for engineering and design patterns across all mjs76 projects.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Process](#development-process)
- [Coding Standards](#coding-standards)
- [Submitting Changes](#submitting-changes)

## Code of Conduct

This project adheres to a Code of Conduct that all contributors are expected to follow. Please read [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) before contributing.

## How Can I Contribute?

### Reporting Issues

- **Design System Bugs**: Inconsistencies in tokens, theme rendering issues
- **Documentation Gaps**: Missing or unclear instructions
- **Accessibility Issues**: WCAG violations or a11y concerns
- **Security Concerns**: Potential security vulnerabilities (please report privately via email first)

When reporting issues:
1. Use the appropriate issue template
2. Include reproduction steps for bugs
3. Specify affected themes/modes if UI-related
4. Reference relevant documentation sections

### Suggesting Enhancements

- **New Themes**: Proposals for additional visual styles
- **Component Additions**: New UI primitives or patterns
- **Token Extensions**: Additional design tokens
- **Documentation Improvements**: Clarity, examples, diagrams

Enhancement proposals should:
1. Explain the use case clearly
2. Show how it fits with existing standards
3. Consider impact on all 17 themes
4. Maintain backward compatibility where possible

### Pull Requests

We welcome pull requests for:
- Bug fixes
- Documentation improvements
- New examples or patterns
- Theme refinements
- Accessibility improvements

## Development Process

### 1. Fork & Clone

```bash
git clone https://github.com/mjsherwood76-dev/mjs76-dev-standards.git
cd mjs76-dev-standards
```

### 2. Create a Feature Branch

```bash
git checkout -b feature/your-feature-name
```

Branch naming conventions:
- `feature/` - New capabilities or components
- `fix/` - Bug fixes
- `docs/` - Documentation only changes
- `theme/` - Theme-specific adjustments
- `refactor/` - Code restructuring without behavior changes

### 3. Make Changes

Follow these guidelines:

#### For Design System Changes

- Update token definitions in `design/ui-standards.md`
- Update narrative guidance in `design/themes.md`
- Apply changes to demo application (`frontend/demo-app`)
- Test across **all 17 themes** and **light/dark modes**
- Verify WCAG AA contrast ratios

#### For Documentation Changes

- Follow existing markdown formatting
- Use code fences with language identifiers
- Include examples where applicable
- Update table of contents if adding sections

#### For Code Examples

- Use TypeScript throughout
- Follow ESLint/Prettier configurations
- Include inline comments for complex logic
- Provide usage examples

### 4. Test Your Changes

#### Visual Testing
```bash
cd frontend/demo-app
npm install
npm run dev
```

Test matrix:
- [ ] Default (Aurora) - Light & Dark
- [ ] Minimalist (Zen) - Light & Dark
- [ ] Earthy (Terracotta) - Light & Dark
- [ ] Cyber-Noir (Neon) - Light & Dark
- [ ] Luxury (Opulence) - Light & Dark
- [ ] Mobile viewport (375px)
- [ ] Tablet viewport (768px)
- [ ] Desktop viewport (1440px)

#### Accessibility Testing
- [ ] Keyboard navigation works
- [ ] Focus indicators are visible
- [ ] Color contrast meets WCAG AA
- [ ] Screen reader labels are present

### 5. Commit Your Changes

Follow conventional commit format:

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

Types:
- `feat`: New feature or enhancement
- `fix`: Bug fix
- `docs`: Documentation only
- `style`: Token/styling adjustments
- `refactor`: Code restructuring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

Examples:
```
feat(tokens): add focus-ring-width token for theme customization

docs(accessibility): add keyboard navigation patterns

fix(themes): correct luxury dark mode primary contrast ratio

style(earthy): adjust card-shadow for better elevation perception
```

### 6. Update CHANGELOG.md

Add your changes under `[Unreleased]` section:

```markdown
## [Unreleased]

### Added
- New focus-ring-width token for customizable focus indicators

### Fixed
- Luxury dark mode primary color contrast now meets WCAG AA
```

## Coding Standards

### TypeScript

- Use strict mode
- Avoid `any` types
- Export types alongside implementations
- Use functional components (React)

### CSS/Tailwind

- Never hardcode colors, radii, or fonts
- Use semantic token classes: `bg-background`, `text-primary`, etc.
- Follow 4px grid for spacing
- Use CSS variables from theme files

### React Components

- Functional components with hooks
- Props should have TypeScript interfaces
- Use semantic HTML elements
- Include `aria-*` attributes where needed

### Documentation

- Write in clear, concise English
- Use markdown tables for structured data
- Include code examples with syntax highlighting
- Link to related sections when referencing other standards

## Submitting Changes

### Pull Request Process

1. **Update Documentation**: Ensure all affected docs are updated
2. **Self-Review**: Check your own PR for obvious issues
3. **Fill Out PR Template**: Provide complete context
4. **Link Related Issues**: Reference any related issue numbers
5. **Request Review**: Tag appropriate reviewers

### PR Checklist

- [ ] Changes follow existing coding standards
- [ ] Documentation is updated
- [ ] CHANGELOG.md is updated
- [ ] All themes tested (if UI-related)
- [ ] Accessibility verified (if UI-related)
- [ ] No breaking changes (or clearly documented)
- [ ] Commit messages follow conventional format
- [ ] Branch is up-to-date with main

### Review Process

- Maintainers will review within 3-5 business days
- Address feedback in new commits (don't force-push during review)
- Once approved, maintainers will merge and tag releases

### Version Bumping

Maintainers handle versioning based on:
- **Patch**: Bug fixes, documentation, token value tweaks
- **Minor**: New themes, tokens, components (backward-compatible)
- **Major**: Breaking changes requiring project migration

## Questions?

- Open a [Discussion](https://github.com/mjsherwood76-dev/mjs76-dev-standards/discussions) for general questions
- Use [Issues](https://github.com/mjsherwood76-dev/mjs76-dev-standards/issues) for bugs or feature requests
- Review existing documentation in `design/`, `backend/`, `frontend/`, and `global/`

Thank you for contributing to mjs76 Development Standards! 🎨
