import { describe, expect, it } from 'vitest'
import { AccountService } from '../services/account-service.ts'
import { StubAccountRepository } from '../test/stub-account-repository.ts'
import { AccountController } from './account-controller.ts'
import {StubUserRepository} from "../test/stub-user-repository.ts";

function createController(): AccountController {
  const accountRepository = new StubAccountRepository({
    123456789: {
      balance: 50,
      userId: 1,
    },
  })

  const userRepository = new StubUserRepository({
    1: {
      firstName: 'John',
      lastName: 'Doe',
    },
  })

  return new AccountController(
      new AccountService(accountRepository, userRepository)
  )
}

describe('AccountController.getBalance', () => {
  it('accepts an id of 9 digits', async () => {
    const accountController = createController()

    expect(await accountController.getBalance('123456789')).toEqual({
      statusCode: 200,
      body: {
        balance: 50,
        firstName: 'John',
        lastName: 'Doe',
      },
    })
  })

  it('rejects an id of 10 digits or more with 400', async () => {
    const accountController = createController()

    expect(await accountController.getBalance('1234567890')).toEqual({
      statusCode: 400,
      body: { error: 'Invalid account id' },
    })
  })
})
