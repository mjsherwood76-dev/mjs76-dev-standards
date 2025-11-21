import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { unstable_dev, UnstableDevWorker } from 'wrangler';

/**
 * Example: Integration test for a Cloudflare Worker API endpoint
 * 
 * This demonstrates testing a full HTTP request/response cycle including:
 * - Route handling
 * - Request validation
 * - D1/KV interaction (mocked)
 * - Response formatting
 * 
 * Prerequisites:
 * - npm install -D wrangler vitest
 * - wrangler.toml configured with test bindings
 */

describe('API Integration - User Endpoints', () => {
  let worker: UnstableDevWorker;

  // Start worker before tests
  beforeEach(async () => {
    worker = await unstable_dev('src/index.ts', {
      experimental: { disableExperimentalWarning: true },
    });
  });

  // Clean up after tests
  afterEach(async () => {
    await worker.stop();
  });

  describe('POST /api/users', () => {
    it('should create user with valid payload', async () => {
      const response = await worker.fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: 'test@example.com',
          role: 'user',
        }),
      });

      expect(response.status).toBe(201);

      const data = await response.json();
      expect(data).toMatchObject({
        id: expect.any(String),
        email: 'test@example.com',
        role: 'user',
        createdAt: expect.any(String),
      });
    });

    it('should return 400 for invalid email', async () => {
      const response = await worker.fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: 'not-an-email',
          role: 'user',
        }),
      });

      expect(response.status).toBe(400);

      const data = await response.json();
      expect(data).toMatchObject({
        error: expect.stringContaining('email'),
      });
    });

    it('should return 400 for missing required fields', async () => {
      const response = await worker.fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      });

      expect(response.status).toBe(400);
    });

    it('should reject requests without Content-Type header', async () => {
      const response = await worker.fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({
          email: 'test@example.com',
        }),
      });

      expect(response.status).toBe(400);
    });
  });

  describe('GET /api/users/:id', () => {
    it('should return user when found', async () => {
      // First create a user
      const createResponse = await worker.fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: 'lookup@example.com',
        }),
      });

      const { id } = await createResponse.json();

      // Then fetch it
      const getResponse = await worker.fetch(`/api/users/${id}`);

      expect(getResponse.status).toBe(200);

      const user = await getResponse.json();
      expect(user.id).toBe(id);
      expect(user.email).toBe('lookup@example.com');
    });

    it('should return 404 when user not found', async () => {
      const response = await worker.fetch('/api/users/nonexistent-id');

      expect(response.status).toBe(404);

      const data = await response.json();
      expect(data).toMatchObject({
        error: expect.stringContaining('not found'),
      });
    });
  });

  describe('Error Handling', () => {
    it('should return 405 for unsupported methods', async () => {
      const response = await worker.fetch('/api/users', {
        method: 'DELETE',
      });

      expect(response.status).toBe(405);
    });

    it('should return 404 for unknown routes', async () => {
      const response = await worker.fetch('/api/nonexistent');

      expect(response.status).toBe(404);
    });

    it('should handle malformed JSON gracefully', async () => {
      const response = await worker.fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: 'not valid json{',
      });

      expect(response.status).toBe(400);
    });
  });

  describe('CORS Headers', () => {
    it('should include CORS headers in response', async () => {
      const response = await worker.fetch('/api/users', {
        method: 'OPTIONS',
      });

      expect(response.headers.get('Access-Control-Allow-Origin')).toBeTruthy();
      expect(response.headers.get('Access-Control-Allow-Methods')).toBeTruthy();
    });
  });
});

/**
 * Testing with Real Cloudflare Bindings (D1, KV, R2):
 * 
 * Option 1: Use Miniflare for local simulation
 * ```typescript
 * import { Miniflare } from 'miniflare';
 * 
 * const mf = new Miniflare({
 *   script: `export default { fetch }`,
 *   d1Databases: ['DB'],
 *   kvNamespaces: ['CACHE'],
 * });
 * 
 * const db = await mf.getD1Database('DB');
 * await db.exec('CREATE TABLE users (id TEXT PRIMARY KEY, email TEXT)');
 * ```
 * 
 * Option 2: Use wrangler with test fixtures
 * See testing/backend/mocks/cloudflare-bindings.ts for mock helpers
 * 
 * Key Integration Testing Patterns:
 * 
 * 1. **Full Request Cycle**: Test HTTP in → business logic → HTTP out
 * 2. **Error Scenarios**: Verify error responses match API contract
 * 3. **State Management**: Create then retrieve to verify persistence
 * 4. **Header Validation**: Ensure CORS, Content-Type, etc. are correct
 * 5. **Method Guards**: Verify 405 for unsupported methods
 * 
 * To Run:
 * ```bash
 * npx vitest testing/backend/integration/api-endpoint-example.test.ts
 * ```
 */
