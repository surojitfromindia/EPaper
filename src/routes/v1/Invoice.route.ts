import { Router } from "express";
import * as InvoiceController from "../../Controllers/v1/Invoice.Controller";

const invoiceRoute = Router();

invoiceRoute
  .get("/dashboard", InvoiceController.getInvoiceDashboardDataController)
  .post("/", InvoiceController.createInvoiceController)
  .get("/", InvoiceController.getAllInvoiceController)
  .get(
    "/edit_page/from_contact",
    InvoiceController.getInvoiceEditPageFromContactController,
  )
  .get("/edit_page", InvoiceController.getInvoiceEditPageController)
  .get("/:invoice_id", InvoiceController.getAnInvoiceController)
  .put("/:invoice_id", InvoiceController.updateInvoiceController);
export default invoiceRoute;
