# Performance Guidelines

Performance is a feature. All projects following mjs76 Development Standards must meet these performance targets.

## Table of Contents

- [Core Web Vitals Targets](#core-web-vitals-targets)
- [Frontend Performance](#frontend-performance)
- [Backend Performance](#backend-performance)
- [Cloudflare-Specific Optimizations](#cloudflare-specific-optimizations)
- [Monitoring & Measurement](#monitoring--measurement)
- [Performance Checklist](#performance-checklist)

---

## Core Web Vitals Targets

### Production Targets (75th Percentile)

| Metric | Target | Good | Needs Improvement | Poor |
|--------|--------|------|-------------------|------|
| **LCP** (Largest Contentful Paint) | ≤ 2.5s | ≤ 2.5s | 2.5s - 4.0s | > 4.0s |
| **FID** (First Input Delay) | ≤ 100ms | ≤ 100ms | 100ms - 300ms | > 300ms |
| **CLS** (Cumulative Layout Shift) | ≤ 0.1 | ≤ 0.1 | 0.1 - 0.25 | > 0.25 |
| **INP** (Interaction to Next Paint) | ≤ 200ms | ≤ 200ms | 200ms - 500ms | > 500ms |

### Additional Metrics

| Metric | Target | Notes |
|--------|--------|-------|
| **TTFB** (Time to First Byte) | ≤ 600ms | Cloudflare CDN should achieve < 200ms globally |
| **FCP** (First Contentful Paint) | ≤ 1.8s | First text/image rendered |
| **TBT** (Total Blocking Time) | ≤ 300ms | Sum of blocking time > 50ms |
| **Speed Index** | ≤ 3.4s | Visual progress metric |

---

## Frontend Performance

### Bundle Size Limits

| Bundle Type | Target | Maximum | Notes |
|-------------|--------|---------|-------|
| **First Load JS** | < 100 KB | 150 KB | Uncompressed (Next.js reports this) |
| **Route JS** | < 50 KB | 75 KB | Per dynamic route |
| **CSS** | < 30 KB | 50 KB | Critical + theme tokens |
| **Images (Hero)** | < 200 KB | 300 KB | Use WebP/AVIF with fallbacks |
| **Fonts** | < 100 KB total | 150 KB | Subset and preload critical fonts |

**Check bundle sizes**:
```bash
npm run build

# Next.js output shows sizes:
# Route (pages)                              Size     First Load JS
# ┌ ○ /                                      5.02 kB        87.3 kB
# ├ ○ /404                                   182 B          82.5 kB
# └ ○ /api/hello                             0 B                0 B
```

### Code Splitting

#### Automatic Splitting
Next.js App Router automatically splits by route. Leverage this:

```tsx
// ✅ Good - Each route is a separate bundle
// app/page.tsx (home)
// app/dashboard/page.tsx (dashboard)
// app/profile/page.tsx (profile)
```

#### Dynamic Imports
Use `next/dynamic` for heavy components:

```tsx
import dynamic from 'next/dynamic';

// ✅ Lazy load expensive chart library
const ChartComponent = dynamic(() => import('@/components/Chart'), {
  ssr: false,
  loading: () => <p>Loading chart...</p>
});

// ✅ Lazy load modal (only when opened)
const Modal = dynamic(() => import('@/components/Modal'));

function Page() {
  const [showModal, setShowModal] = useState(false);
  
  return (
    <>
      <button onClick={() => setShowModal(true)}>Open</button>
      {showModal && <Modal onClose={() => setShowModal(false)} />}
    </>
  );
}
```

### Image Optimization

#### Use Next.js Image Component

```tsx
import Image from 'next/image';

// ✅ Good - Automatic optimization, lazy loading, responsive sizes
<Image
  src="/hero.jpg"
  alt="Hero image"
  width={1200}
  height={600}
  priority // Only for above-the-fold images
  sizes="(max-width: 768px) 100vw, 50vw"
/>

// ❌ Bad - No optimization
<img src="/hero.jpg" alt="Hero image" />
```

#### Image Formats
- **WebP**: Primary format (90% smaller than PNG)
- **AVIF**: Use for even better compression (optional)
- **JPG/PNG**: Fallback for older browsers

```tsx
<picture>
  <source srcSet="/hero.avif" type="image/avif" />
  <source srcSet="/hero.webp" type="image/webp" />
  <img src="/hero.jpg" alt="Hero" />
</picture>
```

#### Image Sizing Guidelines
- Hero images: 1920×1080 (2x for retina: 3840×2160)
- Thumbnails: 300×300
- Icons: Use SVG (infinitely scalable, < 5 KB each)

### Font Loading Strategy

#### Self-Host Fonts
Use `next/font` for automatic optimization:

```tsx
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap', // Prevent FOIT (Flash of Invisible Text)
  variable: '--font-inter',
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
```

#### Preload Critical Fonts
```tsx
<link
  rel="preload"
  href="/fonts/inter-var.woff2"
  as="font"
  type="font/woff2"
  crossOrigin="anonymous"
/>
```

#### Subset Fonts
Only include characters you need:
```bash
# Remove unused glyphs (reduce from 500 KB to 50 KB)
npx glyphhanger --subset=*.woff2 --formats=woff2
```

### CSS Optimization

#### Critical CSS
Inline theme tokens in `<head>` to prevent FOUC:

```tsx
// app/layout.tsx
export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <style dangerouslySetInnerHTML={{
          __html: `
            :root {
              --background: 0 0% 100%;
              --foreground: 222 47% 11%;
              /* ... all theme tokens */
            }
          `
        }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

#### Tailwind Purging
Ensure unused classes are removed:

```js
// tailwind.config.ts
export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  // This removes unused classes in production
};
```

### JavaScript Optimization

#### Tree Shaking
Import only what you need:

```tsx
// ✅ Good - Only imports `useState`
import { useState } from 'react';

// ❌ Bad - Imports entire React object
import * as React from 'react';
const [state, setState] = React.useState();
```

#### Memoization
Prevent unnecessary re-renders:

```tsx
import { memo, useMemo, useCallback } from 'react';

// ✅ Memoize expensive calculations
const ExpensiveComponent = memo(({ data }) => {
  const computed = useMemo(() => {
    return data.map(item => /* expensive calculation */);
  }, [data]);

  return <div>{computed}</div>;
});

// ✅ Memoize callbacks to prevent child re-renders
function Parent() {
  const handleClick = useCallback(() => {
    console.log('clicked');
  }, []);

  return <Child onClick={handleClick} />;
}
```

#### Debouncing & Throttling
Limit high-frequency events:

```tsx
import { useDebouncedCallback } from 'use-debounce';

function SearchInput() {
  const debouncedSearch = useDebouncedCallback(
    (value) => {
      // API call here
      fetch(`/api/search?q=${value}`);
    },
    300 // Wait 300ms after user stops typing
  );

  return <input onChange={(e) => debouncedSearch(e.target.value)} />;
}
```

---

## Backend Performance

### Cloudflare Workers Constraints

| Resource | Limit | Notes |
|----------|-------|-------|
| **CPU Time** | 50ms (free), 30s (paid) | Average < 10ms recommended |
| **Memory** | 128 MB | Shared across all isolates |
| **Request Size** | 100 MB | For uploads to R2 |
| **Subrequests** | 50 (free), 1000 (paid) | Includes fetch() calls |

### Database Optimization (D1)

#### Use Prepared Statements
```typescript
// ✅ Good - Reuses query plan
const stmt = env.DB.prepare('SELECT * FROM users WHERE id = ?');
const user = await stmt.bind(userId).first();

// ❌ Bad - Reparsed every time
const user = await env.DB.prepare(
  `SELECT * FROM users WHERE id = ${userId}`
).first();
```

#### Batch Queries
```typescript
// ✅ Good - Single round trip
const results = await env.DB.batch([
  env.DB.prepare('SELECT * FROM users WHERE id = ?').bind(1),
  env.DB.prepare('SELECT * FROM posts WHERE user_id = ?').bind(1),
  env.DB.prepare('SELECT * FROM comments WHERE user_id = ?').bind(1),
]);

// ❌ Bad - Three round trips
const user = await env.DB.prepare('SELECT * FROM users WHERE id = ?').bind(1).first();
const posts = await env.DB.prepare('SELECT * FROM posts WHERE user_id = ?').bind(1).all();
const comments = await env.DB.prepare('SELECT * FROM comments WHERE user_id = ?').bind(1).all();
```

#### Index Strategically
```sql
-- ✅ Index frequently queried columns
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_posts_user_id ON posts(user_id);

-- ⚠️ Don't over-index (slows writes)
-- Only index columns used in WHERE, JOIN, ORDER BY
```

### KV Caching Strategy

#### Cache Hierarchy
1. **In-memory** (global variable): < 1ms, 128 MB total
2. **KV**: 10-50ms, unlimited storage
3. **D1**: 50-200ms, relational queries
4. **Origin**: 200ms+, external APIs

#### TTL Recommendations
```typescript
// ✅ Good TTL strategy
await env.KV.put('static-content', data, {
  expirationTtl: 86400, // 24 hours for rarely changing data
});

await env.KV.put('user-session', session, {
  expirationTtl: 3600, // 1 hour for user sessions
});

await env.KV.put('api-response', response, {
  expirationTtl: 300, // 5 minutes for dynamic data
});
```

#### Cache Invalidation
```typescript
// ✅ Invalidate on write
export async function updateUser(env: Env, userId: string, data: any) {
  // Update database
  await env.DB.prepare('UPDATE users SET ... WHERE id = ?')
    .bind(userId)
    .run();

  // Invalidate cache
  await env.KV.delete(`user:${userId}`);
}
```

### R2 Storage Optimization

#### Use Signed URLs
```typescript
// ✅ Good - Offload delivery to R2 (no Worker CPU)
const object = await env.BUCKET.get(key);
const signedUrl = await object.generateSignedUrl({
  expiresIn: 3600, // 1 hour
});
return Response.redirect(signedUrl);

// ❌ Bad - Proxies through Worker (uses CPU/memory)
const object = await env.BUCKET.get(key);
return new Response(object.body);
```

#### Compress Before Upload
```typescript
// ✅ Good - Store compressed
import { gzip } from 'pako';

const compressed = gzip(JSON.stringify(data));
await env.BUCKET.put(key, compressed, {
  httpMetadata: {
    contentType: 'application/json',
    contentEncoding: 'gzip',
  },
});
```

### Queue Processing

#### Batch Messages
```typescript
// ✅ Good - Process in batches
export default {
  async queue(batch: MessageBatch<any>, env: Env) {
    // Process up to 100 messages at once
    const results = await Promise.all(
      batch.messages.map(msg => processMessage(msg.body))
    );

    // Retry failed messages
    batch.messages.forEach((msg, i) => {
      if (!results[i].success) {
        msg.retry();
      }
    });
  }
};
```

---

## Cloudflare-Specific Optimizations

### Edge Caching
```typescript
// ✅ Cache static assets at CDN edge
export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext) {
    const cache = caches.default;
    let response = await cache.match(request);

    if (!response) {
      response = await fetch(request);
      
      // Cache for 1 hour
      response = new Response(response.body, response);
      response.headers.set('Cache-Control', 'public, max-age=3600');
      
      ctx.waitUntil(cache.put(request, response.clone()));
    }

    return response;
  }
};
```

### Geolocation Routing
```typescript
// Route to nearest data center
const country = request.cf?.country;
const db = country === 'US' ? env.DB_US : env.DB_EU;
```

### Durable Objects (Stateul Workers)
Use for:
- WebSocket connections
- Real-time collaboration
- Distributed locks
- Stateful workflows

**Not for**:
- Simple CRUD (use D1)
- File storage (use R2)
- Key-value cache (use KV)

---

## Monitoring & Measurement

### Web Vitals Tracking

#### Install `web-vitals`
```bash
npm install web-vitals
```

#### Report Metrics
```tsx
// app/layout.tsx
'use client';

import { useEffect } from 'react';
import { onCLS, onFID, onLCP, onINP } from 'web-vitals';

export function WebVitals() {
  useEffect(() => {
    onCLS(console.log);
    onFID(console.log);
    onLCP(console.log);
    onINP(console.log);
  }, []);

  return null;
}
```

### Lighthouse CI

Add to `.github/workflows/test.yml`:
```yaml
- name: Run Lighthouse
  uses: treosh/lighthouse-ci-action@v9
  with:
    urls: |
      http://localhost:3000
    uploadArtifacts: true
    temporaryPublicStorage: true
```

### Cloudflare Analytics
Access via dashboard or API:
```bash
curl -X GET "https://api.cloudflare.com/client/v4/accounts/{account_id}/analytics_engine/sql" \
  -H "Authorization: Bearer {token}" \
  -d "SELECT avg(duration) FROM logs WHERE timestamp > NOW() - INTERVAL '24' HOUR"
```

---

## Performance Checklist

### Development
- [ ] Bundle size checked after each major feature (`npm run build`)
- [ ] Lighthouse score > 90 on local dev
- [ ] No console errors or warnings
- [ ] Images optimized (< 300 KB each)
- [ ] Fonts subsetted and preloaded

### Pre-Production
- [ ] Core Web Vitals pass (LCP < 2.5s, FID < 100ms, CLS < 0.1)
- [ ] Lighthouse CI passing in GitHub Actions
- [ ] No unused dependencies (`npx depcheck`)
- [ ] Tree-shaking verified (check bundle analyzer)
- [ ] Database queries indexed

### Production
- [ ] Real User Monitoring (RUM) enabled
- [ ] CDN cache hit rate > 90%
- [ ] Worker CPU time < 10ms average
- [ ] No 5xx errors in Cloudflare logs
- [ ] Performance budgets set in `next.config.js`

### Performance Budgets (Next.js)

```js
// next.config.js
module.exports = {
  performance: {
    budgets: [
      {
        route: '/',
        firstLoadJS: 100 * 1024, // 100 KB
        totalJS: 150 * 1024, // 150 KB
      },
    ],
  },
};
```

---

## Quick Wins

1. **Enable Next.js Image Optimization** - Automatic WebP conversion
2. **Add `priority` to hero images** - Preload above-the-fold images
3. **Use `next/font`** - Self-host and optimize fonts
4. **Cache API responses in KV** - Reduce D1 queries by 80%+
5. **Batch database operations** - Use `DB.batch()` for multiple queries
6. **Lazy load off-screen components** - `next/dynamic` with `ssr: false`
7. **Compress R2 uploads** - Use gzip/brotli before storing
8. **Set proper Cache-Control headers** - Leverage CDN caching
9. **Remove unused dependencies** - Run `npm prune` and `depcheck`
10. **Monitor Core Web Vitals** - Install `web-vitals` package

---

## Enforcement

All pull requests must:
- [ ] Pass Lighthouse CI (score ≥ 90)
- [ ] Stay within bundle size budgets
- [ ] Include performance testing for new features
- [ ] Document any intentional performance trade-offs

Performance is non-negotiable for production deployments.
