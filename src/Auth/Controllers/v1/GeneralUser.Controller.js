import {GeneralUserService} from "../../Services/index.js";


const registerUser = async (req, res) => {
    const body = req.body;
    const created_user = await GeneralUserService.registerUser({user_details: body});
    res.status(201).json({user: created_user});
}
const loginByPassword = async (req, res) => {
    const body = req.body;
    const {email} = body;
    const user = await GeneralUserService.init(email).then(user => user.findUser())
    res.status(201).json({user: user});
}


export {
    registerUser,
    loginByPassword
} 