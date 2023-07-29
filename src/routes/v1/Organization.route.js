import {Router} from 'express'
import {getAllOrganizations, registerOrganization} from '../../Controllers/v1/Organization.Controller.js';

const organizationRouter = Router();

organizationRouter.post("/", registerOrganization).get("/", getAllOrganizations);

export default organizationRouter;