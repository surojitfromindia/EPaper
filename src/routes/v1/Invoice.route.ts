import { Router } from "express";
import * as InvoiceController from "../../Controllers/v1/Invoice.Controller";

const invoiceRoute = Router();

invoiceRoute
  .post("/", InvoiceController.createInvoiceController)
  .get("/edit_page", InvoiceController.getInvoiceEditPageController)
  .get("/:invoice_id", InvoiceController.getAnInvoiceController);
export default invoiceRoute;
