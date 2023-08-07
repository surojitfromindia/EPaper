import {UserService} from "../../Services/index.js";


const registerUser = async (req, res) => {
    const body = req.body;
    const created_user = await UserService.registerUser({user_details: body});
    res.status(201).json({user: created_user});
}

const getAllUsers = async (req, res) => {
    const users = await UserService.getAllUsers();
    res.status(200).json({users: users});
}
const getAnUser = async (req, res) => {
    const userId = req.params.userId;
    const user = await UserService.getAnUserWithOrganization({user_id: userId});
    res.status(200).json({user})
}

export {
    registerUser,
    getAllUsers,
    getAnUser
} 