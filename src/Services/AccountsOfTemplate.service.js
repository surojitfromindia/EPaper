// here I handle business logic
import sequelize from '../Config/DataBase.Config.js';
import {AccountsOfTemplateDao} from '../DAO/index.js';
import {AccountsOfTemplateDTO} from "../DTO/index.js";

class AccountsOfTemplateService {
    async create({account_details}) {
        const new_account = AccountsOfTemplateDTO.toAccountsOfTemplateCreate(account_details);
        try {
            return await sequelize.transaction(async (t1) => {

                //set default values
                new_account.depth = 0;

                //check if a parent id is provided, and we get the depth of the parent and add 1 to it
                if (new_account.accountParentId) {
                    const parent_account = await AccountsOfTemplateDao.get({account_id: new_account.accountParentId})
                    if (parent_account === null) {
                        throw new Error("Parent account not found")
                    }
                    new_account.depth = parent_account.depth + 1;
                }

                //todo: check template id

                const created_account = await AccountsOfTemplateDao.create({account_details: new_account}, {transaction: t1});
                return AccountsOfTemplateDTO.toAccountsOfTemplateDTO(created_account)
            })
        } catch (error) {
            console.log("Something went wrong", error.message)
            return null;
        }
    }

    // async getAllUsers() {
    //   const users = await UserDao.getAll();
    //   return users.map((user) => GeneralUserDto.toUserDTO(user));
    // }
}

export default Object.freeze(new AccountsOfTemplateService());
