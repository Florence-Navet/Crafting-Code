import { describe, expect, it } from 'vitest'
import { AccountNotFoundError, AccountService } from './account-service.ts'
import { StubAccountRepository } from '../test/stub-account-repository.ts'
import { StubAccountHolderRepository } from '../test/StubAccountHolderRepository.ts'


describe('AccountService', () => {
  it('returns the amount of the account', async () => {
      const accountService = new AccountService(
          new StubAccountRepository({ 1: 1000, 2: 250.5 }),
          new StubAccountHolderRepository()
    )

    expect(await accountService.getBalance(2)).toBe(250.5)
  })

  it('throws AccountNotFoundError when the account does not exist', async () => {
      const accountService = new AccountService(
          new StubAccountRepository(),
          new StubAccountHolderRepository()
    )

    await expect(accountService.getBalance(999))
      .rejects
      .toThrow(AccountNotFoundError)
  })

  it('returns the first name of the account holder', async () => {
    const accountService = new AccountService(
      new StubAccountRepository({ 1: 1000 }),
      new StubAccountHolderRepository({
        1: {
          firstName: 'John',
          lastName: 'Doe'
        }
      })
    )

    expect(await accountService.getFirstName(1)).toBe('John')
  })

   it('returns the last name of the account holder', async () => {
    const accountService = new AccountService(
      new StubAccountRepository({ 1: 1000 }),
      new StubAccountHolderRepository({
        1: {
          firstName: 'John',
          lastName: 'Doe'
        }
      })
    )

    expect(await accountService.getLastName(1)).toBe('Doe')
  })

})