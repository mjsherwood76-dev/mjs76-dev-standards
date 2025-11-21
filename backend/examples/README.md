# Backend Examples

This directory contains concrete examples and patterns for building secure, maintainable Cloudflare Workers applications following mjs76 standards.

## Contents

- **`config-example.ts`** - Centralized configuration pattern with type-safe env access
- **`secrets-example.ts`** - Secrets management using Cloudflare secrets and bindings
- **`auth-middleware-example.ts`** - Authentication/authorization middleware pattern
- **`d1-repository-example.ts`** - D1 database repository pattern with query builders
- **`kv-cache-example.ts`** - KV-based caching layer with TTL management
- **`r2-storage-example.ts`** - R2 object storage with signed URLs
- **`queue-worker-example.ts`** - Background job processing with Cloudflare Queues
- **`error-handling-example.ts`** - Centralized error handling and logging
- **`api-routes-example.ts`** - RESTful API route patterns with validation

## Quick Start

Each example file is self-contained and includes:
- TypeScript interfaces for type safety
- Inline documentation explaining patterns
- Usage examples
- Best practices from `backend/backend.instructions.md`

## Key Principles

### 1. Never Hardcode Secrets

❌ **Don't:**
```typescript
const API_KEY = "sk_live_abc123"; // NEVER do this
```

✅ **Do:**
```typescript
const apiKey = env.API_KEY; // From Cloudflare secrets
```

### 2. Centralize Configuration

All environment-specific config should go through a central module:

```typescript
// config.ts
export const config = {
  database: env.DB,
  cache: env.CACHE_KV,
  storage: env.STORAGE_R2,
  apiKeys: {
    stripe: env.STRIPE_SECRET_KEY,
    sendgrid: env.SENDGRID_API_KEY,
  },
};
```

### 3. Type-Safe Bindings

Define Cloudflare bindings in your `wrangler.toml` and TypeScript env interface:

```typescript
// env.d.ts
interface Env {
  DB: D1Database;
  CACHE: KVNamespace;
  STORAGE: R2Bucket;
  STRIPE_SECRET_KEY: string;
}
```

### 4. Repository Pattern for Data Access

Keep database logic separate from business logic:

```typescript
// repositories/users.ts
export class UserRepository {
  constructor(private db: D1Database) {}

  async findById(id: string): Promise<User | null> {
    // Encapsulated query logic
  }
}
```

### 5. Middleware for Cross-Cutting Concerns

Use middleware for auth, logging, CORS, etc.:

```typescript
const app = new Hono<{ Bindings: Env }>();

app.use('*', corsMiddleware);
app.use('/api/*', authMiddleware);
app.use('*', loggingMiddleware);
```

## Cloudflare Bindings Quick Reference

### D1 (SQL Database)
```typescript
const result = await env.DB
  .prepare('SELECT * FROM users WHERE id = ?')
  .bind(userId)
  .first();
```

### KV (Key-Value Store)
```typescript
// Set with TTL
await env.CACHE.put('key', JSON.stringify(data), { expirationTtl: 3600 });

// Get
const cached = await env.CACHE.get('key', 'json');
```

### R2 (Object Storage)
```typescript
// Put object
await env.STORAGE.put('path/to/file.jpg', fileBuffer, {
  httpMetadata: { contentType: 'image/jpeg' },
});

// Get object
const object = await env.STORAGE.get('path/to/file.jpg');
const data = await object?.arrayBuffer();
```

### Queues (Background Jobs)
```typescript
// Send message
await env.JOB_QUEUE.send({
  type: 'SEND_EMAIL',
  payload: { to: 'user@example.com', subject: 'Welcome!' },
});
```

## Development Workflow

### Local Development with Wrangler

```bash
# Install dependencies
npm install

# Run local dev server (with bindings)
npx wrangler dev

# Tail live logs
npx wrangler tail

# Execute migrations
npx wrangler d1 migrations apply DB_NAME --local
```

### Managing Secrets

```bash
# Set secret
npx wrangler secret put STRIPE_SECRET_KEY

# List secrets (names only, not values)
npx wrangler secret list

# Delete secret
npx wrangler secret delete OLD_SECRET
```

### Testing with Miniflare

See `testing/backend/integration/` for examples of testing Workers locally with Miniflare:

```typescript
import { Miniflare } from 'miniflare';

const mf = new Miniflare({
  script: `export default { fetch }`,
  d1Databases: ['DB'],
  kvNamespaces: ['CACHE'],
});
```

## Security Checklist

- [ ] All secrets use `wrangler secret put` (never committed to git)
- [ ] Environment bindings are typed in `Env` interface
- [ ] No `console.log` of sensitive data
- [ ] Input validation on all public endpoints
- [ ] Authentication middleware on protected routes
- [ ] CORS configured appropriately
- [ ] Rate limiting implemented for public APIs
- [ ] SQL queries use parameterized statements (`.bind()`)

## Common Patterns

### Error Handling
```typescript
try {
  const user = await userRepo.findById(id);
  if (!user) {
    return new Response('Not found', { status: 404 });
  }
  return Response.json(user);
} catch (error) {
  console.error('Error fetching user:', error);
  return new Response('Internal error', { status: 500 });
}
```

### Input Validation
```typescript
import { z } from 'zod';

const CreateUserSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1).max(100),
});

const body = await request.json();
const validation = CreateUserSchema.safeParse(body);

if (!validation.success) {
  return Response.json(
    { error: validation.error.format() },
    { status: 400 }
  );
}
```

### Caching Strategy
```typescript
// Check cache first
const cached = await env.CACHE.get(cacheKey, 'json');
if (cached) return Response.json(cached);

// Fetch from source
const data = await fetchExpensiveData();

// Store in cache
await env.CACHE.put(cacheKey, JSON.stringify(data), {
  expirationTtl: 3600, // 1 hour
});

return Response.json(data);
```

## Resources

- [Cloudflare Workers Docs](https://developers.cloudflare.com/workers/)
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/)
- [D1 Database](https://developers.cloudflare.com/d1/)
- [Workers KV](https://developers.cloudflare.com/kv/)
- [R2 Storage](https://developers.cloudflare.com/r2/)
- [Queues](https://developers.cloudflare.com/queues/)

---

For full backend standards, see: `backend/backend.instructions.md`
