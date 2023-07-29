import {Router} from 'express'
import { getAllUsers, registerUser,  } from '../../Controllers/v1/User.Controller.js';

const userRouter = Router();

userRouter.post("/", registerUser).get("/", getAllUsers);

export default userRouter;