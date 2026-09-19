import { describe, expect, it } from 'vitest';
import { RegistrationService } from '../registration-service.js';
import { SpyUserRepository } from './spy.js';

describe('SpyUserRepository', () => {
  it('records the save so the test can verify it afterwards', () => {
    const repository = new SpyUserRepository();
    const service = new RegistrationService(repository);

    service.register('ada@example.com', 'hunter2butlonger');

    expect(repository.saved).toHaveLength(1);
    expect(repository.saved[0]?.email).toBe('ada@example.com');
    expect(repository.saved[0]?.passwordHash).not.toBe('hunter2butlonger');
  });
});
