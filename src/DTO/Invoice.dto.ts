import { ItemUnitDTO, TaxRateDTO } from "./index";

class InvoiceDTO {
  static toInvoiceEditPage({ taxes, units, line_item_accounts_list }) {
    return {
      taxes: taxes.map(TaxRateDTO.toTaxRate),
      units: units.map(ItemUnitDTO.toItemUnit),
      line_item_accounts_list,
    };
  }
}

export default InvoiceDTO;
