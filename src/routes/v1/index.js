import {Router} from 'express'
import organizationRouter from './Organization.route.js';
import userRouter from './User.route.js';
import accountsOfTemplateRoute from "./AccountsOfTemplate.route.js";
import settingsRouter from "./Settings/index.js"

const v1Router = Router();
v1Router.use("/users", userRouter)
v1Router.use("/organizations", organizationRouter)
v1Router.use("/accounts_of_templates", accountsOfTemplateRoute)
v1Router.use("/settings", settingsRouter)


export default v1Router;