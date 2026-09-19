import { describe, expect, it } from 'vitest';
import { InvalidPassword } from '../errors.js';
import { RegistrationService } from '../registration-service.js';
import { DummyUserRepository } from './dummy.js';

describe('DummyUserRepository', () => {
  it('is never reached when the password guard rejects the request', () => {
    const service = new RegistrationService(new DummyUserRepository());

    expect(() => service.register('ada@example.com', 'abc')).toThrow(InvalidPassword);
  });
});
