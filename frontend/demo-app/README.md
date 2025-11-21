# Developer Standards Showcase (Next.js)

Interactive demo that mirrors the canonical tokens in `design/ui-standards.md`.

## Setup

```powershell
cd frontend/demo-app
npm install
npm run dev
```

Open <http://localhost:3000> to explore the showcase. Use the control panel to toggle:

- Light / dark mode (`data-mode`)
- Style theme (`data-theme = default|minimalist|earthy|cyber-noir|luxury`)
- Density (`data-density = comfortable|compact`)

All CSS variables, spacing, motion, and component examples update live, so this page doubles as a regression surface whenever you tweak the shared standards.
