import {GeneralUserService} from "../../Services/index.js";


const registerUser = async (req, res) => {
    const body = req.body;
    const created_user = await GeneralUserService.registerUser({user_details: body});
    res.status(201).json({user: created_user});
}
const loginByPassword = async (req, res, next) => {
    try {
        const body = req.body;
        const {email, password} = body;
        const userService = await GeneralUserService.init(email)
        const user = await userService.loginWithPassword(password)
        res.status(201).json({user: user});
    } catch (error) {
        return next(error)
    }
}


export {
    registerUser, loginByPassword
} 