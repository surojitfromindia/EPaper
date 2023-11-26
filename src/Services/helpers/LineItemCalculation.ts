import { InvoiceLineItemCreatable } from "../../Models/Invoice/InvoiceLineItems.model";
import { MathLib } from "../../Utils/MathLib/mathLib";

type LineItemConstructorProps = {
  line_item: InvoiceLineItemCreatable;
  mathLib: MathLib;
  is_tax_inclusive: boolean;
};

export class LineItemCalculation {
  readonly #publishedTotal: number;
  #discountAmount: number;
  #taxAmount: number;
  #taxAbleAmount: number;
  #mathLib: MathLib;
  readonly #isTaxInclusive: boolean;
  #isDiscountPercentage: boolean;
  #discountPercentage?: number;

  constructor({
    line_item,
    mathLib,
    is_tax_inclusive,
  }: LineItemConstructorProps) {
    this.#isTaxInclusive = is_tax_inclusive;
    this.#mathLib = mathLib;
    const publishedTotal = line_item.quantity * line_item.rate;
    this.#publishedTotal = publishedTotal;

    const lineItemTaxPercentageAsDecimal =
      this.#mathLib.getDecimalFromPercentage(line_item.taxPercentage);

    this.#taxAbleAmount = is_tax_inclusive
      ? publishedTotal / (1 + lineItemTaxPercentageAsDecimal)
      : publishedTotal;
  }

  applyDiscount({ discount_percentage, is_flat = false }) {
    this.#isDiscountPercentage = !is_flat;
    this.#discountPercentage = discount_percentage;

    // discount will only be applied on tax able amount
    const lineItemDiscountAmount = this.#mathLib.getWithPrecision(
      this.#taxAbleAmount *
        this.#mathLib.getDecimalFromPercentage(discount_percentage),
    );

    const amountAfterDiscount = this.#taxAbleAmount - lineItemDiscountAmount;

    // after apply discount update the new tax able amount.
    this.#discountAmount = lineItemDiscountAmount;
    this.#taxAbleAmount = amountAfterDiscount;
    return this;
  }

  /**
   * @desc apply tax percentage
   * @param tax_percentage
   */
  applyTaxPercentage({ tax_percentage }) {
    this.#taxAmount = this.#mathLib.getWithPrecision(
      this.#taxAbleAmount *
        this.#mathLib.getDecimalFromPercentage(tax_percentage),
    );
    return this;
  }

  /**
   * get current amount
   */
  getAmounts() {
    let itemTotalTaxIncluded = 0;
    if (this.#isTaxInclusive && this.#isDiscountPercentage) {
      itemTotalTaxIncluded =
        this.#publishedTotal *
        (1 - this.#mathLib.getDecimalFromPercentage(this.#discountPercentage));
    } else {
      itemTotalTaxIncluded = this.#taxAbleAmount + this.#taxAmount;
    }

    return {
      discountAmount: this.#discountAmount,
      taxAmount: this.#taxAmount,
      itemTotal: this.#mathLib.getWithPrecision(this.#taxAbleAmount),
      itemTotalTaxIncluded:
        this.#mathLib.getWithPrecision(itemTotalTaxIncluded),
    };
  }
}
