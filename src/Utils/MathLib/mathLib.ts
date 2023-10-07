import * as MathJs from "mathjs";
import { NUMERIC_PRECISION } from "../../Constants/General.Constant";

class MathLib {
  precision: number;
  constructor({ precision = NUMERIC_PRECISION }) {
    this.precision = precision;
  }

  static getWithPrecision(precision: number, number: number) {
    return MathJs.number(MathJs.format(MathJs.number(number), { precision }));
  }
}

export { MathLib };
