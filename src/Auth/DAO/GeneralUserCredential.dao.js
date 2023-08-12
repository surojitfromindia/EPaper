// i want to access the database from here in unit call

import {GeneralUserCredential} from "../Models/index.js";

class GeneralUserCredentialDao {
    async create({user_credential}, {transaction}) {
        return GeneralUserCredential.create(user_credential, {transaction: transaction});
    }


}

export default Object.freeze(new GeneralUserCredentialDao());
