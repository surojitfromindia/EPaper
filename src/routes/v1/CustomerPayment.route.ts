import { Router } from "express";
import * as CustomerPaymentController from "../../Controllers/v1/CustomerPayment.Controller";

const customerPaymentRoute = Router();

customerPaymentRoute.post(
  "/",
  CustomerPaymentController.createCustomerPaymentController,
);

export default customerPaymentRoute;
