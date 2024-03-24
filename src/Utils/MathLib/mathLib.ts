const MathJs = require("mathjs");
import { NUMERIC_PRECISION } from "../../Constants/General.Constant";

class MathLib {
  precision: number;

  constructor({ precision = NUMERIC_PRECISION }: { precision?: number }) {
    this.precision = precision;
  }

  static getWithPrecision(precision: number, number: number) {
    const fixedValue = MathJs.round(MathJs.number(number), precision);
    return MathJs.number(fixedValue);
  }

  static getDecimalFromPercentage(precision: number, percentage_value: number) {
    return MathLib.getWithPrecision(precision, percentage_value / 100);
  }

  static parseNumber(number: number | string): number {
    return MathJs.number(number);
  }

  getWithPrecision(number: number): number {
    return MathLib.getWithPrecision(this.precision, number);
  }

  getDecimalFromPercentage(number: number): number {
    return MathLib.getDecimalFromPercentage(this.precision, number);
  }
}

export { MathLib };
