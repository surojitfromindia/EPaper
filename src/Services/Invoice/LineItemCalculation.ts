import { InvoiceLineItemCreatable } from "../../Models/Invoice/InvoiceLineItems.model";
import { MathLib } from "../../Utils/MathLib/mathLib";

type LineItemConstructorProps = {
  line_item: InvoiceLineItemCreatable;
  mathLib: MathLib;
  is_tax_inclusive: boolean;
};

export class LineItemCalculation {
  readonly lineItem: InvoiceLineItemCreatable;
  readonly #publishedTotal: number;
  #discountAmount: number;
  #subTotal: number; // sub total does not include tax
  #taxAmount: number;
  #taxAbleAmount: number;
  #mathLib: MathLib;

  constructor({
    line_item,
    mathLib,
    is_tax_inclusive,
  }: LineItemConstructorProps) {
    this.lineItem = line_item;
    this.#mathLib = mathLib;
    const publishedTotal = this.#mathLib.getWithPrecision(
      line_item.quantity * line_item.rate,
    );
    const taxPercentage = line_item.taxPercentage;
    const lineItemTaxPercentageAsDecimal =
      this.#mathLib.getDecimalFromPercentage(taxPercentage);

    this.#taxAbleAmount = is_tax_inclusive
      ? publishedTotal / (1 + lineItemTaxPercentageAsDecimal)
      : publishedTotal;
    this.#publishedTotal = publishedTotal;
  }

  /**
   * @desc apply discount
   * @param discount_percentage
   */
  applyDiscountPercentage({ discount_percentage }) {
    const lineItemDiscountPercentageAsDecimal =
      this.#mathLib.getDecimalFromPercentage(discount_percentage);

    // discount will only be applied on tax able amount
    const lineItemDiscountAmount = this.#mathLib.getWithPrecision(
      this.#taxAbleAmount * lineItemDiscountPercentageAsDecimal,
    );

    const amountAfterDiscount = this.#mathLib.getWithPrecision(
      this.#taxAbleAmount - lineItemDiscountAmount,
    );

    // after apply discount update the new tax able amount.
    this.#taxAbleAmount = amountAfterDiscount;
    this.#subTotal = amountAfterDiscount;
    this.#discountAmount = lineItemDiscountAmount;
    return this;
  }

  /**
   * @desc apply tax percentage
   * @param tax_percentage
   */
  applyTaxPercentage({ tax_percentage }) {
    const lineItemTaxPercentageAsDecimal =
      this.#mathLib.getDecimalFromPercentage(tax_percentage);

    const lineItemTaxAmount = this.#mathLib.getWithPrecision(
      this.#taxAbleAmount * lineItemTaxPercentageAsDecimal,
    );
    this.#taxAbleAmount = this.#mathLib.getWithPrecision(
      this.#taxAbleAmount + lineItemTaxAmount,
    );
    this.#taxAmount = lineItemTaxAmount;
    return this;
  }

  /**
   * get current amount
   */
  getAmounts() {
    return {
      discountAmount: this.#discountAmount,
      taxAmount: this.#taxAmount,
      itemTotal: this.#subTotal,
      itemTotalTaxIncluded: this.#subTotal + this.#taxAmount,
    };
  }
}
