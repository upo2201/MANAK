import { describe, it, expect } from 'vitest';
import { findUserByEmail, createUser, createSession, getUserByToken } from '../src/db/userRepo.js';

describe('MANAK AI Authentication & User Identity Tests', () => {
  it('should find seeded demo user', () => {
    const demoUser = findUserByEmail('demo@manak.ai');
    expect(demoUser).toBeDefined();
    expect(demoUser?.name).toBe('Demo Manufacturer');
    expect(demoUser?.isDemo).toBe(true);
    expect(demoUser?.profile?.role).toBe('Manufacturer');
  });

  it('should create a new user and issue a valid session token', () => {
    const newUser = createUser({
      email: 'test.manufacturer@manak.ai',
      name: 'Test Manufacturer',
      authProvider: 'email'
    });

    expect(newUser.id).toBeDefined();
    expect(newUser.email).toBe('test.manufacturer@manak.ai');

    const token = createSession(newUser.id);
    expect(token).toContain('session-');

    const retrievedUser = getUserByToken(token);
    expect(retrievedUser?.id).toBe(newUser.id);
    expect(retrievedUser?.name).toBe('Test Manufacturer');
  });
});
