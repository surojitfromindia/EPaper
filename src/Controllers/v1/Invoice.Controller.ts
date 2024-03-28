import { Request } from "express";
import {
  InvoiceDashboardService,
  InvoiceEditPageService,
  InvoiceFilterService,
  InvoiceService,
  InvoiceUpdateService,
} from "../../Services";
import { SuccessErrorWrapper } from "../../Utils/SuccessErrorWrapper";
import { InvoiceDTO } from "../../DTO";

const createInvoice = async (req: Request) => {
  const clientInfo = req.clientInfo;
  const body = req.body;
  const invoiceService = new InvoiceService({
    client_info: clientInfo,
  });
  const cratedInvoice = await invoiceService.create({
    invoice_details: InvoiceDTO.toInvoiceCreate(body),
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
  const invoiceService = new InvoiceService({
    client_info: clientInfo,
  });
  const invoice = await invoiceService.getAnInvoice(
    {
      invoice_id: invoiceId,
    },
    {
      include_line_items: true,
    },
  );
  return { invoice: InvoiceDTO.toInvoice({ invoice }) };
};
const getAnInvoiceController = SuccessErrorWrapper(getAnInvoice, "done", 200);

const getInvoiceEditPage = async (req: Request) => {
  const req_query = req?.query;
  const clientInfo = req.clientInfo;
  const invoiceId = req_query.invoice_id && Number(req_query.invoice_id);

  const invoiceEditPageService = new InvoiceEditPageService({
    client_info: clientInfo,
  });
  const editPage = await invoiceEditPageService.getEditPage({
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
  const invoiceUpdateService = new InvoiceUpdateService({
    client_info: clientInfo,
  });
  const updatedInvoice = await invoiceUpdateService.update({
    invoice_details: InvoiceDTO.toInvoiceUpdate(body),
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
  const invoiceService = new InvoiceService({
    client_info: clientInfo,
  });
  const query = req.query as Record<string, string>;
  const parsedFields = InvoiceFilterService.parseQuery(query);
  const { invoices, page_context } =
    await invoiceService.getAllInvoice(parsedFields);
  return {
    invoices: invoices.map((invoice) => InvoiceDTO.toInvoice({ invoice })),
    page_context,
  };
};
const getAllInvoiceController = SuccessErrorWrapper(getAllInvoice, "done", 200);

const getInvoiceEditPageFromContact = async (req: Request) => {
  const req_query = req?.query;
  const clientInfo = req.clientInfo;
  const contactId = req_query.contact_id && Number(req_query.contact_id);

  const invoiceEditPageService = new InvoiceEditPageService({
    client_info: clientInfo,
  });
  const editPage = await invoiceEditPageService.getEditPageFromContact({
    contact_id: contactId,
  });
  return InvoiceDTO.toInvoiceEditPageFromContact(editPage);
};
const getInvoiceEditPageFromContactController = SuccessErrorWrapper(
  getInvoiceEditPageFromContact,
  "done",
  200,
);

const getInvoiceDashboardData = async (req: Request) => {
  const clientInfo = req.clientInfo;
  const invoiceService = new InvoiceDashboardService({
    client_info: clientInfo,
  });
  const dashboardData = await invoiceService.getInvoiceDashboardData();
  return {
    dash_board_data: InvoiceDTO.toInvoiceDashboard({
      dash_board_data: dashboardData,
    }),
  };
};
const getInvoiceDashboardDataController = SuccessErrorWrapper(
  getInvoiceDashboardData,
  "done",
  200,
);

export {
  createInvoiceController,
  getAnInvoiceController,
  getInvoiceEditPageController,
  updateInvoiceController,
  getAllInvoiceController,
  getInvoiceEditPageFromContactController,
  getInvoiceDashboardDataController,
};
