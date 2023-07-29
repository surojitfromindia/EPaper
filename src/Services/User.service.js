// here I handle business logic
import sequelize from '../Config/DataBase.Config.js';
import { UserCredentialDao, UserDao } from '../DAO/index.js';
import { UserDTO } from '../DTO/index.js';

class UserService {
  async registerUser({ user_details }) {
    const new_user = UserDTO.toUserCreate(user_details);
    try {
      const created_user = await sequelize.transaction(async (t1) => {
        // save a new user to db
        const user_basics = await UserDao.create({ user: new_user }, { transaction: t1 });
        const user_credential = {
          userId: user_basics.id,
          password: user_details.password,
        };
        // save the password on a different table
        await UserCredentialDao.create({ user_credential }, { transaction: t1 });
        return user_basics;
      });
      return UserDTO.toUserDTO(created_user);
    } catch (error) {
      console.log("Something went wrong", error.message)
      return null;
    }
  }

  async getAllUsers() {
    const users = await UserDao.getAll();
    return users.map((user) => UserDTO.toUserDTO(user));
  }
}

export default Object.freeze(new UserService());
