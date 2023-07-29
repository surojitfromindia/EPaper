// i want to access the database from here in unit call

import User from "../Models/User.model.js";

class UserDao {
  async create(user) {
   const created_user = await User.create(user);
   return created_user;
  }

  async getAll(){
    const users = await User.findAll({});
    return users;
  }
}
export default Object.freeze(new UserDao());
