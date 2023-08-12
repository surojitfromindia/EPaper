// here I handle business logic
import sequelize from '../../Config/AuthDataBase.Config.js';
import {GeneralUserCredentialDao, GeneralUserDao} from '../DAO/index.js';
import {GeneralUserDTO} from '../DTO/index.js';

class GeneralUserService {
    #user;
    #email

    /**
     * Register or create a new user in this platform. our api and auth platform is separated.
     * @param user_details
     * @returns {Promise<{user_id: *, last_name: *, middle_name: *, first_name: *, email: *}>}
     */
    static async registerUser({user_details}) {
        const new_user = GeneralUserDTO.toUserCreate(user_details);
        try {
            const created_user = await sequelize.transaction(async (t1) => {
                // save a new user to db
                const user_basics = await GeneralUserDao.create({user: new_user}, {transaction: t1});
                const user_credential = {
                    userId: user_basics.id,
                    password: user_details.password,
                };
                // save the password on a different table
                await GeneralUserCredentialDao.create({user_credential}, {transaction: t1});
                return user_basics;
            });
            return GeneralUserDTO.toUserDTO(created_user);
        } catch (error) {
            console.log("Something went wrong", error.message)
            throw Error(error)
        }
    }

    static async init(email) {
        const generalUserService = new GeneralUserService()
        generalUserService.#email = email
        await generalUserService.#findByEmail();
        return generalUserService;
    }

    async #findByEmail() {
        this.#user = await GeneralUserDao.findByEmail({email: this.#email})
    }

    async findUser() {
        return this.#user;
    }

    async loginWithPassword(password) {

    }


}

export default Object.freeze(GeneralUserService);
