// i want to access the database from here in unit call

import {UserCredentialModel} from "../Models/index.js";

class UserCredentialDao {
    async create({user_credential},{transaction}) {
        return await UserCredentialModel.create(user_credential,{transaction: transaction});
    }

    
}

export default Object.freeze(new UserCredentialDao());
