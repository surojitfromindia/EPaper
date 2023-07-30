import {AccountsOfTemplate} from '../Models/index.js';

class AccountsTemplateDao {
    async create({account_details}, {transaction}) {
        const account = await AccountsOfTemplate.create(account_details, {
            transaction
        });
        return await AccountsOfTemplate.findByPk(account.get("id"), {
            include: [{model: AccountsOfTemplate, as: "AccountParent"},
                {model: AccountsOfTemplate, as: "AccountGroup"},
                {model: AccountsOfTemplate, as: "AccountType"}
            ]
        });
    }

    async getAccountDepth({account_id}) {
        const account = await AccountsOfTemplate.findByPk(account_id, {
            attributes: ["depth"]
        });
        return account.get("depth")
    }
}

export default Object.freeze(new AccountsTemplateDao());
