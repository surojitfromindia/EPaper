import { Router } from "express";
import {
  createPaymentTermController,
  getAllPaymentTermsController,
  getAPaymentTermController,
  updateAPaymentTermController,
} from "../../../Controllers/v1/Settings/PaymentTerm.Controller";

const paymentTerm = Router();

paymentTerm
  .post("/", createPaymentTermController)
  .get("/:paymentTermId", getAPaymentTermController)
  .get("/", getAllPaymentTermsController)
  .put("/:paymentTermId", updateAPaymentTermController);

export default paymentTerm;
