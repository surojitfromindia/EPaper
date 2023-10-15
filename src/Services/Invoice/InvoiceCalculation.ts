import { InvoiceCreatable } from "../../Models/Invoice/Invoices.model";
import { InvoiceLineItemCreatable } from "../../Models/Invoice/InvoiceLineItems.model";
import { GenerelaPrefernce } from "../../Models/Preference/GeneralPreference/GeneralPreference.model";
import { ClientInfo } from "../../Middlewares/Authorization/Authorization.middleware";
import { GeneralPreferenceService } from "../PreferenceServices/Preference.service";
import { MathLib } from "../../Utils/MathLib/mathLib";
import { LineItemCalculation } from "./LineItemCalculation";

type InvoiceCalculateReturn = {
  invoice: InvoiceCreatable;
  line_items: InvoiceLineItemCreatable[];
};

type InvoiceCalculationConstructorProps = {
  invoice: InvoiceCreatable;
  line_items: InvoiceLineItemCreatable[];
  general_preference: GenerelaPrefernce;
};
type InvoiceCalculationInitProps = {
  invoice: InvoiceCreatable;
  line_items: InvoiceLineItemCreatable[];
  client_info: ClientInfo;
};

class InvoiceCalculation {
  readonly invoice: InvoiceCreatable;
  readonly lineItems: InvoiceLineItemCreatable[];
  readonly taxRoundingType: GenerelaPrefernce["taxRoundingType"];
  readonly discountType: GenerelaPrefernce["discountType"];
  readonly isDiscountBeforeTax: GenerelaPrefernce["isDiscountBeforeTax"];
  readonly isTaxInclusive: boolean;

  constructor({
    invoice,
    line_items,
    general_preference,
  }: InvoiceCalculationConstructorProps) {
    this.invoice = invoice;
    this.isTaxInclusive = invoice.isInclusiveTax;
    this.lineItems = line_items;
    this.taxRoundingType = general_preference.taxRoundingType;
    this.discountType = general_preference.discountType;
    this.isDiscountBeforeTax = general_preference.isDiscountBeforeTax;
  }

  static async init({
    invoice,
    line_items,
    client_info,
  }: InvoiceCalculationInitProps) {
    // get the general preference and store
    const generalPreference = await GeneralPreferenceService.get({
      client_info,
    });
    return new InvoiceCalculation({
      invoice,
      line_items,
      general_preference: generalPreference,
    });
  }

  calculate(): InvoiceCalculateReturn {
    const mathLib = new MathLib({});
    let invoiceDiscountTotal = 0;
    let invoiceTaxTotal = 0;
    let invoiceSubTotal = 0;
    let invoiceTotal: number;

    // now time to loop over each line item.
    const updatedLineItems = [];
    for (const lineItem of this.lineItems) {
      const ln = new LineItemCalculation({
        line_item: lineItem,
        mathLib,
        is_tax_inclusive: this.isTaxInclusive,
      });
      const { itemTotalTaxIncluded, taxAmount, itemTotal, discountAmount } = ln
        .applyDiscountPercentage({
          discount_percentage: lineItem.discountPercentage,
        })
        .applyTaxPercentage({ tax_percentage: lineItem.taxPercentage })
        .getAmounts();

      const newLineItem: InvoiceLineItemCreatable = {
        ...lineItem,
        discountAmount,
        taxAmount,
        itemTotal,
        itemTotalTaxIncluded,
      };
      updatedLineItems.push(newLineItem);

      // update the global values
      invoiceTaxTotal = mathLib.getWithPrecision(invoiceTaxTotal + taxAmount);
      invoiceDiscountTotal = mathLib.getWithPrecision(
        invoiceDiscountTotal + discountAmount,
      );
      invoiceSubTotal = mathLib.getWithPrecision(invoiceSubTotal + itemTotal);
    }
    invoiceTotal = mathLib.getWithPrecision(invoiceTaxTotal + invoiceSubTotal);

    const updateInvoice = {
      ...this.invoice,
      taxTotal: invoiceTaxTotal,
      discountTotal: invoiceDiscountTotal,
      subTotal: invoiceSubTotal,
      total: invoiceTotal,
    };
    return {
      invoice: updateInvoice,
      line_items: updatedLineItems,
    };
  }
}

export { InvoiceCalculation };
