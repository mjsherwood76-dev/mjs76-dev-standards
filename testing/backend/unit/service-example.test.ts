import { describe, it, expect, beforeEach } from 'vitest';

/**
 * Example: Testing a backend service function
 * 
 * This demonstrates unit testing a service layer that contains business logic.
 * Services should be pure functions when possible, making them easy to test.
 */

// Example service function
interface User {
  id: string;
  email: string;
  role: 'admin' | 'user' | 'guest';
  createdAt: Date;
}

interface CreateUserInput {
  email: string;
  role?: 'admin' | 'user' | 'guest';
}

class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function createUser(input: CreateUserInput): User {
  // Validation
  if (!input.email) {
    throw new ValidationError('Email is required');
  }

  if (!validateEmail(input.email)) {
    throw new ValidationError('Invalid email format');
  }

  // Business logic
  const user: User = {
    id: crypto.randomUUID(),
    email: input.email.toLowerCase().trim(),
    role: input.role || 'user',
    createdAt: new Date(),
  };

  return user;
}

// ============================================================================
// TESTS
// ============================================================================

describe('UserService - createUser', () => {
  // Happy path
  it('should create user with valid email', () => {
    const input: CreateUserInput = {
      email: 'test@example.com',
    };

    const user = createUser(input);

    expect(user.email).toBe('test@example.com');
    expect(user.role).toBe('user');
    expect(user.id).toBeDefined();
    expect(user.createdAt).toBeInstanceOf(Date);
  });

  it('should normalize email to lowercase', () => {
    const input: CreateUserInput = {
      email: 'Test@EXAMPLE.COM',
    };

    const user = createUser(input);

    expect(user.email).toBe('test@example.com');
  });

  it('should trim whitespace from email', () => {
    const input: CreateUserInput = {
      email: '  test@example.com  ',
    };

    const user = createUser(input);

    expect(user.email).toBe('test@example.com');
  });

  it('should accept custom role', () => {
    const input: CreateUserInput = {
      email: 'admin@example.com',
      role: 'admin',
    };

    const user = createUser(input);

    expect(user.role).toBe('admin');
  });

  it('should default to user role when not specified', () => {
    const input: CreateUserInput = {
      email: 'test@example.com',
    };

    const user = createUser(input);

    expect(user.role).toBe('user');
  });

  // Validation errors
  it('should throw ValidationError when email is missing', () => {
    const input = { email: '' };

    expect(() => createUser(input)).toThrow(ValidationError);
    expect(() => createUser(input)).toThrow('Email is required');
  });

  it('should throw ValidationError when email format is invalid', () => {
    const invalidEmails = [
      'not-an-email',
      '@example.com',
      'test@',
      'test @example.com',
      'test..test@example.com',
    ];

    invalidEmails.forEach((email) => {
      expect(() => createUser({ email })).toThrow(ValidationError);
      expect(() => createUser({ email })).toThrow('Invalid email format');
    });
  });

  // Edge cases
  it('should handle email with plus addressing', () => {
    const input: CreateUserInput = {
      email: 'user+tag@example.com',
    };

    const user = createUser(input);

    expect(user.email).toBe('user+tag@example.com');
  });

  it('should handle email with subdomain', () => {
    const input: CreateUserInput = {
      email: 'test@mail.example.com',
    };

    const user = createUser(input);

    expect(user.email).toBe('test@mail.example.com');
  });
});

/**
 * Key Testing Patterns Demonstrated:
 * 
 * 1. **Arrange-Act-Assert**: Each test clearly separates setup, execution, and verification
 * 2. **Descriptive Names**: Test names explain expected behavior in plain English
 * 3. **Multiple Assertions**: Related checks grouped in single test
 * 4. **Error Testing**: Use `.toThrow()` to verify exception handling
 * 5. **Edge Cases**: Test boundary conditions and unusual inputs
 * 6. **Type Safety**: TypeScript interfaces ensure test data matches contracts
 * 
 * To Run:
 * ```bash
 * npx vitest testing/backend/unit/service-example.test.ts
 * ```
 */
