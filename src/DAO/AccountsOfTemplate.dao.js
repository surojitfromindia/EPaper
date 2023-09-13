import { AccountsOfTemplate } from "../Models/index.js";
import sequelize from "../Config/DataBase.Config.js";
import { QueryTypes } from "@sequelize/core";

class AccountsOfTemplateDao {
  async create({ account_details }, { transaction }) {
    const account = await AccountsOfTemplate.create(account_details, {
      transaction,
    });
    return await AccountsOfTemplate.findByPk(account.get("id"), {
      include: [
        { model: AccountsOfTemplate, as: "AccountParent" },
        { model: AccountsOfTemplate, as: "AccountGroup" },
        { model: AccountsOfTemplate, as: "AccountType" },
      ],
    });
  }

  async get({ account_id }) {
    return await AccountsOfTemplate.findByPk(account_id);
  }

  async dumpAccounts({ array_of_account_details }, { transaction }) {
    return await AccountsOfTemplate.bulkCreate(array_of_account_details, {
      transaction,
    });
  }

  async createAccountsFromDump({ account_template_id }, { transaction }) {
    return await sequelize.query(
      `
                with recursive sub_accounts as (
                    -- non recursive part
                    select a1.name,
                           a1.code,
                           a1.parent_code,
                           a1.id as id,
                           a1.account_parent_id,
                           0     as depth,
                           a1.account_group_id,
                           a1.account_type_id
                    from "AccountsOfTemplates" as a1
                    where a1.parent_code IS NULL
                      and account_template_id = ${account_template_id}
                    union
                    select a2.name,
                           a2.code,
                           a2.parent_code,
                           a2.id,
                           sb.id,
                           (sb.depth + 1)                                                   as depth,
                           (case when sb.depth = 0 then sb.id else sb.account_group_id end) as account_group_id,
                           (case when sb.depth > 0 then sb.id else sb.account_type_id end) as account_type_id
                    from "AccountsOfTemplates" as a2,
                         sub_accounts sb
                    where sb.code = a2.parent_code
                      and account_template_id = ${account_template_id})
                update "AccountsOfTemplates" ac
                set account_parent_id = sb.account_parent_id,
                    account_group_id  = sb.account_group_id,
                    account_type_id   = sb.account_type_id,
                    depth             = sb.depth
                from sub_accounts sb
                where ac.id = sb.id;
            `,
      {
        transaction,
        type: QueryTypes.UPDATE,
      },
    );
  }

  async getAccountsByTemplateId({ template_id }, { raw = false }) {
    return await AccountsOfTemplate.findAll({
      where: {
        accountTemplateId: template_id,
      },
      raw,
    });
  }
}

export default Object.freeze(new AccountsOfTemplateDao());
