# Project Templates

Quick-start templates that follow mjs76 Development Standards out of the box.

## Available Templates

### 1. Next.js + Cloudflare Full Stack

Complete full-stack application with:
- **Frontend**: Next.js 14 App Router, React 18, TypeScript, Tailwind CSS
- **Backend**: Cloudflare Workers with D1, KV, R2, Queues
- **Design**: All 17 themes (Aurora, Zen, Terracotta, Neon, Opulence, Soft Pastel, Comic, Summit, Velocity, Valor, Vogue, Vitality, Sterling, Syntax, Nexus, Ember, Prism) with light/dark modes
- **Components**: Pre-configured shadcn/ui components
- **Testing**: Vitest, Playwright, React Testing Library setup
- **CI/CD**: GitHub Actions workflows included

## Quick Start

### Option 1: Using the Init Script (Recommended)

```bash
# From the mjs76-dev-standards repository root
cd templates/nextjs-cloudflare
npm run init my-new-project

# Follow prompts to configure:
# - Project name
# - Cloudflare account ID
# - Enable D1, KV, R2, Queues
```

### Option 2: Manual Setup

```bash
# Copy template to your projects directory
cp -r templates/nextjs-cloudflare ../my-new-project
cd ../my-new-project

# Install dependencies
npm install

# Configure Cloudflare (see wrangler.toml.example)
cp wrangler.toml.example wrangler.toml
# Edit wrangler.toml with your account ID

# Set up secrets
wrangler secret put JWT_SECRET
wrangler secret put API_KEY

# Run locally
npm run dev

# Deploy to Cloudflare
npm run deploy
```

## What's Included

### Frontend Structure

```
app/
├── layout.tsx           # Root layout with theme provider
├── page.tsx             # Home page
├── globals.css          # All 5 theme tokens
└── providers.tsx        # Theme provider setup

components/
├── ui/                  # shadcn/ui components
│   ├── button.tsx
│   ├── card.tsx
│   └── input.tsx
└── theme-switcher.tsx   # Theme selection component

lib/
├── utils.ts             # cn() helper
└── themes.ts            # Theme definitions
```

### Backend Structure

```
workers/
├── src/
│   ├── index.ts         # Main worker entry point
│   ├── config.ts        # Environment configuration
│   ├── middleware/      # Auth, CORS, logging
│   └── routes/          # API endpoints
├── wrangler.toml.example
└── package.json
```

### Configuration Files

- `package.json` - All dependencies configured
- `tsconfig.json` - TypeScript with path aliases
- `tailwind.config.ts` - Theme tokens integrated
- `next.config.js` - Optimized for Cloudflare Pages
- `.env.example` - Environment variables template
- `wrangler.toml.example` - Cloudflare bindings template

### Testing Setup

- `vitest.config.ts` - Unit tests for backend/frontend
- `playwright.config.ts` - E2E tests with all browsers
- `testing/` - Example tests to get started

### CI/CD

- `.github/workflows/test.yml` - Automated testing
- `.github/workflows/deploy.yml` - Cloudflare deployment

## Customization

### Change Theme Defaults

Edit `app/globals.css` to modify theme tokens:

```css
:root {
  --background: 0 0% 100%;
  --foreground: 222 47% 11%;
  /* Modify any token */
}
```

### Add New Components

```bash
# Add shadcn/ui components as needed
npx shadcn-ui@latest add dialog
npx shadcn-ui@latest add dropdown-menu
```

### Configure Cloudflare Bindings

Edit `wrangler.toml`:

```toml
# Enable D1 Database
[[d1_databases]]
binding = "DB"
database_name = "my-database"
database_id = "your-database-id"

# Enable KV Namespace
[[kv_namespaces]]
binding = "KV"
id = "your-kv-id"

# Enable R2 Bucket
[[r2_buckets]]
binding = "BUCKET"
bucket_name = "my-bucket"

# Enable Queue
[[queues.producers]]
binding = "QUEUE"
queue = "my-queue"
```

## Next Steps

After setup:

1. **Read the docs**: Review all markdown files in the repository
2. **Configure CI/CD**: Set GitHub secrets for `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID`
3. **Set up database**: Create D1 database with `wrangler d1 create my-database`
4. **Deploy**: Run `npm run deploy` to publish to Cloudflare
5. **Monitor**: Enable Cloudflare Analytics for performance tracking

## Support

- **Documentation**: See root README.md for full standards
- **Examples**: Check `backend/examples/` and `testing/` directories
- **Issues**: Use GitHub issue templates in `.github/ISSUE_TEMPLATE/`
- **Contributing**: See CONTRIBUTING.md for guidelines

---

**Note**: This template is regularly updated to match the latest standards. Check the repository's CHANGELOG.md for recent updates.
