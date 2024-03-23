import { Request } from "express";
import { SuccessErrorWrapper } from "../../Utils/SuccessErrorWrapper";
import { CustomerPaymentService } from "../../Services";

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

export { createCustomerPaymentController };
