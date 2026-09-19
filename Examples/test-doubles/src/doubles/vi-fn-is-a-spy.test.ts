import { describe, expect, it, vi } from 'vitest';
import { RegistrationService } from '../registration-service.js';
import type { User } from '../user.js';
import type { UserRepository } from '../user-repository.js';

describe('vi.fn()', () => {
  it('is a spy: it only records, and the test verifies afterwards', () => {
    // The double holds no expectation. It answers, it remembers, and it is the
    // assertion at the bottom of the test that decides whether that was right.
    const findByEmail = vi.fn<(email: string) => User | null>(() => null);
    const save = vi.fn<(user: User) => void>();
    const repository: UserRepository = { findByEmail, save };

    new RegistrationService(repository).register('ada@example.com', 'correct horse');

    expect(save).toHaveBeenCalledOnce();
    expect(save).toHaveBeenCalledWith({ email: 'ada@example.com', passwordHash: 'hashed:correct horse' });
  });

  it('is a mock once the expectation moves inside the implementation', () => {
    // Same library function, different role: the expectation now lives in the
    // double and fails at call time, so the test body asserts nothing about it.
    const findByEmail = vi.fn<(email: string) => User | null>(() => null);
    const save = vi.fn<(user: User) => void>(user => {
      if (user.email !== 'ada@example.com') {
        throw new Error(`Expected save("ada@example.com"), but it was called with "${user.email}"`);
      }
    });
    const repository: UserRepository = { findByEmail, save };

    const service = new RegistrationService(repository);

    expect(() => service.register('grace@example.com', 'correct horse')).toThrow(
      'Expected save("ada@example.com")',
    );
  });
});
