import { InvoiceLineItemCreatable } from "../../Models/Invoice/InvoiceLineItems.model";
import { MathLib } from "../../Utils/MathLib/mathLib";

type LineItemConstructorProps = {
  line_item: InvoiceLineItemCreatable;
  mathLib: MathLib;
};

export class LineItemCalculation {
  readonly lineItem: InvoiceLineItemCreatable;
  readonly #primaryTotal: number;
  #discountAmount: number;
  #taxAmount: number;
  #runningAmount: number;
  #mathLib: MathLib;

  constructor({ line_item, mathLib }: LineItemConstructorProps) {
    this.lineItem = line_item;
    this.#mathLib = mathLib;
    const primaryTotal = this.#mathLib.getWithPrecision(
      line_item.quantity * line_item.rate,
    );
    this.#runningAmount = primaryTotal;
    this.#primaryTotal = primaryTotal;
  }

  /**
   * @desc apply discount
   * @param discount_percentage
   */
  applyDiscountPercentage({ discount_percentage }) {
    const lineItemDiscountPercentageAsDecimal =
      this.#mathLib.getDecimalFromPercentage(discount_percentage);
    const lineItemDiscountAmount = this.#mathLib.getWithPrecision(
      this.#runningAmount * lineItemDiscountPercentageAsDecimal,
    );
    const itemPrimaryTotalAfterDiscount =
      this.#runningAmount - lineItemDiscountAmount;
    this.#runningAmount = this.#mathLib.getWithPrecision(
      itemPrimaryTotalAfterDiscount,
    );
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
      this.#runningAmount * lineItemTaxPercentageAsDecimal,
    );
    const itemPrimaryTotalAfterTax = this.#runningAmount + lineItemTaxAmount;
    this.#runningAmount = this.#mathLib.getWithPrecision(
      itemPrimaryTotalAfterTax,
    );
    this.#taxAmount = lineItemTaxAmount;
    return this;
  }

  getPrimaryTotal(): number {
    return this.#primaryTotal;
  }

  /**
   * get current amount
   */
  getCurrentAmount(): number {
    return this.#runningAmount;
  }

  getDiscountAmount(): number {
    return this.#discountAmount;
  }

  getTaxAmount(): number {
    return this.#taxAmount;
  }
}
