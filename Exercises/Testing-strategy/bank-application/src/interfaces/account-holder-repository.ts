export abstract class AccountHolderRepository {
  abstract getFirstNameByAccountId(
    accountId: number,
  ): Promise<string | undefined>;

  abstract getLastNameByAccountId(
    accountId: number,
  ): Promise<string | undefined>;
}
