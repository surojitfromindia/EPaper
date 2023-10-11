const MathJs = require("mathjs");
import { NUMERIC_PRECISION } from "../../Constants/General.Constant";

class MathLib {
  precision: number;

  constructor({ precision = NUMERIC_PRECISION }: { precision?: number }) {
    this.precision = precision;
  }

  static getWithPrecision(precision: number, number: number) {
    return MathJs.number(MathJs.format(MathJs.number(number), { precision }));
  }

  static getDecimalFromPercentage(precision: number, percentage_value: number) {
    return MathLib.getWithPrecision(precision, percentage_value / 100);
  }

  getWithPrecision(number: number) {
    return MathLib.getWithPrecision(this.precision, number);
  }

  getDecimalFromPercentage(number: number) {
    return MathLib.getDecimalFromPercentage(this.precision, number);
  }
}

export { MathLib };
