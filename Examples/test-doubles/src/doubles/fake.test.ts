import { describe, expect, it } from 'vitest';
import { DuplicateEmail } from '../errors.js';
import { RegistrationService } from '../registration-service.js';
import { FakeUserRepository } from './fake.js';

describe('FakeUserRepository', () => {
  it('leaves the registered user findable afterwards', () => {
    const repository = new FakeUserRepository();
    const service = new RegistrationService(repository);

    service.register('ada@example.com', 'correct horse');

    expect(repository.findByEmail('ada@example.com')).toEqual({
      email: 'ada@example.com',
      passwordHash: 'hashed:correct horse',
    });
  });

  it('rejects a second registration of the same email', () => {
    const service = new RegistrationService(new FakeUserRepository());

    service.register('ada@example.com', 'correct horse');

    expect(() => service.register('ada@example.com', 'another password')).toThrow(DuplicateEmail);
  });
});
