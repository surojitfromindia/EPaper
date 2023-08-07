import {Router} from 'express'
import {getAllUsers, getAnUser, registerUser,} from '../../Controllers/v1/User.Controller.js';

const userRouter = Router();

userRouter.post("/", registerUser).get("/:userId", getAnUser).get("/", getAllUsers)

export default userRouter;