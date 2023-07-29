import {Router} from 'express'
import organizationRouter from './Organization.route.js';
import userRouter from './User.route.js';

const v1Router = Router();
v1Router.use("/users", userRouter)
v1Router.use("/organizations", organizationRouter)

export default v1Router;