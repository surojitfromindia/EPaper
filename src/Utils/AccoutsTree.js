import { makeTree } from "./Tree.js";
import AccountsOfOrganizationDto from "../DTO/AccountsOfOrganization.dto.js";

class AccountsTree {
  #treeArray;

  constructor(treeArray) {
    this.#treeArray = treeArray;
  }

  static createTreeOfAccounts({ accounts }) {
    // provided the array of accounts, we will try to build a tree
    // in this process we will have some entry which will have a valid
    // parent node, but the parent node will be missing from the array
    // in those cases we will treat those accounts as children of root.
    const tree = makeTree({
      entries: accounts,
      joinFrom: "id",
      joinTo: "accountParentId",
      children_as: "accounts",
    });
    return new AccountsTree(tree);
  }

  static createTreeOfOrganizationAccountsAsDTO({ accounts }) {
    const accountsAsDTO = accounts.map(
      AccountsOfOrganizationDto.toAccountOfOrganization,
    );
    return makeTree({
      entries: accountsAsDTO,
      joinFrom: "account_id",
      joinTo: "account_parent_id",
      children_as: "accounts",
    });
  }

  getTreeArray() {
    return this.#treeArray;
  }
}

export { AccountsTree };
