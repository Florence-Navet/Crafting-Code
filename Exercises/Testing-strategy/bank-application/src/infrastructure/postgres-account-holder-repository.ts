import type pg from 'pg'
import { AccountHolderRepository } from '../interfaces/account-holder-repository.ts'

class PostgresAccountHolderRepository extends AccountHolderRepository {
  private readonly pool: pg.Pool

  constructor(pool: pg.Pool) {
    super()
    this.pool = pool
  }

  async getFirstNameByAccountId(accountId: number): Promise<string | undefined> {
    const accountResult = await this.pool.query<{ user_id: number }>(
      'SELECT user_id FROM account WHERE id = $1',
      [accountId]
    )

    const account = accountResult.rows[0]

    if (account === undefined) {
      return undefined
    }

    const userResult = await this.pool.query<{ first_name: string }>(
      'SELECT first_name FROM "user" WHERE id = $1',
      [account.user_id]
    )

    const user = userResult.rows[0]

    return user === undefined ? undefined : user.first_name
  }

  async getLastNameByAccountId(accountId: number): Promise<string | undefined> {
    const accountResult = await this.pool.query<{ user_id: number }>(
      'SELECT user_id FROM account WHERE id = $1',
      [accountId]
    )

    const account = accountResult.rows[0]

    if (account === undefined) {
      return undefined
    }

    const userResult = await this.pool.query<{ last_name: string }>(
      'SELECT last_name FROM "user" WHERE id = $1',
      [account.user_id]
    )

    const user = userResult.rows[0]

    return user === undefined ? undefined : user.last_name
  }
}

export { PostgresAccountHolderRepository }