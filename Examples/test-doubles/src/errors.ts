export class InvalidPassword extends Error {
  constructor() {
    super('Password must be at least 8 characters long');
    this.name = 'InvalidPassword';
  }
}

export class DuplicateEmail extends Error {
  constructor() {
    super('A user is already registered with this email');
    this.name = 'DuplicateEmail';
  }
}
