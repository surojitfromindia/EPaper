class AccountTypesDTO {
  static toAccountType(account_type) {
    const account_dto = {
      account_type_name: account_type.name,
      account_type_name_formatted: account_type.nameFormatted,
    };

    if (account_type.AccountGroup) {
      account_dto.account_group_name = account_type.AccountGroup.name;
      account_dto.account_group_name_formatted =
        account_type.AccountGroup.nameFormatted;
    }
    return account_dto;
  }
}

export default AccountTypesDTO;
