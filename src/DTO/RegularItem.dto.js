import { AccountsOfOrganizationDTO, ItemUnitDTO, TaxRateDTO } from "./index.js";
import { convertNullValueToString } from "../Utils/MathLib/NumberParser.js";

class RegularItemDTO {
  static toItem(item_details) {
    const basicItemDetails = {
      item_id: item_details.id,
      name: item_details.name,
      unit: item_details.unit,
      product_type: item_details.productType,
      product_type_formatted: productTypeFormat(item_details.productType),
      selling_price: convertNullValueToString(
        item_details.sellingPrice,
      ).tryParseOrNull(),
      selling_description: convertNullValueToString(
        item_details.sellingDescription,
      ),
      purchase_price: convertNullValueToString(
        item_details.purchasePrice,
      ).tryParseOrNull(),
      purchase_description: convertNullValueToString(
        item_details.purchaseDescription,
      ),
      item_for: item_details.itemFor,
      status: item_details.status,
      tax_rate_id: item_details.taxRateId,
    };
    if (item_details.taxRate) {
      basicItemDetails.tax_rate = TaxRateDTO.toTaxRate(item_details.taxRate);
    }
    return basicItemDetails;
  }

  static toItemCreate(item_payload) {
    return {
      name: item_payload.name,
      unit: item_payload.unit,
      productType: item_payload.product_type,
      sellingPrice: item_payload.selling_price,
      sellingDescription: item_payload.selling_description,
      purchasePrice: item_payload.purchase_price,
      purchaseDescription: item_payload.purchase_description,
      itemFor: item_payload.item_for,
      taxRateId: item_payload.tax_rate_id,
    };
  }

  static toItemUpdate(item_payload) {
    return {
      name: item_payload.name,
      unit: item_payload.unit,
      productType: item_payload.product_type,
      sellingPrice: item_payload.selling_price,
      sellingDescription: item_payload.selling_description,
      purchasePrice: item_payload.purchase_price,
      purchaseDescription: item_payload.purchase_description,
      itemFor: item_payload.item_for,
      taxRateId: item_payload.tax_rate_id,
    };
  }

  static toItemEditPage({
    taxes,
    units,
    income_accounts_list,
    purchase_accounts_list,
    inventory_accounts_list,
  }) {
    return {
      taxes: taxes.map(TaxRateDTO.toTaxRate),
      units: units.map(ItemUnitDTO.toItemUnit),
      income_accounts_list: income_accounts_list.map(
        AccountsOfOrganizationDTO.toAccountOfOrganization,
      ),
      purchase_accounts_list: purchase_accounts_list.map(
        AccountsOfOrganizationDTO.toAccountOfOrganization,
      ),
      inventory_accounts_list: inventory_accounts_list.map(
        AccountsOfOrganizationDTO.toAccountOfOrganization,
      ),
    };
  }
}

export default RegularItemDTO;

/**
 *
 * @param {("goods"|"service")} product_type
 */
const productTypeFormat = (product_type) => {
  switch (product_type) {
    case "goods":
      return "Goods";
    case "service":
      return "Service";
  }
};
