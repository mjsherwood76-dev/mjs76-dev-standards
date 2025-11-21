/**
 * Authentication Middleware Example
 * 
 * Demonstrates JWT-based authentication for Cloudflare Workers.
 */

import { jwtVerify, SignJWT } from 'jose';

export interface Env {
  JWT_SECRET: string;
}

export interface JWTPayload {
  userId: string;
  email: string;
  role: 'admin' | 'user';
  exp?: number;
  iat?: number;
}

export interface AuthenticatedRequest extends Request {
  user?: JWTPayload;
}

/**
 * Authentication Service
 */
export class AuthService {
  constructor(private env: Env) {}

  /**
   * Create a JWT access token
   */
  async createAccessToken(payload: Omit<JWTPayload, 'exp' | 'iat'>): Promise<string> {
    const secret = new TextEncoder().encode(this.env.JWT_SECRET);

    const token = await new SignJWT(payload as any)
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('24h')
      .sign(secret);

    return token;
  }

  /**
   * Create a refresh token (longer expiry)
   */
  async createRefreshToken(userId: string): Promise<string> {
    const secret = new TextEncoder().encode(this.env.JWT_SECRET);

    const token = await new SignJWT({ userId, type: 'refresh' })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('7d')
      .sign(secret);

    return token;
  }

  /**
   * Verify JWT token
   */
  async verifyToken(token: string): Promise<JWTPayload> {
    try {
      const secret = new TextEncoder().encode(this.env.JWT_SECRET);
      const { payload } = await jwtVerify(token, secret);

      return payload as JWTPayload;
    } catch (error) {
      throw new Error('Invalid or expired token');
    }
  }

  /**
   * Extract token from Authorization header
   */
  extractToken(request: Request): string | null {
    const authHeader = request.headers.get('Authorization');

    if (!authHeader) {
      return null;
    }

    const parts = authHeader.split(' ');

    if (parts.length !== 2 || parts[0] !== 'Bearer') {
      return null;
    }

    return parts[1];
  }
}

/**
 * Authentication Middleware
 */
export async function authMiddleware(
  request: Request,
  env: Env
): Promise<{ user: JWTPayload } | Response> {
  const authService = new AuthService(env);

  // Extract token from Authorization header
  const token = authService.extractToken(request);

  if (!token) {
    return new Response(
      JSON.stringify({ error: 'Missing authentication token' }),
      {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  // Verify token
  try {
    const user = await authService.verifyToken(token);

    return { user };
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Invalid or expired token' }),
      {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}

/**
 * Role-Based Authorization Middleware
 */
export function requireRole(...allowedRoles: Array<'admin' | 'user'>) {
  return (user: JWTPayload): Response | null => {
    if (!allowedRoles.includes(user.role)) {
      return new Response(
        JSON.stringify({ error: 'Insufficient permissions' }),
        {
          status: 403,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    return null; // Authorization successful
  };
}

/**
 * Worker Entry Point with Authentication
 */
export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    // Public routes (no auth required)
    if (url.pathname === '/auth/login' || url.pathname === '/auth/register') {
      return handlePublicRoute(request, env);
    }

    // Protected routes (auth required)
    const authResult = await authMiddleware(request, env);

    if (authResult instanceof Response) {
      // Authentication failed
      return authResult;
    }

    // Authentication successful
    const { user } = authResult;

    // Admin-only routes
    if (url.pathname.startsWith('/admin')) {
      const authzError = requireRole('admin')(user);
      if (authzError) {
        return authzError;
      }

      return handleAdminRoute(request, user, env);
    }

    // Regular protected routes
    return handleProtectedRoute(request, user, env);
  },
};

/**
 * Login Handler
 */
async function handlePublicRoute(request: Request, env: Env): Promise<Response> {
  const url = new URL(request.url);

  if (url.pathname === '/auth/login') {
    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405 });
    }

    const { email, password } = await request.json<{ email: string; password: string }>();

    // TODO: Validate credentials against database
    // This is a simplified example
    const user = {
      userId: '123',
      email: email,
      role: 'user' as const,
    };

    const authService = new AuthService(env);
    const accessToken = await authService.createAccessToken(user);
    const refreshToken = await authService.createRefreshToken(user.userId);

    return new Response(
      JSON.stringify({
        accessToken,
        refreshToken,
        user,
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  return new Response('Not found', { status: 404 });
}

/**
 * Protected Route Handler
 */
async function handleProtectedRoute(
  request: Request,
  user: JWTPayload,
  env: Env
): Promise<Response> {
  // User is authenticated, handle request
  return new Response(
    JSON.stringify({
      message: 'Protected resource',
      user: {
        userId: user.userId,
        email: user.email,
        role: user.role,
      },
    }),
    {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    }
  );
}

/**
 * Admin Route Handler
 */
async function handleAdminRoute(
  request: Request,
  user: JWTPayload,
  env: Env
): Promise<Response> {
  // Admin-only resource
  return new Response(
    JSON.stringify({
      message: 'Admin resource',
      user: {
        userId: user.userId,
        email: user.email,
        role: user.role,
      },
    }),
    {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    }
  );
}

/**
 * Refresh Token Handler
 */
export async function refreshAccessToken(
  refreshToken: string,
  env: Env
): Promise<{ accessToken: string } | Response> {
  const authService = new AuthService(env);

  try {
    const payload = await authService.verifyToken(refreshToken);

    // Verify it's a refresh token
    if ((payload as any).type !== 'refresh') {
      throw new Error('Invalid refresh token');
    }

    // Create new access token
    const newAccessToken = await authService.createAccessToken({
      userId: payload.userId,
      email: payload.email,
      role: payload.role,
    });

    return { accessToken: newAccessToken };
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Invalid refresh token' }),
      {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}

/**
 * Session Management (alternative to JWT)
 * 
 * Use KV to store sessions instead of stateless JWT.
 * Pros: Can revoke sessions, track active sessions
 * Cons: Requires KV lookup on every request (10-50ms latency)
 */
export interface Env_WithKV extends Env {
  SESSIONS: KVNamespace;
}

export class SessionManager {
  constructor(private env: Env_WithKV) {}

  /**
   * Create a new session
   */
  async createSession(user: Omit<JWTPayload, 'exp' | 'iat'>): Promise<string> {
    const sessionId = crypto.randomUUID();

    // Store session in KV
    await this.env.SESSIONS.put(
      `session:${sessionId}`,
      JSON.stringify(user),
      { expirationTtl: 86400 } // 24 hours
    );

    return sessionId;
  }

  /**
   * Get session data
   */
  async getSession(sessionId: string): Promise<JWTPayload | null> {
    const data = await this.env.SESSIONS.get(`session:${sessionId}`);

    if (!data) {
      return null;
    }

    return JSON.parse(data);
  }

  /**
   * Revoke session
   */
  async revokeSession(sessionId: string): Promise<void> {
    await this.env.SESSIONS.delete(`session:${sessionId}`);
  }
}

/**
 * Testing
 */
import { describe, it, expect, beforeEach } from 'vitest';

describe('AuthService', () => {
  let mockEnv: Env;
  let authService: AuthService;

  beforeEach(() => {
    mockEnv = {
      JWT_SECRET: 'test-secret-key-12345',
    };
    authService = new AuthService(mockEnv);
  });

  it('should create and verify access token', async () => {
    const payload: Omit<JWTPayload, 'exp' | 'iat'> = {
      userId: '123',
      email: 'test@example.com',
      role: 'user',
    };

    const token = await authService.createAccessToken(payload);
    expect(token).toBeDefined();

    const verified = await authService.verifyToken(token);
    expect(verified.userId).toBe('123');
    expect(verified.email).toBe('test@example.com');
    expect(verified.role).toBe('user');
  });

  it('should throw on invalid token', async () => {
    await expect(authService.verifyToken('invalid-token')).rejects.toThrow('Invalid or expired token');
  });

  it('should extract token from Authorization header', () => {
    const request = new Request('https://example.com', {
      headers: {
        'Authorization': 'Bearer abc123',
      },
    });

    const token = authService.extractToken(request);
    expect(token).toBe('abc123');
  });

  it('should return null if Authorization header is missing', () => {
    const request = new Request('https://example.com');
    const token = authService.extractToken(request);
    expect(token).toBeNull();
  });
});

describe('requireRole', () => {
  it('should allow admin role', () => {
    const user: JWTPayload = {
      userId: '123',
      email: 'admin@example.com',
      role: 'admin',
    };

    const result = requireRole('admin')(user);
    expect(result).toBeNull(); // No error = allowed
  });

  it('should deny user role for admin-only route', () => {
    const user: JWTPayload = {
      userId: '123',
      email: 'user@example.com',
      role: 'user',
    };

    const result = requireRole('admin')(user);
    expect(result).toBeInstanceOf(Response);
    expect(result?.status).toBe(403);
  });

  it('should allow multiple roles', () => {
    const user: JWTPayload = {
      userId: '123',
      email: 'user@example.com',
      role: 'user',
    };

    const result = requireRole('admin', 'user')(user);
    expect(result).toBeNull(); // Allowed
  });
});
