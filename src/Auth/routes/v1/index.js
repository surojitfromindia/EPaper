import {Router} from 'express'
import userAccountRouter from './UserAccount.route.js';


const v1Router = Router();
v1Router.use("/", userAccountRouter)


export default v1Router;