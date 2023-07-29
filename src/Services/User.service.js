// here I handle business logic
import {UserDao} from '../DAO/index.js';
import {UserDTO} from '../DTO/index.js';


class UserService {

    async registerUser({user_details}) {
        const new_user = UserDTO.toUserCreate(user_details);
        const created_user = await UserDao.create(new_user);
        return UserDTO.toUserDTO(created_user);
    }

    async getAllUsers() {
        const users = await UserDao.getAll();
        return users.map(user => UserDTO.toUserDTO(user));
    }

}

export default Object.freeze(new UserService());
