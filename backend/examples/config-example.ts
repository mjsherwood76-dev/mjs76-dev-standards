/**
 * Centralized Configuration Management
 * 
 * This example demonstrates type-safe access to environment bindings
 * and configuration values in Cloudflare Workers.
 */

export interface Env {
  // Database
  DB: D1Database;
  
  // Key-Value Store
  KV: KVNamespace;
  
  // Object Storage
  BUCKET: R2Bucket;
  
  // Message Queue
  QUEUE: Queue;
  
  // Secrets (never commit these!)
  JWT_SECRET: string;
  API_KEY: string;
  ENCRYPTION_KEY: string;
  
  // Environment variables
  ENVIRONMENT: 'development' | 'staging' | 'production';
  LOG_LEVEL: 'debug' | 'info' | 'warn' | 'error';
  
  // Optional vars with defaults
  CACHE_TTL?: string;
  MAX_UPLOAD_SIZE?: string;
}

/**
 * Configuration helper with type-safe defaults
 */
export class Config {
  constructor(private env: Env) {}

  /**
   * Get environment name
   */
  get environment(): string {
    return this.env.ENVIRONMENT || 'development';
  }

  /**
   * Check if running in production
   */
  get isProduction(): boolean {
    return this.environment === 'production';
  }

  /**
   * Get log level (default: 'info')
   */
  get logLevel(): string {
    return this.env.LOG_LEVEL || 'info';
  }

  /**
   * Get cache TTL in seconds (default: 3600)
   */
  get cacheTtl(): number {
    const ttl = this.env.CACHE_TTL || '3600';
    return parseInt(ttl, 10);
  }

  /**
   * Get max upload size in bytes (default: 10 MB)
   */
  get maxUploadSize(): number {
    const size = this.env.MAX_UPLOAD_SIZE || '10485760'; // 10 MB
    return parseInt(size, 10);
  }

  /**
   * Get database binding
   */
  get database(): D1Database {
    this.assertBinding(this.env.DB, 'DB');
    return this.env.DB;
  }

  /**
   * Get KV namespace
   */
  get kv(): KVNamespace {
    this.assertBinding(this.env.KV, 'KV');
    return this.env.KV;
  }

  /**
   * Get R2 bucket
   */
  get storage(): R2Bucket {
    this.assertBinding(this.env.BUCKET, 'BUCKET');
    return this.env.BUCKET;
  }

  /**
   * Get queue
   */
  get queue(): Queue {
    this.assertBinding(this.env.QUEUE, 'QUEUE');
    return this.env.QUEUE;
  }

  /**
   * Get JWT secret
   */
  get jwtSecret(): string {
    this.assertSecret(this.env.JWT_SECRET, 'JWT_SECRET');
    return this.env.JWT_SECRET;
  }

  /**
   * Get API key
   */
  get apiKey(): string {
    this.assertSecret(this.env.API_KEY, 'API_KEY');
    return this.env.API_KEY;
  }

  /**
   * Assert that a binding exists
   */
  private assertBinding(binding: unknown, name: string): void {
    if (!binding) {
      throw new Error(
        `Missing required binding: ${name}. ` +
        `Add to wrangler.toml: [[d1_databases]], [[kv_namespaces]], [[r2_buckets]], or [[queues]]`
      );
    }
  }

  /**
   * Assert that a secret exists
   */
  private assertSecret(secret: unknown, name: string): void {
    if (!secret) {
      throw new Error(
        `Missing required secret: ${name}. ` +
        `Set with: wrangler secret put ${name}`
      );
    }
  }
}

/**
 * Usage Example: Worker Entry Point
 */
export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const config = new Config(env);

    // Type-safe access to bindings
    const db = config.database;
    const kv = config.kv;

    // Environment-aware behavior
    if (config.isProduction) {
      // Enable strict CORS in production
      const origin = request.headers.get('origin');
      if (!isAllowedOrigin(origin)) {
        return new Response('Forbidden', { status: 403 });
      }
    }

    // Use config values
    const ttl = config.cacheTtl;
    const cacheKey = `cache:${new URL(request.url).pathname}`;
    const cached = await kv.get(cacheKey);

    if (cached) {
      return new Response(cached, {
        headers: { 'Content-Type': 'application/json', 'X-Cache': 'HIT' },
      });
    }

    // Fetch data from database
    const data = await db.prepare('SELECT * FROM users LIMIT 10').all();

    // Cache response
    await kv.put(cacheKey, JSON.stringify(data), { expirationTtl: ttl });

    return new Response(JSON.stringify(data), {
      headers: { 'Content-Type': 'application/json', 'X-Cache': 'MISS' },
    });
  },
};

function isAllowedOrigin(origin: string | null): boolean {
  const allowedOrigins = [
    'https://example.com',
    'https://www.example.com',
  ];
  return origin ? allowedOrigins.includes(origin) : false;
}

/**
 * Usage Example: Testing
 */
import { describe, it, expect, beforeEach } from 'vitest';

describe('Config', () => {
  let mockEnv: Env;

  beforeEach(() => {
    mockEnv = {
      DB: {} as D1Database,
      KV: {} as KVNamespace,
      BUCKET: {} as R2Bucket,
      QUEUE: {} as Queue,
      JWT_SECRET: 'test-secret',
      API_KEY: 'test-key',
      ENCRYPTION_KEY: 'test-encryption-key',
      ENVIRONMENT: 'development',
      LOG_LEVEL: 'debug',
    };
  });

  it('should return default cache TTL', () => {
    const config = new Config(mockEnv);
    expect(config.cacheTtl).toBe(3600);
  });

  it('should parse custom cache TTL', () => {
    mockEnv.CACHE_TTL = '7200';
    const config = new Config(mockEnv);
    expect(config.cacheTtl).toBe(7200);
  });

  it('should detect production environment', () => {
    mockEnv.ENVIRONMENT = 'production';
    const config = new Config(mockEnv);
    expect(config.isProduction).toBe(true);
  });

  it('should throw if binding is missing', () => {
    mockEnv.DB = undefined as any;
    const config = new Config(mockEnv);
    expect(() => config.database).toThrow('Missing required binding: DB');
  });

  it('should throw if secret is missing', () => {
    mockEnv.JWT_SECRET = undefined as any;
    const config = new Config(mockEnv);
    expect(() => config.jwtSecret).toThrow('Missing required secret: JWT_SECRET');
  });
});
