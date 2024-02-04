import { AccountTypesDTO } from "./index";

class AccountsOfOrganizationDTO {
  static toAccountOfOrganization(account: any) {
    const account_dto: any = {
      account_id: account.id,
      account_name: account.name,
      account_code: account.code,
      depth: account.depth,
      is_system_account: account.isSystemAccount ?? false,
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

  static toAccountOfOrganizationCreate(account_creation_payload: any): any {
    return {
      name: account_creation_payload.account_name,
      code: account_creation_payload.account_code,
      accountParentId: account_creation_payload.account_parent_id ?? null,
      accountTypeName: account_creation_payload.account_type_name,
      description: account_creation_payload.description ?? "",
    };
  }

  static toAccountEditPage({
    account_types,
    account_list_as_dto,
    account_details,
  }) {
    const basic_data = {
      account_types: account_types.map(AccountTypesDTO.toAccountType),
      accounts_list: account_list_as_dto,
    };
    if (account_details) {
      basic_data["chart_of_account"] =
        this.toAccountOfOrganization(account_details);
    }
    return basic_data;
  }
}

export default AccountsOfOrganizationDTO;
