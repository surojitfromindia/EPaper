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
      selling_description: convertNullValueToString(
        item_details.sellingDescription,
      ),
      purchase_description: convertNullValueToString(
        item_details.purchaseDescription,
      ),
      item_for: item_details.itemFor,
      status: item_details.status,
      tax_id: item_details.taxId,
    };
    if (item_details.purchasePrice) {
      basicItemDetails.purchase_price = item_details.purchasePrice;
    }
    if (item_details.sellingPrice) {
      basicItemDetails.selling_price = item_details.sellingPrice;
    }
    if (item_details.salesAccountId) {
      basicItemDetails.sales_account_id = item_details.salesAccountId;
    }
    if (item_details.SalesAccount) {
      basicItemDetails.sales_account_name =
        AccountsOfOrganizationDTO.toAccountOfOrganization(
          item_details.SalesAccount,
        ).account_name;
    }
    if (item_details.purchaseAccountId) {
      basicItemDetails.purchase_account_id = item_details.purchaseAccountId;
    }
    if (item_details.PurchaseAccount) {
      basicItemDetails.purchase_account_name =
        AccountsOfOrganizationDTO.toAccountOfOrganization(
          item_details.PurchaseAccount,
        ).account_name;
    }

    if (item_details.Tax) {
      const taxDetails = TaxRateDTO.toTaxRate(item_details.Tax);
      basicItemDetails.tax_percentage_formatted =
        taxDetails.tax_percentage_formatted;
      basicItemDetails.tax_percentage = taxDetails.tax_percentage;
      basicItemDetails.tax_name = taxDetails.tax_name;
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
      taxId: item_payload.tax_id,
      salesAccountId: item_payload.sales_account_id,
      purchaseAccountId: item_payload.purchase_account_id,
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
      taxId: item_payload.tax_id,
      salesAccountId: item_payload.sales_account_id,
      purchaseAccountId: item_payload.purchase_account_id,
    };
  }

  static toItemEditPage({
    taxes,
    units,
    income_accounts_list,
    purchase_accounts_list,
    inventory_accounts_list,
    item_details,
  }) {
    const basic_data = {
      taxes: taxes.map(TaxRateDTO.toTaxRate),
      units: units.map(ItemUnitDTO.toItemUnit),
      income_accounts_list,
      purchase_accounts_list,
      inventory_accounts_list,
    };
    if (item_details) {
      basic_data["item"] = RegularItemDTO.toItem(item_details);
    }
    return basic_data;
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
