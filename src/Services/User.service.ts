// here I handle business logic
import sequelize from "../Config/DataBase.Config";
import { UserDao } from "../DAO/index";
import { UserDTO } from "../DTO/index";
import { DataNotFoundError } from "../Errors/APIErrors/index";

class UserService {
  async registerUser({ user_details }) {
    const newUser = UserDTO.toUserCreate(user_details);
    const createdUser = await sequelize.transaction(async (t1) => {
      return await UserDao.create({ user: newUser }, { transaction: t1 });
    });
    return UserDTO.toUser(createdUser);
  }

  async getAllUsers() {
    const users = await UserDao.getAll();
    return users.map((user) => UserDTO.toUser(user));
  }

  async getUserById({ user_id, include_organization_details = false }) {
    let user: any;
    if (include_organization_details) {
      user = await UserDao.getUserByIdWithOrganization({ user_id });
    } else {
      user = await UserDao.getUserById({ user_id });
    }
    if (user) {
      return UserDTO.toUser(user);
    }
    throw new DataNotFoundError();
  }

  async getUserByClientId({ client_id, include_organization_details = false }) {
    let user;
    if (include_organization_details) {
      user = await UserDao.getUserByClientIdWithOrganization({ client_id });
    } else {
      user = await UserDao.getUserByClientId({ client_id });
    }
    if (user) {
      return UserDTO.toUser(user);
    }
    throw new DataNotFoundError("no user found");
  }
}

export default Object.freeze(new UserService());
