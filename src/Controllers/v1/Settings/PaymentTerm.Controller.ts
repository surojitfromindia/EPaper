import { PaymentTermService } from "../../../Services/index";
import { SuccessErrorWrapper } from "../../../Utils/SuccessErrorWrapper";
import { PaymentTermsDTO } from "../../../DTO";
import { Request } from "express";

const create = async (req: Request) => {
  const clientInfo = req.clientInfo;
  const body = req.body;
  const paymentTermDetailsFromPayload =
    PaymentTermsDTO.toPaymentTermCreate(body);
  const createdPaymentTerm = await PaymentTermService.create({
    payment_term_details: paymentTermDetailsFromPayload,
    client_info: clientInfo,
  });
  return {
    payment_term: PaymentTermsDTO.toPaymentTerm(createdPaymentTerm),
  };
};
const createPaymentTermController = SuccessErrorWrapper(
  create,
  "payment term created",
  201,
);

const getAllPaymentTerms = async (req: Request) => {
  const clientInfo = req.clientInfo;
  const paymentTerms = await PaymentTermService.getAllPaymentTerms({
    client_info: clientInfo,
  });
  return {
    payment_terms: paymentTerms.map((entry) =>
      PaymentTermsDTO.toPaymentTerm(entry),
    ),
  };
};
const getAllPaymentTermsController = SuccessErrorWrapper(
  getAllPaymentTerms,
  "done",
  200,
);

let getAPaymentTerm = async (req: Request) => {
  const clientInfo = req.clientInfo;
  const paymentTermId = req.params.paymentTermId;
  const paymentTerm = await PaymentTermService.getAPaymentTerm({
    payment_term_id: paymentTermId,
    client_info: clientInfo,
  });
  return { payment_term: PaymentTermsDTO.toPaymentTerm(paymentTerm) };
};
const getAPaymentTermController = SuccessErrorWrapper(
  getAPaymentTerm,
  "done",
  200,
);

const updateAPaymentTerm = async (req: Request) => {
  const clientInfo = req.clientInfo;
  const body = req.body;
  const paymentTermId = req.params.paymentTermId;
  const paymentTermDetailsFromPayload =
    PaymentTermsDTO.toPaymentTermUpdate(body);
  const updatedPaymentTermRate = await PaymentTermService.updateAPaymentTerm({
    payment_term_details: paymentTermDetailsFromPayload,
    payment_term_id: paymentTermId,
    client_info: clientInfo,
  });
  return {
    payment_term: PaymentTermsDTO.toPaymentTerm(updatedPaymentTermRate),
  };
};
const updateAPaymentTermController = SuccessErrorWrapper(
  updateAPaymentTerm,
  "payment term update",
  200,
);

export {
  createPaymentTermController,
  getAllPaymentTermsController,
  getAPaymentTermController,
  updateAPaymentTermController,
};
