import { Router } from "express";
import * as CustomerPaymentController from "../../Controllers/v1/CustomerPayment.Controller";

const customerPaymentRoute = Router();

customerPaymentRoute
  .post("/", CustomerPaymentController.createCustomerPaymentController)
  .get(
    "/edit_page",
    CustomerPaymentController.getCustomerPaymentEditPageController,
  );

export default customerPaymentRoute;
