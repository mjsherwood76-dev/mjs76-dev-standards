# Project Name

[Brief description of your project]

Built with the [mjs76 Development Standards](https://github.com/mjsherwood76-dev/mjs76-dev-standards).

## Features

- ✅ Next.js 14 App Router with TypeScript
- ✅ Cloudflare Workers backend (D1, KV, R2, Queues)
- ✅ 5 pre-built themes with light/dark modes
- ✅ shadcn/ui component library
- ✅ Full testing setup (Vitest, Playwright)
- ✅ CI/CD with GitHub Actions
- ✅ WCAG 2.1 AA accessible

## Quick Start

### Prerequisites

- Node.js 18+
- npm 9+
- Cloudflare account ([sign up free](https://dash.cloudflare.com/sign-up))
- Wrangler CLI (`npm install -g wrangler`)

### Installation

```bash
# Install dependencies
npm install

# Set up Cloudflare bindings
cp wrangler.toml.example wrangler.toml
# Edit wrangler.toml with your account ID

# Set secrets
wrangler secret put JWT_SECRET
wrangler secret put API_KEY

# Create D1 database
npm run db:create
# Copy database ID to wrangler.toml

# Run locally
npm run dev              # Frontend (http://localhost:3000)
npm run worker:dev       # Backend (http://localhost:8787)
```

## Development

### Frontend

```bash
npm run dev              # Start Next.js dev server
npm run build            # Build for production
npm run lint             # Lint code
npm run format           # Format with Prettier
```

### Backend

```bash
npm run worker:dev       # Start Wrangler dev server
npm run worker:deploy    # Deploy to Cloudflare
```

### Testing

```bash
npm test                 # Run unit tests
npm run test:watch       # Watch mode
npm run test:e2e         # Run E2E tests with Playwright
npm run test:e2e:ui      # Playwright UI mode
```

## Project Structure

```
├── app/                 # Next.js App Router
│   ├── layout.tsx       # Root layout with theme provider
│   ├── page.tsx         # Home page
│   └── globals.css      # Theme tokens
├── components/          # React components
│   ├── ui/              # shadcn/ui components
│   └── theme-switcher.tsx
├── lib/                 # Utilities
│   ├── utils.ts
│   └── themes.ts
├── workers/             # Cloudflare Workers
│   └── src/
│       ├── index.ts     # Worker entry point
│       ├── config.ts    # Environment config
│       └── routes/      # API endpoints
├── testing/             # Test files
│   ├── unit/
│   ├── integration/
│   └── e2e/
└── wrangler.toml        # Cloudflare configuration
```

## Themes

Switch between 5 themes with light/dark modes:

- **Default (Aurora)**: Professional blue with green accents
- **Minimalist (Zen)**: Clean grays and subtle colors
- **Earthy (Terracotta)**: Warm browns and forest greens
- **Cyber-Noir (Neon)**: Dark purples with neon accents
- **Luxury (Opulence)**: Rich purples with gold highlights

## Deployment

### Cloudflare Pages (Frontend)

```bash
npm run build
npx wrangler pages deploy out
```

Or connect your GitHub repository in the Cloudflare Dashboard for automatic deployments.

### Cloudflare Workers (Backend)

```bash
npm run worker:deploy
```

## Environment Variables

### Frontend (.env.local)

```bash
NEXT_PUBLIC_API_URL=https://api.example.com
```

### Backend (Wrangler Secrets)

```bash
wrangler secret put JWT_SECRET
wrangler secret put API_KEY
wrangler secret put STRIPE_SECRET_KEY
```

## Documentation

- [Next.js Documentation](https://nextjs.org/docs)
- [Cloudflare Workers](https://developers.cloudflare.com/workers/)
- [shadcn/ui Components](https://ui.shadcn.com/)
- [mjs76 Standards Repository](https://github.com/mjsherwood76-dev/mjs76-dev-standards)

## Contributing

See [CONTRIBUTING.md](../../CONTRIBUTING.md) for guidelines.

## License

MIT - See [LICENSE](../../LICENSE) for details.

---

**Powered by [mjs76 Development Standards](https://github.com/mjsherwood76-dev/mjs76-dev-standards)**
