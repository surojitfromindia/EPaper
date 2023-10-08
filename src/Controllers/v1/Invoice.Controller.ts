import { Request } from "express";
import { InvoiceService } from "../../Services";
import { SuccessErrorWrapper } from "../../Utils/SuccessErrorWrapper";

let createInvoice = async (req: Request) => {
  const clientInfo = req.clientInfo;
  const body = req.body;
  const cratedInvoice = await InvoiceService.create({
    invoice_details: body,
    client_info: clientInfo,
  });
  return { invoice: cratedInvoice };
};
const createInvoiceController = SuccessErrorWrapper(
  createInvoice,
  "invoice created",
  201,
);

const getAnInvoice = async (req: Request) => {
  const clientInfo = req.clientInfo;
  const invoiceId = req.params.invoice_id;
  const invoice = await InvoiceService.getAnInvoice({
    invoice_id: invoiceId,
    client_info: clientInfo,
  });
  return { invoice };
};
const getAnInvoiceController = SuccessErrorWrapper(getAnInvoice, "done", 200);

export { createInvoiceController, getAnInvoiceController };
