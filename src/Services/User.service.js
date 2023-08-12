// here I handle business logic
import sequelize from '../Config/DataBase.Config.js';
import {UserDao} from '../DAO/index.js';
import {UserDTO} from '../DTO/index.js';

class UserService {
    async registerUser({user_details}) {
        const new_user = UserDTO.toUserCreate(user_details);
        try {
            const created_user = await sequelize.transaction(async (t1) => {
                // save a new user to db
                return await UserDao.create({user: new_user}, {transaction: t1});
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

    async getAnUserWithOrganization({user_id}) {
        try {
            const user = await UserDao.getAnUserWithOrganization({user_id});
            return UserDTO.toUserDTO(user);
            // return  user;
        } catch (error) {
            console.log("Something went wrong", error.message)
            return null;
        }
    }
}

export default Object.freeze(new UserService());
