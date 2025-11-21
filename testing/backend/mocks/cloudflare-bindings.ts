/**
 * Mock helpers for Cloudflare bindings (D1, KV, R2, Queues)
 * 
 * Use these in tests to simulate Cloudflare runtime without deploying.
 * Can be used with Vitest, Jest, or any test framework.
 */

import { vi } from 'vitest';

// ============================================================================
// D1 Database Mock
// ============================================================================

export interface D1Result<T = unknown> {
  results?: T[];
  success: boolean;
  meta: {
    duration: number;
    rows_read: number;
    rows_written: number;
  };
}

export interface D1PreparedStatement {
  bind(...values: unknown[]): D1PreparedStatement;
  first<T = unknown>(colName?: string): Promise<T | null>;
  run(): Promise<D1Result>;
  all<T = unknown>(): Promise<D1Result<T>>;
}

export interface D1Database {
  prepare(query: string): D1PreparedStatement;
  exec(query: string): Promise<D1Result>;
  batch<T = unknown>(statements: D1PreparedStatement[]): Promise<D1Result<T>[]>;
}

export function createMockD1Database(): D1Database {
  const storage = new Map<string, unknown[]>();

  const createStatement = (query: string): D1PreparedStatement => {
    let boundValues: unknown[] = [];

    return {
      bind(...values: unknown[]) {
        boundValues = values;
        return this;
      },

      async first<T = unknown>(colName?: string): Promise<T | null> {
        // Simulate a SELECT query returning first row
        const mockData = storage.get(query)?.[0];
        if (!mockData) return null;
        if (colName) return (mockData as Record<string, T>)[colName];
        return mockData as T;
      },

      async run(): Promise<D1Result> {
        // Simulate INSERT/UPDATE/DELETE
        return {
          success: true,
          meta: {
            duration: 5,
            rows_read: 0,
            rows_written: 1,
          },
        };
      },

      async all<T = unknown>(): Promise<D1Result<T>> {
        // Simulate SELECT query returning all rows
        const results = (storage.get(query) as T[]) || [];
        return {
          results,
          success: true,
          meta: {
            duration: 10,
            rows_read: results.length,
            rows_written: 0,
          },
        };
      },
    };
  };

  return {
    prepare: vi.fn(createStatement),
    exec: vi.fn(async (query: string) => ({
      success: true,
      meta: { duration: 5, rows_read: 0, rows_written: 0 },
    })),
    batch: vi.fn(async () => []),
  };
}

// ============================================================================
// KV Namespace Mock
// ============================================================================

export interface KVNamespace {
  get(key: string, options?: { type?: 'text' | 'json' | 'arrayBuffer' | 'stream' }): Promise<string | null>;
  put(key: string, value: string | ArrayBuffer | ReadableStream, options?: { expirationTtl?: number }): Promise<void>;
  delete(key: string): Promise<void>;
  list(options?: { prefix?: string; limit?: number }): Promise<{ keys: Array<{ name: string }> }>;
}

export function createMockKV(): KVNamespace {
  const storage = new Map<string, string>();

  return {
    get: vi.fn(async (key: string, options?: { type?: string }) => {
      const value = storage.get(key);
      if (!value) return null;
      if (options?.type === 'json') return JSON.parse(value);
      return value;
    }),

    put: vi.fn(async (key: string, value: string | ArrayBuffer | ReadableStream) => {
      if (typeof value === 'string') {
        storage.set(key, value);
      } else if (value instanceof ArrayBuffer) {
        storage.set(key, new TextDecoder().decode(value));
      } else {
        // Handle ReadableStream
        const reader = value.getReader();
        const chunks: Uint8Array[] = [];
        let done = false;

        while (!done) {
          const { value: chunk, done: streamDone } = await reader.read();
          if (chunk) chunks.push(chunk);
          done = streamDone;
        }

        const combined = new Uint8Array(chunks.reduce((acc, chunk) => acc + chunk.length, 0));
        let offset = 0;
        for (const chunk of chunks) {
          combined.set(chunk, offset);
          offset += chunk.length;
        }

        storage.set(key, new TextDecoder().decode(combined));
      }
    }),

    delete: vi.fn(async (key: string) => {
      storage.delete(key);
    }),

    list: vi.fn(async (options?: { prefix?: string; limit?: number }) => {
      const keys = Array.from(storage.keys())
        .filter((key) => !options?.prefix || key.startsWith(options.prefix))
        .slice(0, options?.limit || 1000)
        .map((name) => ({ name }));

      return { keys };
    }),
  };
}

// ============================================================================
// R2 Bucket Mock
// ============================================================================

export interface R2Object {
  key: string;
  size: number;
  etag: string;
  uploaded: Date;
  body: ReadableStream;
  text(): Promise<string>;
  json<T = unknown>(): Promise<T>;
}

export interface R2Bucket {
  get(key: string): Promise<R2Object | null>;
  put(key: string, value: string | ArrayBuffer | ReadableStream): Promise<R2Object>;
  delete(key: string): Promise<void>;
  list(options?: { prefix?: string; limit?: number }): Promise<{ objects: R2Object[] }>;
}

export function createMockR2Bucket(): R2Bucket {
  const storage = new Map<string, { data: string; uploaded: Date }>();

  return {
    get: vi.fn(async (key: string) => {
      const item = storage.get(key);
      if (!item) return null;

      const encoder = new TextEncoder();
      const stream = new ReadableStream({
        start(controller) {
          controller.enqueue(encoder.encode(item.data));
          controller.close();
        },
      });

      return {
        key,
        size: item.data.length,
        etag: `"${key}-${item.uploaded.getTime()}"`,
        uploaded: item.uploaded,
        body: stream,
        text: async () => item.data,
        json: async () => JSON.parse(item.data),
      };
    }),

    put: vi.fn(async (key: string, value: string | ArrayBuffer | ReadableStream) => {
      let dataString: string;

      if (typeof value === 'string') {
        dataString = value;
      } else if (value instanceof ArrayBuffer) {
        dataString = new TextDecoder().decode(value);
      } else {
        // Handle ReadableStream (simplified)
        const reader = value.getReader();
        const chunks: Uint8Array[] = [];
        let done = false;

        while (!done) {
          const { value: chunk, done: streamDone } = await reader.read();
          if (chunk) chunks.push(chunk);
          done = streamDone;
        }

        const combined = new Uint8Array(chunks.reduce((acc, chunk) => acc + chunk.length, 0));
        let offset = 0;
        for (const chunk of chunks) {
          combined.set(chunk, offset);
          offset += chunk.length;
        }

        dataString = new TextDecoder().decode(combined);
      }

      const uploaded = new Date();
      storage.set(key, { data: dataString, uploaded });

      return {
        key,
        size: dataString.length,
        etag: `"${key}-${uploaded.getTime()}"`,
        uploaded,
        body: new ReadableStream(),
        text: async () => dataString,
        json: async () => JSON.parse(dataString),
      };
    }),

    delete: vi.fn(async (key: string) => {
      storage.delete(key);
    }),

    list: vi.fn(async (options?: { prefix?: string; limit?: number }) => {
      const objects = Array.from(storage.entries())
        .filter(([key]) => !options?.prefix || key.startsWith(options.prefix))
        .slice(0, options?.limit || 1000)
        .map(([key, item]) => ({
          key,
          size: item.data.length,
          etag: `"${key}-${item.uploaded.getTime()}"`,
          uploaded: item.uploaded,
          body: new ReadableStream(),
          text: async () => item.data,
          json: async () => JSON.parse(item.data),
        }));

      return { objects };
    }),
  };
}

// ============================================================================
// Queue Mock
// ============================================================================

export interface Queue<T = unknown> {
  send(message: T): Promise<void>;
  sendBatch(messages: T[]): Promise<void>;
}

export function createMockQueue<T = unknown>(): Queue<T> {
  const messages: T[] = [];

  return {
    send: vi.fn(async (message: T) => {
      messages.push(message);
    }),

    sendBatch: vi.fn(async (batch: T[]) => {
      messages.push(...batch);
    }),
  };
}

// ============================================================================
// Example Usage in Tests
// ============================================================================

/**
 * Usage Example:
 * 
 * ```typescript
 * import { createMockD1Database, createMockKV } from './cloudflare-bindings';
 * 
 * describe('MyWorker', () => {
 *   it('should query database', async () => {
 *     const db = createMockD1Database();
 *     const kv = createMockKV();
 * 
 *     // Inject mocks into your worker's env
 *     const env = { DB: db, CACHE: kv };
 *     
 *     // Test your worker logic
 *     const result = await myWorkerFunction(env);
 *     
 *     expect(db.prepare).toHaveBeenCalledWith('SELECT * FROM users');
 *   });
 * });
 * ```
 */
