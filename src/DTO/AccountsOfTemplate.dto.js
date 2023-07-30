class AccountsTemplateDTO {

    static toAccountsOfTemplateDTO(account) {
        const account_dto = {
            account_id: account.id,
            name: account.name,
            code: account.code,
            depth: account.depth,
        }

        if (account.accountParentId) {
            account_dto.account_parent_id = account.accountParentId;
            if (account.AccountParent) account_dto.account_parent = this.toAccountsOfTemplateDTO(account.AccountParent);
        }
        if (account.accountGroupId) {
            account_dto.account_group_id = account.accountGroupIdId;
            if (account.AccountGroup) account_dto.account_group = this.toAccountsOfTemplateDTO(account.AccountGroup);
        }
        if (account.accountTypeId) {
            account_dto.account_type_id = account.accountTypeId;
            if (account.AccountType) account_dto.account_type = this.toAccountsOfTemplateDTO(account.AccountType);
        }
        return account_dto;
    }

    static toAccountsOfTemplateCreate(account_dto) {
        return {
            name: account_dto.name,
            code: account_dto.code,
            accountParentId: account_dto.account_parent_id
        }
    }
}

export default AccountsTemplateDTO