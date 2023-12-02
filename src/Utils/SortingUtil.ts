class SortingUtil {
  static sortObjectKeys(obj: any) {
    if (Array.isArray(obj)) {
      return obj.map((item: any) => {
        if (typeof item === "object" && item !== null) {
          return this.sortObjectKeys(item);
        } else {
          return item;
        }
      });
    } else {
      return Object.keys(obj)
        .sort()
        .reduce((result, key) => {
          if (typeof obj[key] === "object" && obj[key] !== null) {
            result[key] = this.sortObjectKeys(obj[key]);
          } else {
            result[key] = obj[key];
          }
          return result;
        }, {});
    }
  }

  static sortObjectKeysRecursively(obj: any): any {
    // First, sort the keys of the current object
    let sortedObj = this.sortObjectKeys(obj);

    // Then, for each key in the sorted object, check if its value is an object
    for (let key in sortedObj) {
      if (typeof sortedObj[key] === "object" && sortedObj[key] !== null) {
        // If the value is an object, call this function recursively
        sortedObj[key] = this.sortObjectKeysRecursively(sortedObj[key]);
      }
    }

    return sortedObj;
  }
}

export { SortingUtil };
