import { Router } from "express";
import taxRateRouter from "./TaxRate.route";
import PaymentTermRoute from "./PaymentTerm.route";

const settingsRouter = Router();
settingsRouter.use("/tax_rates", taxRateRouter);
settingsRouter.use("/payment_terms", PaymentTermRoute);

export default settingsRouter;
