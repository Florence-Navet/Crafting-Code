import { DuplicateEmail, InvalidPassword } from './errors.js';
import type { User } from './user.js';
import type { UserRepository } from './user-repository.js';

const MINIMUM_PASSWORD_LENGTH = 8;

export class RegistrationService {
  constructor(private readonly users: UserRepository) {}

  register(email: string, password: string): User {
    if (password.length < MINIMUM_PASSWORD_LENGTH) throw new InvalidPassword();
    if (this.users.findByEmail(email) !== null) throw new DuplicateEmail();

    // Not real hashing. Never do this outside a teaching example.
    const user: User = { email, passwordHash: `hashed:${password}` };
    this.users.save(user);

    return user;
  }
}
