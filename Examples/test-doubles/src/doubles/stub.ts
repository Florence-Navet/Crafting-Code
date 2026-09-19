/**
 * A stub answers queries with canned data, so the test can steer the code under
 * test down a chosen branch. A stub is not a spy: it has no memory of being
 * called, and nothing about it is ever asserted on.
 */
import type { User } from '../user.js';
import type { UserRepository } from '../user-repository.js';

export class StubUserRepository implements UserRepository {
  constructor(private readonly existing: User | null = null) {}

  findByEmail(_email: string): User | null {
    return this.existing;
  }

  save(_user: User): void {}
}
