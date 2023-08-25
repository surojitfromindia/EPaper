class AccountsOfOrganizationDTO {
  static toAccountOfOrganization(account) {
    const account_dto = {
      account_id: account.id,
      name: account.name,
      code: account.code,
      depth: account.depth,
    };

    if (account.accountParentId) {
      account_dto.account_parent_id = account.accountParentId;
      if (account.AccountParent)
        account_dto.account_parent = this.toAccountsOfTemplate(
          account.AccountParent,
        );
    }
    if (account.accountGroupId) {
      account_dto.account_group_id = account.accountGroupIdId;
      if (account.AccountGroup)
        account_dto.account_group = this.toAccountsOfTemplate(
          account.AccountGroup,
        );
    }
    if (account.accountTypeId) {
      account_dto.account_type_id = account.accountTypeId;
      if (account.AccountType)
        account_dto.account_type = this.toAccountsOfTemplate(
          account.AccountType,
        );
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