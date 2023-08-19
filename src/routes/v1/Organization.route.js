import {Router} from 'express'
import {registerOrganization} from '../../Controllers/v1/Organization.Controller.js';

const organizationRouter = Router();

organizationRouter.post("/", registerOrganization)
export default organizationRouter;