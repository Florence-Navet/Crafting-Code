/**
 * A spy records what it was asked to do, so the test can inspect it afterwards.
 * A spy is not a mock: it holds no expectations of its own and never fails a
 * test by itself — verification happens in the test body, after the fact.
 */
import type { User } from '../user.js';
import type { UserRepository } from '../user-repository.js';

export class SpyUserRepository implements UserRepository {
  readonly saved: User[] = [];

  findByEmail(_email: string): User | null {
    return null;
  }

  save(user: User): void {
    this.saved.push(user);
  }
}
