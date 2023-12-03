class ValidityUtil {
  static isEmpty(value: any): boolean {
    if (value === null || value === undefined) {
      return true;
    }

    if (typeof value === "string" && value.trim() === "") {
      return true;
    }

    if (Array.isArray(value) && value.length === 0) {
      return true;
    }

    return typeof value === "object" && Object.keys(value).length === 0;
  }

  static isNotEmpty = (value) => !this.isEmpty(value);
}

export { ValidityUtil };
