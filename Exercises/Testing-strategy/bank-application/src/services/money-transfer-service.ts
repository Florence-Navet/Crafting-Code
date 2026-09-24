


import type { AccountRepository } from '../interfaces/account-repository.ts'

class MoneyTransferService {
    private readonly accountRepository: AccountRepository
    constructor(accountRepository: AccountRepository) {
        this.accountRepository = accountRepository
    }

    async transfer (
        fromAcount: number,
        toAcount: number,
        amount: number,
    ): Promise<void> {}



}
export {MoneyTransferService}




