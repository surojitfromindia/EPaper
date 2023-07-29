// i want to access the database from here in unit call

import {UserModel} from "../Models/index.js";

class UserDao {
    async create(user) {
        return await UserModel.create(user);
    }

    async getAll() {
        return await UserModel.findAll({});
    }
}

export default Object.freeze(new UserDao());
