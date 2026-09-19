import { describe, expect, it } from 'vitest';
import { RegistrationService } from '../registration-service.js';
import { MockUserRepository } from './mock.js';

describe('MockUserRepository', () => {
  it('accepts the expected call and verifies it happened', () => {
    const repository = new MockUserRepository('ada@example.com');
    const service = new RegistrationService(repository);

    service.register('ada@example.com', 'correct horse');

    expect(() => repository.verify()).not.toThrow();
  });

  it('fails verification when the expected call never happened', () => {
    const repository = new MockUserRepository('ada@example.com');

    expect(() => repository.verify()).toThrow('never called');
  });

  it('fails at call time when the call does not match the expectation', () => {
    const repository = new MockUserRepository('ada@example.com');
    const service = new RegistrationService(repository);

    expect(() => service.register('grace@example.com', 'correct horse')).toThrow(
      'Expected save("ada@example.com")',
    );
  });
});
