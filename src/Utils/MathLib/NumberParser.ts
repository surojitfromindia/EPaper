// import * as math from "mathjs";
const math = require("mathjs");

function tryParseOrNull(this: string) {
  const str = this; // it can be null or undefined
  if (str === null || str === "" || str === undefined) {
    return null;
  }

  return math.number(str);
}

function convertNullValueToString(value) {
  if (value === null) return "";
  if (value === undefined) return "";
  return value;
}

export { convertNullValueToString };
