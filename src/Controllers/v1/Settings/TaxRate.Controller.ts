import { TaxRateService } from "../../../Services/index";
import { SuccessErrorWrapper } from "../../../Utils/SuccessErrorWrapper";
import { TaxRateDTO } from "../../../DTO";
import { Request } from "express";

let create = async (req: Request) => {
  const clientInfo = req.clientInfo;
  const body = req.body;
  const taxRateDetailsFromPayload = TaxRateDTO.toTaxRateCreate(body);
  const createdTaxRate = await TaxRateService.create({
    tax_rate_details: taxRateDetailsFromPayload,
    client_info: clientInfo,
  });
  return { tax_rate: TaxRateDTO.toTaxRate(createdTaxRate) };
};
const createTaxController = SuccessErrorWrapper(
  create,
  "tax rate created",
  201,
);

let getAllTaxRates = async (req: Request) => {
  const clientInfo = req.clientInfo;
  const taxRates = await TaxRateService.getAllTaxRates({
    client_info: clientInfo,
  });
  return { tax_rates: taxRates.map((user) => TaxRateDTO.toTaxRate(user)) };
};
const getAllTaxRatesController = SuccessErrorWrapper(
  getAllTaxRates,
  "done",
  200,
);

let getATaxRate = async (req: Request) => {
  const clientInfo = req.clientInfo;
  const taxRateId = req.params.taxRateId;
  const taxRate = await TaxRateService.getATaxRate({
    tax_rate_id: taxRateId,
    client_info: clientInfo,
  });
  return { tax_rate: TaxRateDTO.toTaxRate(taxRate) };
};
const getATaxRateController = SuccessErrorWrapper(getATaxRate, "done", 200);

let updateATaxRate = async (req: Request) => {
  const clientInfo = req.clientInfo;
  const body = req.body;
  const taxRateId = req.params.taxRateId;
  const taxRateDetailsFromPayload = TaxRateDTO.toTaxRateUpdate(body);
  const updatedTaxRate = await TaxRateService.updateATaxRate({
    tax_rate_details: taxRateDetailsFromPayload,
    tax_rate_id: taxRateId,
    client_info: clientInfo,
  });
  return { tax_rate: TaxRateDTO.toTaxRate(updatedTaxRate) };
};
const updateATaxRateController = SuccessErrorWrapper(
  updateATaxRate,
  "tax rate update",
  200,
);

export {
  createTaxController,
  getAllTaxRatesController,
  getATaxRateController,
  updateATaxRateController,
};
