/**
 * Secrets Management Example
 * 
 * Demonstrates how to securely manage secrets in Cloudflare Workers.
 * **NEVER hardcode secrets in your code!**
 */

/**
 * ❌ NEVER DO THIS
 */
// const JWT_SECRET = 'my-secret-key-123'; // ❌ NEVER HARDCODE SECRETS!
// const API_KEY = 'sk_live_abc123'; // ❌ NEVER COMMIT API KEYS!
// const DATABASE_URL = 'postgres://user:pass@host/db'; // ❌ NEVER EXPOSE CREDENTIALS!

/**
 * ✅ ALWAYS DO THIS: Use Wrangler Secrets
 * 
 * 1. Set secrets via CLI:
 *    wrangler secret put JWT_SECRET
 *    wrangler secret put API_KEY
 *    wrangler secret put STRIPE_SECRET_KEY
 * 
 * 2. Access via env binding (type-safe!)
 */

export interface Env {
  JWT_SECRET: string;
  API_KEY: string;
  STRIPE_SECRET_KEY: string;
  SENDGRID_API_KEY: string;
  ENCRYPTION_KEY: string;
}

/**
 * Secret Manager - Centralized access control
 */
export class SecretManager {
  constructor(private env: Env) {}

  /**
   * Get JWT secret for signing tokens
   */
  getJwtSecret(): string {
    this.assertSecret(this.env.JWT_SECRET, 'JWT_SECRET');
    return this.env.JWT_SECRET;
  }

  /**
   * Get external API key
   */
  getApiKey(): string {
    this.assertSecret(this.env.API_KEY, 'API_KEY');
    return this.env.API_KEY;
  }

  /**
   * Get Stripe secret key
   */
  getStripeKey(): string {
    this.assertSecret(this.env.STRIPE_SECRET_KEY, 'STRIPE_SECRET_KEY');
    return this.env.STRIPE_SECRET_KEY;
  }

  /**
   * Get SendGrid API key
   */
  getSendGridKey(): string {
    this.assertSecret(this.env.SENDGRID_API_KEY, 'SENDGRID_API_KEY');
    return this.env.SENDGRID_API_KEY;
  }

  /**
   * Get encryption key for sensitive data
   */
  getEncryptionKey(): string {
    this.assertSecret(this.env.ENCRYPTION_KEY, 'ENCRYPTION_KEY');
    return this.env.ENCRYPTION_KEY;
  }

  /**
   * Assert that a secret exists (fail fast!)
   */
  private assertSecret(secret: unknown, name: string): void {
    if (!secret || typeof secret !== 'string' || secret.trim() === '') {
      throw new Error(
        `Missing or invalid secret: ${name}\n` +
        `To set this secret, run:\n` +
        `  wrangler secret put ${name}\n` +
        `For local development, add to .dev.vars:\n` +
        `  ${name}=your-value-here`
      );
    }
  }
}

/**
 * Example: JWT Token Creation
 */
import { SignJWT } from 'jose';

export async function createAuthToken(
  userId: string,
  env: Env
): Promise<string> {
  const secrets = new SecretManager(env);
  const secret = new TextEncoder().encode(secrets.getJwtSecret());

  const token = await new SignJWT({ userId })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(secret);

  return token;
}

/**
 * Example: External API Call with Secret Key
 */
export async function callExternalApi(
  endpoint: string,
  env: Env
): Promise<Response> {
  const secrets = new SecretManager(env);
  const apiKey = secrets.getApiKey();

  const response = await fetch(endpoint, {
    headers: {
      'Authorization': `Bearer ${apiKey}`, // ✅ Secret from env, not hardcoded
      'Content-Type': 'application/json',
    },
  });

  return response;
}

/**
 * Example: Stripe Payment Processing
 */
export async function createPaymentIntent(
  amount: number,
  currency: string,
  env: Env
): Promise<{ clientSecret: string }> {
  const secrets = new SecretManager(env);
  const stripeKey = secrets.getStripeKey();

  const response = await fetch('https://api.stripe.com/v1/payment_intents', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${stripeKey}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      amount: amount.toString(),
      currency,
    }),
  });

  const data = await response.json();
  return { clientSecret: data.client_secret };
}

/**
 * Example: Data Encryption (for storing sensitive data)
 */
export async function encryptSensitiveData(
  plaintext: string,
  env: Env
): Promise<string> {
  const secrets = new SecretManager(env);
  const key = secrets.getEncryptionKey();

  // Use Web Crypto API
  const encoder = new TextEncoder();
  const data = encoder.encode(plaintext);

  const cryptoKey = await crypto.subtle.importKey(
    'raw',
    encoder.encode(key),
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt']
  );

  const iv = crypto.getRandomValues(new Uint8Array(12));
  const encrypted = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    cryptoKey,
    data
  );

  // Combine IV + encrypted data and encode as base64
  const combined = new Uint8Array(iv.length + encrypted.byteLength);
  combined.set(iv);
  combined.set(new Uint8Array(encrypted), iv.length);

  return btoa(String.fromCharCode(...combined));
}

export async function decryptSensitiveData(
  ciphertext: string,
  env: Env
): Promise<string> {
  const secrets = new SecretManager(env);
  const key = secrets.getEncryptionKey();

  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  // Decode base64
  const combined = Uint8Array.from(atob(ciphertext), c => c.charCodeAt(0));

  const iv = combined.slice(0, 12);
  const encrypted = combined.slice(12);

  const cryptoKey = await crypto.subtle.importKey(
    'raw',
    encoder.encode(key),
    { name: 'AES-GCM', length: 256 },
    false,
    ['decrypt']
  );

  const decrypted = await crypto.subtle.decrypt(
    { name: 'AES-GCM', iv },
    cryptoKey,
    encrypted
  );

  return decoder.decode(decrypted);
}

/**
 * Local Development Setup (.dev.vars)
 * 
 * Create a `.dev.vars` file in your project root:
 * 
 * ```
 * # .dev.vars (DO NOT COMMIT THIS FILE!)
 * JWT_SECRET=local-dev-secret-12345
 * API_KEY=sk_test_abc123
 * STRIPE_SECRET_KEY=sk_test_xyz789
 * SENDGRID_API_KEY=SG.abc123
 * ENCRYPTION_KEY=32-character-encryption-key-here
 * ```
 * 
 * Add to .gitignore:
 * ```
 * .dev.vars
 * ```
 */

/**
 * Production Setup
 * 
 * 1. Set secrets via Wrangler CLI:
 *    ```bash
 *    wrangler secret put JWT_SECRET
 *    # Prompt: Enter JWT_SECRET: ****
 *    
 *    wrangler secret put API_KEY
 *    # Prompt: Enter API_KEY: ****
 *    ```
 * 
 * 2. Verify secrets are set:
 *    ```bash
 *    wrangler secret list
 *    ```
 * 
 * 3. Secrets are encrypted and stored securely by Cloudflare.
 *    They are NOT visible in the dashboard or wrangler.toml.
 */

/**
 * Rotating Secrets
 * 
 * 1. Update the secret:
 *    ```bash
 *    wrangler secret put JWT_SECRET
 *    # Enter new value
 *    ```
 * 
 * 2. Deploy new version:
 *    ```bash
 *    wrangler deploy
 *    ```
 * 
 * 3. Monitor for errors (old tokens will fail validation).
 * 
 * 4. For zero-downtime rotation, use versioned secrets:
 *    - JWT_SECRET_V1 (old, still validate)
 *    - JWT_SECRET_V2 (new, use for signing)
 */

/**
 * Security Best Practices
 * 
 * ✅ DO:
 * - Use wrangler secret put for all sensitive values
 * - Store secrets in .dev.vars for local development
 * - Add .dev.vars to .gitignore
 * - Rotate secrets regularly (90 days)
 * - Use different secrets for dev/staging/prod
 * - Validate secret format (length, prefix, etc.)
 * 
 * ❌ DON'T:
 * - Hardcode secrets in source code
 * - Commit secrets to version control
 * - Share secrets via Slack/email
 * - Log secrets (even in dev!)
 * - Reuse secrets across projects
 * - Store secrets in wrangler.toml
 */

/**
 * Testing with Mock Secrets
 */
import { describe, it, expect } from 'vitest';

describe('SecretManager', () => {
  it('should throw if secret is missing', () => {
    const mockEnv = {} as Env;
    const secrets = new SecretManager(mockEnv);

    expect(() => secrets.getJwtSecret()).toThrow('Missing or invalid secret: JWT_SECRET');
  });

  it('should throw if secret is empty string', () => {
    const mockEnv = { JWT_SECRET: '' } as Env;
    const secrets = new SecretManager(mockEnv);

    expect(() => secrets.getJwtSecret()).toThrow('Missing or invalid secret: JWT_SECRET');
  });

  it('should return secret if valid', () => {
    const mockEnv = { JWT_SECRET: 'valid-secret' } as Env;
    const secrets = new SecretManager(mockEnv);

    expect(secrets.getJwtSecret()).toBe('valid-secret');
  });
});

describe('Encryption', () => {
  const mockEnv = {
    ENCRYPTION_KEY: '12345678901234567890123456789012', // 32 characters
  } as Env;

  it('should encrypt and decrypt data', async () => {
    const plaintext = 'sensitive data';

    const encrypted = await encryptSensitiveData(plaintext, mockEnv);
    expect(encrypted).not.toBe(plaintext);

    const decrypted = await decryptSensitiveData(encrypted, mockEnv);
    expect(decrypted).toBe(plaintext);
  });
});
