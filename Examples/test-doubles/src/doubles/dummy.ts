/**
 * A dummy exists only to fill a parameter. It is never meant to be used, so
 * every method throws loudly if it ever is. A dummy is not a stub: it returns
 * nothing useful, because the code under test should never get far enough to ask.
 */
import type { User } from '../user.js';
import type { UserRepository } from '../user-repository.js';

export class DummyUserRepository implements UserRepository {
  findByEmail(_email: string): User | null {
    throw new Error('DummyUserRepository should never be called');
  }

  save(_user: User): void {
    throw new Error('DummyUserRepository should never be called');
  }
}
