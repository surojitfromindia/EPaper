import { Request } from "express";
import { SuccessErrorWrapper } from "../../Utils/SuccessErrorWrapper";
import {
  CustomerPaymentEditPageService,
  CustomerPaymentService,
} from "../../Services";
import { CustomerPaymentDTO } from "../../DTO";

const createCustomerPayment = async (req: Request) => {
  const clientInfo = req.clientInfo;
  const body = req.body;
  const customerPaymentService = new CustomerPaymentService({
    client_info: clientInfo,
  });
  const createdCustomerPayment = await customerPaymentService.create({
    customer_payment_details: body,
  });
  return {
    customer_payment: createdCustomerPayment,
  };
};

const createCustomerPaymentController = SuccessErrorWrapper(
  createCustomerPayment,
  "Customer Payment created",
  201,
);

const getCustomerPaymentEditPage = async (req: Request) => {
  const req_query = req?.query;
  const clientInfo = req.clientInfo;
  const paymentId = req_query.payment_id && Number(req_query.payment_id);

  const invoiceEditPageService = new CustomerPaymentEditPageService({
    client_info: clientInfo,
  });
  const editPage = await invoiceEditPageService.getEditPage({
    customer_payment_id: paymentId,
  });
  return CustomerPaymentDTO.toCustomerPaymentEditPage(editPage);
};

const getCustomerPaymentEditPageController = SuccessErrorWrapper(
  getCustomerPaymentEditPage,
  "done",
  200,
);

export {
  createCustomerPaymentController,
  getCustomerPaymentEditPageController,
};
