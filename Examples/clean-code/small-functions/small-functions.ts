type User = { id: string; email: string }

declare const users: {
  findByEmail(email: string): Promise<User | null>
  insert(user: { email: string; passwordHash: string }): Promise<User>
}
declare const mailer: { send(to: string, subject: string, body: string): Promise<void> }
declare const logger: { info(message: string): void }
declare function hash(plain: string): Promise<string>

// ❌ Bad — validation, persistence, notification and logging in one breath.
async function registerUserBad(email: string, password: string): Promise<User> {
  if (!email.includes('@')) throw new Error('Invalid email')
  if (password.length < 12) throw new Error('Password too short')

  const existing = await users.findByEmail(email)
  if (existing !== null) throw new Error('Email already registered')

  const passwordHash = await hash(password)
  const user = await users.insert({ email, passwordHash })

  await mailer.send(email, 'Welcome!', `Welcome ${email}, your account is ready.`)
  logger.info(`user registered: ${user.id}`)

  return user
}

// ✅ Good — one job per function; the orchestrator reads like a summary.
async function registerUser(email: string, password: string): Promise<User> {
  assertCredentialsAreValid(email, password)
  await assertEmailIsAvailable(email)

  const user = await createUser(email, password)
  await sendWelcomeEmail(user)

  return user
}

function assertCredentialsAreValid(email: string, password: string): void {
  if (!email.includes('@')) throw new Error('Invalid email')
  if (password.length < 12) throw new Error('Password too short')
}

async function assertEmailIsAvailable(email: string): Promise<void> {
  const existing = await users.findByEmail(email)
  if (existing !== null) throw new Error('Email already registered')
}

async function createUser(email: string, password: string): Promise<User> {
  const passwordHash = await hash(password)
  const user = await users.insert({ email, passwordHash })
  logger.info(`user registered: ${user.id}`)

  return user
}

async function sendWelcomeEmail(user: User): Promise<void> {
  await mailer.send(user.email, 'Welcome!', `Welcome ${user.email}, your account is ready.`)
}

export { registerUserBad, registerUser }
