import { Router } from "express";
import {
  createTaxController,
  getAllTaxRatesController,
  getATaxRateController,
  updateATaxRateController,
} from "../../../Controllers/v1/Settings/TaxRate.Controller";

const taxRateRouter = Router();

taxRateRouter
  .post("/", createTaxController)
  .get("/:taxRateId", getATaxRateController)
  .get("/", getAllTaxRatesController)
  .put("/:taxRateId", updateATaxRateController);

export default taxRateRouter;
