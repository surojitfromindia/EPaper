import { AccountsOfItem } from "../Services";
import { ClientInfo } from "../Middlewares/Authorization/Authorization.middleware";

class AccountIntegrity {
  clientInfo: ClientInfo;
  constructor({ client_info }) {
    this.clientInfo = client_info;
  }

  /**
   * check if accounts are valid for items
   */
  async checkForItemAccounts({
    sales_account_id,
    purchase_account_id,
    inventory_account_id,
  }: {
    sales_account_id?: number;
    purchase_account_id?: number;
    inventory_account_id?: number;
  }) {
    const accountOfItem = new AccountsOfItem({
      client_info: this.clientInfo,
    });
    const errors = [];
    const {
      purchase_accounts_list,
      income_accounts_list,
      inventory_accounts_list,
    } = await accountOfItem.getAccountsForItem();
    if (sales_account_id) {
      const isValidAccount = income_accounts_list.some(
        (acc) => acc.id === sales_account_id,
      );
      if (!isValidAccount) errors.push(new Error("sales account is not valid"));
    }
    if (purchase_account_id) {
      const isValidAccount = purchase_accounts_list.some(
        (acc) => acc.id === purchase_account_id,
      );
      if (!isValidAccount)
        errors.push(new Error("purchase account is not valid"));
    }
    if (inventory_account_id) {
      const isValidAccount = inventory_accounts_list.some(
        (acc) => acc.id === inventory_account_id,
      );
      if (!isValidAccount)
        errors.push(new Error("inventory account is not valid"));
    }

    return errors.length > 0
      ? {
          errors,
          valid: false,
        }
      : {
          errors: [],
          valid: true,
        };
  }
}

export default AccountIntegrity;
