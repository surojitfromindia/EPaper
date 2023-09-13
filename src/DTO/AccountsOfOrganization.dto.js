class AccountsOfOrganizationDTO {
  /**
   *
   * @param {COAType} account
   * @returns {COATypeAsDTO}
   */
  static toAccountOfOrganization(account) {
    const account_dto = {
      account_id: account.id,
      name: account.name,
      code: account.code,
      depth: account.depth,
      user_id: account.userId,
      account_type_id: account.accountTypeId,
      account_group_id: account.accountGroupId,
    };
    if (account.accountParentId) {
      account_dto.account_parent_id = account.accountParentId;
      if (account.AccountParent)
        account_dto.account_parent_name = account.AccountParent.name;
    }
    if (account.AccountType) {
      account_dto.account_type_name = account.AccountType.name;
      account_dto.account_type_name_formatted =
        account.AccountType.nameFormatted;
    }

    if (account.AccountGroup) {
      account_dto.account_group_name = account.AccountGroup.name;
      account_dto.account_group_name_formatted =
        account.AccountGroup.nameFormatted;
    }
    return account_dto;
  }

  static toAccountOfOrganizationCreate(account_creation_payload) {
    return {
      name: account_creation_payload.name,
      code: account_creation_payload.code,
      accountParentId: account_creation_payload.account_parent_id,
      accountTemplateId: account_creation_payload.account_template_id,
    };
  }
}

export default AccountsOfOrganizationDTO;
