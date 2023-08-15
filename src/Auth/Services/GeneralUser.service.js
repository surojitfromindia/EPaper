// here I handle business logic
import sequelize from '../../Config/AuthDataBase.Config.js';
import {GeneralUserCredentialDao, GeneralUserDao} from '../DAO/index.js';
import {GeneralUserDTO} from '../DTO/index.js';
import {HashPassword, Password} from "../Utils/Password.js";
import {DataNotFoundError, UserCredentialMismatchError} from "../Errors/APIErrors/index.js";
import {UserAuthToken} from "../Utils/UserAuthToken.js";

class GeneralUserService {
    #user;
    #email

    static async registerUser({user_details}) {
        const new_user = GeneralUserDTO.toUserCreate(user_details);
        try {
            const created_user = await sequelize.transaction(async (t1) => {
                // save a new user to db
                const user_basics = await GeneralUserDao.create({user: new_user}, {transaction: t1});

                // saving sensitive data such as password after hashing
                const password = (await new Password(user_details.password).createHashPassword()).getHashedPassword()

                const user_credential = {
                    userId: user_basics.id, password,
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
        const user = await GeneralUserDao.findByEmail({email: this.#email})
        if (user) {
            this.#user = user
            return;
        }
        throw new DataNotFoundError()
    }

    async loginWithPassword(plain_password) {
        const userCredential = await GeneralUserCredentialDao.findOne({user_id: this.#user.id})
        const hashedPassword = new HashPassword(userCredential.password);
        const isMatch = await hashedPassword.verifyPassword(plain_password)
        if (isMatch) {
            // return a token
            return {
                token: UserAuthToken.signToken({
                    user_id: this.#user.id,
                    email: this.#user.email,
                }).getToken()
            }
        } else {
            throw new UserCredentialMismatchError()
        }

    }


}

export default Object.freeze(GeneralUserService);
