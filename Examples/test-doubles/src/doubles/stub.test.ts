import { describe, expect, it } from 'vitest';
import { DuplicateEmail } from '../errors.js';
import { RegistrationService } from '../registration-service.js';
import type { User } from '../user.js';
import { StubUserRepository } from './stub.js';

const existingUser: User = { email: 'ada@example.com', passwordHash: 'hashed:whatever' };

describe('StubUserRepository', () => {
  it('drives the duplicate branch by answering with a canned user', () => {
    const service = new RegistrationService(new StubUserRepository(existingUser));

    expect(() => service.register('ada@example.com', 'correct horse')).toThrow(DuplicateEmail);
  });

  it('drives the happy path by answering with nothing', () => {
    const service = new RegistrationService(new StubUserRepository(null));

    expect(service.register('grace@example.com', 'correct horse')).toEqual({
      email: 'grace@example.com',
      passwordHash: 'hashed:correct horse',
    });
  });
});
