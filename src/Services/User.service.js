// here I handle business logic
import sequelize from '../Config/DataBase.Config.js';
import {UserDao} from '../DAO/index.js';
import {UserDTO} from '../DTO/index.js';
import {DataNotFoundError} from "../Errors/APIErrors/index.js";

class UserService {
    async registerUser({user_details}) {
        const newUser = UserDTO.toUserCreate(user_details);
        const createdUser = await sequelize.transaction(async (t1) => {
            return await UserDao.create({user: newUser}, {transaction: t1});
        });
        return UserDTO.toUserDTO(createdUser);
    }

    async getAllUsers() {
        const users = await UserDao.getAll();
        return users.map((user) => UserDTO.toUserDTO(user));
    }


    async getAnUserWithOrganization({user_id}) {
        const user = await UserDao.getAnUserWithOrganization({user_id});
        if (user) {
            return UserDTO.toUserDTO(user);
        }
        throw new DataNotFoundError();
    }
}

export default Object.freeze(new UserService());
