import { Router } from "express";
import taxRateRouter from "./TaxRate.route";
import PaymentTermRoute from "./PaymentTerm.route";
import AutoNumberSeriesRouter from "./AutoNumberSeries.route";
import InvoicePreferenceRouter from "./InvoicePreferences.route";

const settingsRouter = Router();
settingsRouter.use("/tax_rates", taxRateRouter);
settingsRouter.use("/payment_terms", PaymentTermRoute);
settingsRouter.use("/auto_number_series", AutoNumberSeriesRouter);
settingsRouter.use("/invoice", InvoicePreferenceRouter);

export default settingsRouter;
