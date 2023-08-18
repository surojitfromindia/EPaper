import {Router} from 'express'
import {getAnUser, registerUser,} from '../../Controllers/v1/User.Controller.js';
import {authorizeClient} from "../../Middlewares/Authorization/Authorization.middleware.js";

const userRouter = Router();

userRouter.use(authorizeClient)
userRouter.post("/", registerUser).get("/:userId", getAnUser)

export default userRouter;