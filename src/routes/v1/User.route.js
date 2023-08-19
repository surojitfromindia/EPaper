import {Router} from 'express'
import {getAnUser, registerUser,} from '../../Controllers/v1/User.Controller.js';

const userRouter = Router();

userRouter.post("/", registerUser).get("/:userId", getAnUser)

export default userRouter;