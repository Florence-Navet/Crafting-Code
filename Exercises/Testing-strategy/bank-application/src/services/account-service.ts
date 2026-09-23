import type { AccountRepository } from '../interfaces/account-repository.ts'
import { AccountHolderRepository } from '../interfaces/account-holder-repository.ts'

class AccountNotFoundError extends Error {
  constructor(accountId: number) {
    super(`Account ${accountId} not found`)
    this.name = 'AccountNotFoundError'
  }
}

class AccountService {
  private readonly accountRepository: AccountRepository
  private readonly accountHolderRepository: AccountHolderRepository

  constructor(
    accountRepository: AccountRepository,
    accountHolderRepository: AccountHolderRepository
  ) {
    this.accountRepository = accountRepository
    this.accountHolderRepository = accountHolderRepository
  }

  async getBalance(accountId: number): Promise<number> {
    const amount = await this.accountRepository.getAmountById(accountId)

    if (amount === undefined) {
      throw new AccountNotFoundError(accountId)
    }

    return amount
  }

  async getFirstName(accountId: number): Promise<string> {
    const firstName =
      await this.accountHolderRepository.getFirstNameByAccountId(accountId)

    if (firstName === undefined) {
      throw new AccountNotFoundError(accountId)
    }

    return firstName
  }

  async getLastName(accountId: number): Promise<string> {
    const lastName =
      await this.accountHolderRepository.getLastNameByAccountId(accountId)

    if (lastName === undefined) {
      throw new AccountNotFoundError(accountId)
    }

    return lastName
  }

  async transferMoney(
      fromAccountId: number,
      toAccountId: number,
      amount: number
  ) {
    const fromAmount = await this.getBalance(fromAccountId)
    const toAmount = await this.getBalance(toAccountId)

    await this.accountRepository.updateAmountById(
        fromAccountId,
        fromAmount - amount
    )

    await this.accountRepository.updateAmountById(
        toAccountId,
        toAmount + amount
    )
  }
}

export { AccountNotFoundError, AccountService }