import {Router} from 'express'
import organizationRouter from './Organization.route.js';
import userRouter from './User.route.js';
import accountsOfTemplateRoute from "./AccountsOfTemplate.route.js";

const v1Router = Router();
v1Router.use("/users", userRouter)
v1Router.use("/organizations", organizationRouter)
v1Router.use("/accounts_of_templates", accountsOfTemplateRoute)

export default v1Router;