import * as MathJs from "mathjs";
import { NUMERIC_PRECISION } from "../../Constants/General.Constant.js";

class MathLib {
  constructor({ precision = NUMERIC_PRECISION }) {
    this.precision = precision;
  }

  static addWithPrecision(precision, ...numbers) {
    return MathJs.number(
      MathJs.format(MathLib.add(numbers), { precision: precision }),
    );
  }

  static getWithPrecision(precision, number) {
    return MathJs.number(MathJs.format(MathJs.number(number), { precision }));
  }

  /**
   * Return sum of number
   * @param numbers
   * @return {number}
   */
  addWithPrecision(...numbers) {
    return MathLib.addWithPrecision(this.precision, numbers);
  }
}

export { MathLib };
