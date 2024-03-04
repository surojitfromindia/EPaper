import { InvoiceLineItemCreatable } from "../../Models/Invoice/InvoiceLineItems.model";
import { GeneralPreference } from "../../Models/Preference/GeneralPreference/GeneralPreference.model";
import { ClientInfo } from "../../Middlewares/Authorization/Authorization.middleware";
import { GeneralPreferenceService } from "../PreferenceServices/Preference.service";
import { MathLib } from "../../Utils/MathLib/mathLib";
import { LineItemCalculation } from "../helpers/LineItemCalculation";

type InvoiceCalculateReturn = {
  line_items: InvoiceLineItemCreatable[];
  taxTotal: number;
  discountTotal: number;
  subTotal: number;
  total: number;
  bcyTaxTotal: number;
  bcyDiscountTotal: number;
  bcySubTotal: number;
  bcyTotal: number;
};

type InvoiceCalculationConstructorProps = {
  isInclusiveTax: boolean;
  exchangeRate: number;
  line_items: InvoiceLineItemCreatable[];
  general_preference: GeneralPreference;
};
type InvoiceCalculationInitProps = {
  is_inclusive_tax: boolean;
  exchange_rate: number;
  line_items: InvoiceLineItemCreatable[];
  client_info: ClientInfo;
};

class InvoiceLineCalculation {
  readonly lineItems: InvoiceLineItemCreatable[];
  readonly taxRoundingType: GeneralPreference["taxRoundingType"];
  readonly discountType: GeneralPreference["discountType"];
  readonly isDiscountBeforeTax: GeneralPreference["isDiscountBeforeTax"];
  readonly isInclusiveTax: boolean;
  readonly exchangeRate: number;
  constructor({
    isInclusiveTax,
    exchangeRate,
    line_items,
    general_preference,
  }: InvoiceCalculationConstructorProps) {
    this.isInclusiveTax = isInclusiveTax;
    this.exchangeRate = exchangeRate;
    this.lineItems = line_items;

    // get the general preference and store
    this.taxRoundingType = general_preference.taxRoundingType;
    this.discountType = general_preference.discountType;
    this.isDiscountBeforeTax = general_preference.isDiscountBeforeTax;
  }

  static async init({
    is_inclusive_tax,
    exchange_rate,
    line_items,
    client_info,
  }: InvoiceCalculationInitProps) {
    // get the general preference and store
    const generalPreference = await GeneralPreferenceService.get({
      client_info,
    });
    return new InvoiceLineCalculation({
      isInclusiveTax: is_inclusive_tax,
      exchangeRate: exchange_rate,
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
        is_tax_inclusive: this.isInclusiveTax,
      });
      const { itemTotalTaxIncluded, taxAmount, itemTotal, discountAmount } = ln
        .applyDiscount({
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
        bcyRate: lineItem.rate * this.exchangeRate,
        bcyDiscountAmount: discountAmount * this.exchangeRate,
        bcyTaxAmount: taxAmount * this.exchangeRate,
        bcyItemTotal: itemTotal * this.exchangeRate,
        bcyItemTotalTaxIncluded: itemTotalTaxIncluded * this.exchangeRate,
      };
      updatedLineItems.push({
        ...newLineItem,
      });

      // update the global values
      invoiceTaxTotal = mathLib.getWithPrecision(invoiceTaxTotal + taxAmount);
      invoiceDiscountTotal = mathLib.getWithPrecision(
        invoiceDiscountTotal + discountAmount,
      );
      invoiceSubTotal = mathLib.getWithPrecision(invoiceSubTotal + itemTotal);
    }
    invoiceTotal = mathLib.getWithPrecision(invoiceTaxTotal + invoiceSubTotal);
    return {
      taxTotal: invoiceTaxTotal,
      discountTotal: invoiceDiscountTotal,
      subTotal: invoiceSubTotal,
      total: invoiceTotal,
      line_items: updatedLineItems,
      bcyDiscountTotal: invoiceDiscountTotal * this.exchangeRate,
      bcyTaxTotal: invoiceTaxTotal * this.exchangeRate,
      bcySubTotal: invoiceSubTotal * this.exchangeRate,
      bcyTotal: invoiceTotal * this.exchangeRate,
    };
  }
}

export { InvoiceLineCalculation };
