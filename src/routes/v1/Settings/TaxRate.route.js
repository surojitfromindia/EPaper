import {Router} from 'express'
import {
    create,
    getAllTaxRates,
    getATaxRate,
    updateATaxRate
} from '../../../Controllers/v1/Settings/TaxRate.Controller.js';

const taxRateRouter = Router();

taxRateRouter.post("/", create)
    .get("/:taxRateId", getATaxRate)
    .get("/", getAllTaxRates)
    .put("/:taxRateId", updateATaxRate)

export default taxRateRouter;