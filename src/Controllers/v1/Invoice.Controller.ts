import { Request } from "express";
import { InvoiceService } from "../../Services";
import { SuccessErrorWrapper } from "../../Utils/SuccessErrorWrapper";
import InvoiceDTO from "../../DTO/Invoice.dto";

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
  const invoiceId = Number(req.params.invoice_id);
  const invoice = await InvoiceService.getAnInvoice({
    invoice_id: invoiceId,
    client_info: clientInfo,
  });
  return { invoice };
};
const getAnInvoiceController = SuccessErrorWrapper(getAnInvoice, "done", 200);

let getInvoiceEditPage = async (req: Request) => {
  const req_query = req?.query;
  const clientInfo = req.clientInfo;
  const invoiceId = req_query.invoice_id && Number(req_query.invoice_id);

  const editPage = await InvoiceService.getEditPage({
    client_info: clientInfo,
    invoice_id: invoiceId,
  });
  return InvoiceDTO.toInvoiceEditPage(editPage);
};
const getInvoiceEditPageController = SuccessErrorWrapper(
  getInvoiceEditPage,
  "done",
  200,
);

export {
  createInvoiceController,
  getAnInvoiceController,
  getInvoiceEditPageController,
};
