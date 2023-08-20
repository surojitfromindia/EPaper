import { Router } from "express";
import taxRateRouter from "./TaxRate.route.js";

const settingsRouter = Router();
settingsRouter.use("/tax_rates", taxRateRouter);

export default settingsRouter;
