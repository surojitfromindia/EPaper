import { Tree } from "./Tree.js";
import AccountsOfOrganizationDto from "../DTO/AccountsOfOrganization.dto.js";

class AccountsTree {
  #treeArray;

  constructor(treeArray) {
    this.#treeArray = treeArray;
  }

  // make a tree of an accounts from an unordered array of accounts
  static createTreeOfAccounts({ accounts }) {
    // provided the array of accounts, we will try to build a tree
    // in this process we will have some entry which will have a valid
    // parent node, but the parent node will be missing from the array
    // in those cases we will treat those accounts as children of root.
    const tree = Tree.makeTree({
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
    return new AccountsTree(
      Tree.makeTree({
        entries: accountsAsDTO,
        joinFrom: "account_id",
        joinTo: "account_parent_id",
        children_as: "accounts",
        children_count_as: "no_of_children",
      }),
    );
  }

  flatArrayFromTreeAsDTO() {
    const accounts = [];
    // traverse the whole tree.
    for (const rootNode of this.#treeArray) {
      const flatArray = Tree.traverseTree(rootNode, "accounts");
      accounts.push(...flatArray);
    }
    return accounts;
  }

  getTreeArray() {
    return this.#treeArray;
  }
}

export { AccountsTree };
