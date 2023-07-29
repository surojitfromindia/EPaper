// i want to access the database from here in unit call

import {UserModel, UserCredentialModel} from "../Models/index.js";

class UserDao {
    async create({user},{transaction}) {
        return await UserModel.create(user,{transaction: transaction});
    }

    async getAll() {
        return await UserModel.findAll({});
    }
}

export default Object.freeze(new UserDao());
