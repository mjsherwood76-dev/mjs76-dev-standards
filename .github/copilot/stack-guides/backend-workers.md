# Cloudflare Backend Guide

Comprehensive guide for building backends with Cloudflare Workers, TypeScript, and Cloudflare services.

---

## Stack & Structure

### Core Technologies
- **TypeScript only** - No plain JavaScript
- **Cloudflare Workers** - Serverless compute at the edge
- **Cloudflare Services**:
  - **D1** - SQL database
  - **KV** - Key-value storage
  - **R2** - Object storage (S3-compatible)
  - **Queues** - Message queues for background jobs
  - **Durable Objects** - Stateful coordination

### Project Architecture
```
workers/
├── api/                 # API route handlers
├── services/            # Business logic layer
├── data/               # Data access layer
├── utils/              # Shared utilities
├── types/              # TypeScript types
└── config/             # Configuration modules
```

---

## Architectural Layers

### 1. Route/Handler Layer
**Purpose**: HTTP routing, input parsing, response formatting

**Responsibilities**:
- Route incoming requests
- Validate and parse input
- Call service layer
- Format responses
- Handle HTTP-specific concerns

**Keep handlers thin:**
```typescript
// ✅ GOOD - Thin handler
export async function handleGetUser(request: Request, env: Env) {
  const userId = new URL(request.url).searchParams.get('id')
  if (!userId) {
    return new Response('Missing user ID', { status: 400 })
  }
  
  const user = await UserService.getUser(userId, env)
  return Response.json(user)
}

// ❌ BAD - Business logic in handler
export async function handleGetUser(request: Request, env: Env) {
  const userId = new URL(request.url).searchParams.get('id')
  // Don't put business logic here!
  const isAdmin = await checkAdminStatus(userId)
  const permissions = await getPermissions(userId)
  // ...more logic...
}
```

### 2. Service Layer
**Purpose**: Business logic, domain rules

**Responsibilities**:
- Implement business rules
- Coordinate between data sources
- Handle complex workflows
- Enforce domain constraints

**Keep services pure:**
```typescript
// services/UserService.ts
export class UserService {
  static async getUser(id: string, env: Env): Promise<User> {
    // Business logic here
    const user = await UserRepository.findById(id, env)
    if (!user) {
      throw new NotFoundError('User not found')
    }
    return user
  }
  
  static async createUser(data: CreateUserInput, env: Env): Promise<User> {
    // Validate business rules
    if (await this.emailExists(data.email, env)) {
      throw new ValidationError('Email already registered')
    }
    
    // Delegate to data layer
    return UserRepository.create(data, env)
  }
}
```

### 3. Data Access Layer
**Purpose**: Database/storage operations

**Responsibilities**:
- Execute queries (D1, KV, R2)
- Map between database and domain models
- Handle connection management
- Batch operations

**Example repository:**
```typescript
// data/UserRepository.ts
export class UserRepository {
  static async findById(id: string, env: Env): Promise<User | null> {
    const result = await env.DB.prepare(
      'SELECT * FROM users WHERE id = ?'
    ).bind(id).first<User>()
    
    return result || null
  }
  
  static async create(data: CreateUserInput, env: Env): Promise<User> {
    const id = crypto.randomUUID()
    await env.DB.prepare(
      'INSERT INTO users (id, email, name) VALUES (?, ?, ?)'
    ).bind(id, data.email, data.name).run()
    
    return this.findById(id, env)
  }
}
```

### 4. Utilities Layer
**Purpose**: Pure helpers, cross-cutting concerns

**Examples**:
- String manipulation
- Date formatting
- Validation helpers
- Type guards

```typescript
// utils/validation.ts
export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export function parseJSON<T>(text: string): T | null {
  try {
    return JSON.parse(text)
  } catch {
    return null
  }
}
```

---

## Validation & Error Handling

### Input Validation
Use schema validators for all external input:

```typescript
import { z } from 'zod'

const CreateUserSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2).max(100),
  age: z.number().int().positive().optional()
})

export async function handleCreateUser(request: Request, env: Env) {
  const body = await request.json()
  
  // Validate input
  const result = CreateUserSchema.safeParse(body)
  if (!result.success) {
    return Response.json(
      { error: 'Validation failed', details: result.error },
      { status: 400 }
    )
  }
  
  const user = await UserService.createUser(result.data, env)
  return Response.json(user, { status: 201 })
}
```

### Centralized Error Handling
Define custom error types:

```typescript
// utils/errors.ts
export class AppError extends Error {
  constructor(
    message: string,
    public statusCode: number = 500,
    public code?: string
  ) {
    super(message)
    this.name = this.constructor.name
  }
}

export class NotFoundError extends AppError {
  constructor(message: string) {
    super(message, 404, 'NOT_FOUND')
  }
}

export class ValidationError extends AppError {
  constructor(message: string) {
    super(message, 400, 'VALIDATION_ERROR')
  }
}

export class UnauthorizedError extends AppError {
  constructor(message: string) {
    super(message, 401, 'UNAUTHORIZED')
  }
}
```

Error handling middleware:

```typescript
export function handleError(error: unknown): Response {
  console.error(error)
  
  if (error instanceof AppError) {
    return Response.json(
      {
        error: error.message,
        code: error.code
      },
      { status: error.statusCode }
    )
  }
  
  // Unknown error - don't leak details
  return Response.json(
    { error: 'Internal server error' },
    { status: 500 }
  )
}
```

### Logging Best Practices

```typescript
// ✅ GOOD - Structured logging
console.log('User created', {
  userId: user.id,
  timestamp: new Date().toISOString()
})

// ❌ BAD - Logs sensitive data
console.log('User created', { user }) // May contain password!

// ✅ GOOD - Safe error logging
console.error('Database error', {
  operation: 'createUser',
  error: error.message // Don't log full error object
})
```

**Never log:**
- Passwords
- API keys
- Tokens
- Credit card numbers
- Personal identifiable information (PII) unless necessary

---

## Configuration & Secrets

### Environment Bindings
Access Cloudflare bindings through the `Env` interface:

```typescript
interface Env {
  // Databases
  DB: D1Database
  
  // KV Namespaces
  CACHE: KVNamespace
  SESSIONS: KVNamespace
  
  // R2 Buckets
  ASSETS: R2Bucket
  
  // Queues
  EMAIL_QUEUE: Queue
  
  // Secrets
  API_KEY: string
  JWT_SECRET: string
  
  // Variables
  ENVIRONMENT: string
}
```

### Centralized Configuration
Create config modules instead of reading env vars directly:

```typescript
// config/database.ts
export class DatabaseConfig {
  static getConnection(env: Env): D1Database {
    return env.DB
  }
  
  static async runMigrations(env: Env): Promise<void> {
    // Migration logic
  }
}

// config/auth.ts
export class AuthConfig {
  static getJWTSecret(env: Env): string {
    if (!env.JWT_SECRET) {
      throw new Error('JWT_SECRET not configured')
    }
    return env.JWT_SECRET
  }
  
  static getTokenExpiry(): number {
    return 60 * 60 * 24 // 24 hours
  }
}
```

### Adding New Integrations
When adding a new service integration:

1. Add binding/secret to `wrangler.toml`
2. Add type to `Env` interface
3. Create config module
4. Document required environment variables
5. Update `.env.example`

**Example `wrangler.toml`:**
```toml
name = "my-worker"
compatibility_date = "2024-01-01"

[[d1_databases]]
binding = "DB"
database_name = "production-db"
database_id = "abc123"

[[kv_namespaces]]
binding = "CACHE"
id = "def456"

[[r2_buckets]]
binding = "ASSETS"
bucket_name = "my-assets"

[vars]
ENVIRONMENT = "production"
```

---

## Performance & Reliability

### Avoid N+1 Queries
```typescript
// ❌ BAD - N+1 query
async function getUsersWithPosts(env: Env) {
  const users = await env.DB.prepare('SELECT * FROM users').all()
  
  for (const user of users.results) {
    user.posts = await env.DB.prepare(
      'SELECT * FROM posts WHERE user_id = ?'
    ).bind(user.id).all()
  }
  
  return users
}

// ✅ GOOD - Single query with JOIN
async function getUsersWithPosts(env: Env) {
  return env.DB.prepare(`
    SELECT 
      u.*,
      p.id as post_id,
      p.title as post_title
    FROM users u
    LEFT JOIN posts p ON p.user_id = u.id
  `).all()
}
```

### Pagination
```typescript
interface PaginationParams {
  page: number
  limit: number
}

async function getUsers(
  params: PaginationParams,
  env: Env
): Promise<{ users: User[]; total: number }> {
  const offset = (params.page - 1) * params.limit
  
  const [users, count] = await Promise.all([
    env.DB.prepare('SELECT * FROM users LIMIT ? OFFSET ?')
      .bind(params.limit, offset)
      .all<User>(),
    env.DB.prepare('SELECT COUNT(*) as count FROM users')
      .first<{ count: number }>()
  ])
  
  return {
    users: users.results,
    total: count?.count || 0
  }
}
```

### Caching with KV
```typescript
async function getCachedUser(id: string, env: Env): Promise<User> {
  // Try cache first
  const cached = await env.CACHE.get(`user:${id}`, 'json')
  if (cached) {
    return cached as User
  }
  
  // Fetch from database
  const user = await UserRepository.findById(id, env)
  
  // Cache for 1 hour
  await env.CACHE.put(
    `user:${id}`,
    JSON.stringify(user),
    { expirationTtl: 3600 }
  )
  
  return user
}
```

### Background Jobs with Queues
```typescript
// Producer - Send to queue
async function sendWelcomeEmail(userId: string, env: Env) {
  await env.EMAIL_QUEUE.send({
    type: 'welcome',
    userId,
    timestamp: Date.now()
  })
}

// Consumer - Process queue
export default {
  async queue(
    batch: MessageBatch,
    env: Env
  ): Promise<void> {
    for (const message of batch.messages) {
      try {
        await processEmailJob(message.body, env)
        message.ack()
      } catch (error) {
        console.error('Failed to process message', error)
        message.retry()
      }
    }
  }
}
```

### Timeouts & Retries
```typescript
async function fetchWithTimeout(
  url: string,
  timeout: number = 5000
): Promise<Response> {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), timeout)
  
  try {
    const response = await fetch(url, {
      signal: controller.signal
    })
    return response
  } finally {
    clearTimeout(timeoutId)
  }
}

async function retryOperation<T>(
  operation: () => Promise<T>,
  maxRetries: number = 3
): Promise<T> {
  let lastError: Error
  
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await operation()
    } catch (error) {
      lastError = error as Error
      await new Promise(resolve => 
        setTimeout(resolve, Math.pow(2, i) * 1000)
      )
    }
  }
  
  throw lastError!
}
```

---

## Testing

### Test Structure
```
tests/
├── unit/               # Pure functions, services
├── integration/        # API endpoints, database
└── fixtures/           # Test data
```

### Unit Tests
```typescript
// services/__tests__/UserService.test.ts
import { describe, it, expect, beforeEach } from 'vitest'
import { UserService } from '../UserService'

describe('UserService', () => {
  let mockEnv: Env
  
  beforeEach(() => {
    mockEnv = createMockEnv()
  })
  
  it('should create user with valid data', async () => {
    const user = await UserService.createUser({
      email: 'test@example.com',
      name: 'Test User'
    }, mockEnv)
    
    expect(user.email).toBe('test@example.com')
    expect(user.id).toBeDefined()
  })
  
  it('should throw error for duplicate email', async () => {
    await UserService.createUser({
      email: 'test@example.com',
      name: 'Test User'
    }, mockEnv)
    
    await expect(
      UserService.createUser({
        email: 'test@example.com',
        name: 'Another User'
      }, mockEnv)
    ).rejects.toThrow('Email already registered')
  })
})
```

### Integration Tests
```typescript
// handlers/__tests__/user.test.ts
import { describe, it, expect } from 'vitest'
import { handleGetUser } from '../user'

describe('GET /users/:id', () => {
  it('should return user by ID', async () => {
    const request = new Request('https://api.example.com/users/123')
    const env = createTestEnv()
    
    const response = await handleGetUser(request, env)
    const data = await response.json()
    
    expect(response.status).toBe(200)
    expect(data.id).toBe('123')
  })
  
  it('should return 404 for non-existent user', async () => {
    const request = new Request('https://api.example.com/users/999')
    const env = createTestEnv()
    
    const response = await handleGetUser(request, env)
    
    expect(response.status).toBe(404)
  })
})
```

### Test Coverage
- **Happy path** - Expected successful operations
- **Edge cases** - Boundary conditions, empty data
- **Error handling** - Invalid input, external failures
- **Validation** - Input validation failures

---

## Security Best Practices

### Input Sanitization
```typescript
// Sanitize user input
function sanitizeInput(input: string): string {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .slice(0, 1000) // Limit length
}
```

### SQL Injection Prevention
```typescript
// ✅ GOOD - Parameterized queries
await env.DB.prepare('SELECT * FROM users WHERE email = ?')
  .bind(email)
  .first()

// ❌ BAD - String concatenation
await env.DB.prepare(`SELECT * FROM users WHERE email = '${email}'`)
  .first()
```

### Rate Limiting
```typescript
async function checkRateLimit(
  key: string,
  limit: number,
  window: number,
  env: Env
): Promise<boolean> {
  const now = Date.now()
  const windowKey = `ratelimit:${key}:${Math.floor(now / window)}`
  
  const current = await env.CACHE.get(windowKey)
  const count = current ? parseInt(current) : 0
  
  if (count >= limit) {
    return false
  }
  
  await env.CACHE.put(
    windowKey,
    String(count + 1),
    { expirationTtl: window }
  )
  
  return true
}
```

### Authentication Example
```typescript
async function verifyJWT(token: string, env: Env): Promise<User | null> {
  try {
    const secret = AuthConfig.getJWTSecret(env)
    const payload = await jose.jwtVerify(token, secret)
    return payload.user as User
  } catch {
    return null
  }
}

async function authenticateRequest(
  request: Request,
  env: Env
): Promise<User> {
  const token = request.headers.get('Authorization')?.replace('Bearer ', '')
  
  if (!token) {
    throw new UnauthorizedError('Missing token')
  }
  
  const user = await verifyJWT(token, env)
  
  if (!user) {
    throw new UnauthorizedError('Invalid token')
  }
  
  return user
}
```

---

## Deployment

### Wrangler Configuration
```toml
name = "my-api"
main = "src/index.ts"
compatibility_date = "2024-01-01"

[build]
command = "npm run build"

[env.production]
vars = { ENVIRONMENT = "production" }

[env.staging]
vars = { ENVIRONMENT = "staging" }
```

### Deployment Commands
```bash
# Deploy to production
wrangler deploy

# Deploy to staging
wrangler deploy --env staging

# View logs
wrangler tail

# Test locally
wrangler dev
```

---

## Additional Resources

- [Cloudflare Workers Documentation](https://developers.cloudflare.com/workers/)
- [D1 Database Guide](https://developers.cloudflare.com/d1/)
- [KV Storage Guide](https://developers.cloudflare.com/kv/)
- [R2 Storage Guide](https://developers.cloudflare.com/r2/)
- [Queues Documentation](https://developers.cloudflare.com/queues/)
