import {Router} from 'express'
import userRouter from './User.route.js';

const v1Router = Router();
v1Router.use("/users", userRouter)

export default v1Router;