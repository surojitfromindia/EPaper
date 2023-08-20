import * as math from "mathjs";

function tryParseOrNull() {
  const str = this; // it can be null or undefined
  if (str === null || str === "" || str === undefined) {
    return null;
  }

  return math.number(str);
}

String.prototype.tryParseOrNull = tryParseOrNull;

function convertNullValueToString(value) {
  if (value === null) return "";
  return value;
}

export { convertNullValueToString };
