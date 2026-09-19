import type { User } from './user.js';

export interface UserRepository {
  findByEmail(email: string): User | null;
  save(user: User): void;
}
