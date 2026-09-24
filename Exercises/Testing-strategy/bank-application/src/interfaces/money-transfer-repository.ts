abstract class MoneyTransferRepository {
    abstract getAmountById(
        accountId: number
    ): Promise<number | undefined>

    abstract updateAmountById(
        accountId: number,
        amount: number
    ): Promise<void>
}

export { MoneyTransferRepository }