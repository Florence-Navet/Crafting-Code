/**
 * A mock is told upfront what it expects, and enforces it itself: a wrong or
 * repeated call fails immediately, and verify() fails a call that never came.
 * A mock is not a spy: the expectation lives inside the double, not in the test.
 */
import type { User } from '../user.js';
import type { UserRepository } from '../user-repository.js';

export class MockUserRepository implements UserRepository {
  private saveCallCount = 0;

  constructor(private readonly expectedEmail: string) {}

  findByEmail(_email: string): User | null {
    return null;
  }

  save(user: User): void {
    if (user.email !== this.expectedEmail) {
      throw new Error(`Expected save("${this.expectedEmail}"), but it was called with "${user.email}"`);
    }

    if (this.saveCallCount > 0) {
      throw new Error(`Expected save("${this.expectedEmail}") once, but it was called again`);
    }

    this.saveCallCount += 1;
  }

  verify(): void {
    if (this.saveCallCount === 0) {
      throw new Error(`Expected save("${this.expectedEmail}"), but it was never called`);
    }
  }
}
