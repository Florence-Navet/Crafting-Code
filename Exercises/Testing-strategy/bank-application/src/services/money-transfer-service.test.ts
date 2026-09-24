import { describe, expect, it } from 'vitest'
import { MoneyTransferService } from './money-transfer-service.ts'
import { StubAccountRepository } from '../test/stub-account-repository.ts'



describe('MoneyTransferService', () => {
    it('transfers money between two accounts', async () => {
        const accountRepository = new StubAccountRepository({
            1: 1000,
            2: 250
        })

        const moneyTransferService = new MoneyTransferService(accountRepository)

        await moneyTransferService.transfer(1, 2, 200)

        expect(await accountRepository.getAmountById(1)).toBe(800)
        expect(await accountRepository.getAmountById(2)).toBe(450)
    })
})