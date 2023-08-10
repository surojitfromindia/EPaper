import {Router} from 'express'
import {create, getAllTaxRates, getATaxRate} from '../../../Controllers/v1/Settings/TaxRate.Controller.js';

const taxRateRouter = Router();

taxRateRouter.post("/", create).get("/:taxRateId", getATaxRate).get("/", getAllTaxRates)

export default taxRateRouter;