import { Router } from "express";
import * as InvoiceController from "../../Controllers/v1/Invoice.Controller";

const invoiceRoute = Router();

invoiceRoute
  .post("/", InvoiceController.createInvoiceController)
  .get("/", InvoiceController.getAllInvoiceController)
  .get("/dashboard", InvoiceController.getInvoiceDashboardDataController)
  .get(
    "/edit_page/from_contact",
    InvoiceController.getInvoiceEditPageFromContactController,
  )
  .get("/edit_page", InvoiceController.getInvoiceEditPageController)
  .get("/:invoice_id", InvoiceController.getAnInvoiceController)
  .put("/:invoice_id", InvoiceController.updateInvoiceController);
export default invoiceRoute;
