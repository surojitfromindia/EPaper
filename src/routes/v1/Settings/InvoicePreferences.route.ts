import { Router } from "express";
import { updateInvoiceAutoNumberController } from "../../../Controllers/v1/Settings/InvoicePreference.Controller";

const invoicePreferenceRouter = Router();

invoicePreferenceRouter.put("/auto_number", updateInvoiceAutoNumberController);

export default invoicePreferenceRouter;
