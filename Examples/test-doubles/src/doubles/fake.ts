/**
 * A fake is a real, working implementation that takes a shortcut — here, a Map
 * instead of a database. A fake is not a stub: its answers come from its own
 * behaviour rather than from canned values, so saving something changes what a
 * later lookup returns.
 */
import type { User } from '../user.js';
import type { UserRepository } from '../user-repository.js';

export class FakeUserRepository implements UserRepository {
  private readonly usersByEmail = new Map<string, User>();

  findByEmail(email: string): User | null {
    return this.usersByEmail.get(email) ?? null;
  }

  save(user: User): void {
    this.usersByEmail.set(user.email, user);
  }
}
