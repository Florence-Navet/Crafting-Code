import { AccountHolderRepository } from "../interfaces/account-holder-repository.ts";



type AccountHolder = {
  firstName: string;
  lastName: string;
};

export class StubAccountHolderRepository extends AccountHolderRepository {
  constructor(
    private readonly accountHolders: Record<number, AccountHolder> = {},
  ) {
    super();
  }

  async getFirstNameByAccountId(
    accountId: number,
  ): Promise<string | undefined> {
    return this.accountHolders[accountId]?.firstName;
  }

  async getLastNameByAccountId(accountId: number): Promise<string | undefined> {
    return this.accountHolders[accountId]?.lastName;
  }
}
