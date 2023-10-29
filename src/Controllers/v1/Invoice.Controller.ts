import { Request } from "express";
import { InvoiceService } from "../../Services";
import { SuccessErrorWrapper } from "../../Utils/SuccessErrorWrapper";
import { InvoiceDTO } from "../../DTO";

const createInvoice = async (req: Request) => {
  const clientInfo = req.clientInfo;
  const body = req.body;
  const cratedInvoice = await InvoiceService.create({
    invoice_details: InvoiceDTO.toInvoiceCreate(body),
    client_info: clientInfo,
  });
  return { invoice: InvoiceDTO.toInvoice({ invoice: cratedInvoice }) };
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
  return { invoice: InvoiceDTO.toInvoice({ invoice }) };
};
const getAnInvoiceController = SuccessErrorWrapper(getAnInvoice, "done", 200);

const getInvoiceEditPage = async (req: Request) => {
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

const updateInvoice = async (req: Request) => {
  const clientInfo = req.clientInfo;
  const invoiceId = Number(req.params.invoice_id);
  const body = req.body;
  const updatedInvoice = await InvoiceService.update({
    invoice_details: InvoiceDTO.toInvoiceUpdate(body),
    client_info: clientInfo,
    invoice_id: invoiceId,
  });
  return { invoice: InvoiceDTO.toInvoice({ invoice: updatedInvoice }) };
};
const updateInvoiceController = SuccessErrorWrapper(
  updateInvoice,
  "invoice updated",
  201,
);

const getAllInvoice = async (req: Request) => {
  const clientInfo = req.clientInfo;
  const invoices = await InvoiceService.getAllInvoice({
    client_info: clientInfo,
  });
  return {
    invoices: invoices.map((invoice) => InvoiceDTO.toInvoice({ invoice })),
  };
};
const getAllInvoiceController = SuccessErrorWrapper(getAllInvoice, "done", 200);

export {
  createInvoiceController,
  getAnInvoiceController,
  getInvoiceEditPageController,
  updateInvoiceController,
  getAllInvoiceController,
};
