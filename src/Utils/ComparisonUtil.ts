class ComparisonUtil {
  /**
   * given two arrays, return entries that are not in the first array.
   * but present in the second array
   * @param first_array
   * @param second_array
   * @param key_for_first_array
   * @param key_for_second_array
   */
  static getEntriesNotInFirstArray<T1, T2>({
    first_array,
    second_array,
    key_for_first_array,
    key_for_second_array,
  }: {
    first_array: T1[];
    second_array: T2[];
    key_for_first_array?: string;
    key_for_second_array?: string;
  }): T2[] {
    const entriesNotInFirstArray = [];
    for (const entry of second_array) {
      const entryFound = first_array.find((firstArrayEntry) => {
        const first_array_entry = key_for_first_array
          ? firstArrayEntry[key_for_first_array]
          : firstArrayEntry;
        const second_array_entry = key_for_second_array
          ? entry[key_for_second_array]
          : entry;
        return first_array_entry === second_array_entry;
      });
      if (!entryFound) {
        entriesNotInFirstArray.push(entry);
      }
    }
    return entriesNotInFirstArray;
  }

  // given two array return entry from second array which are also part of first array
  // for key it should be same for both generic array types
  static getEntriesOnlyInFirstArray<T1, T2>({
    first_array,
    second_array,
    key_for_first_array,
    key_for_second_array,
  }: {
    first_array: T1[];
    second_array: T2[];
    key_for_first_array?: string;
    key_for_second_array?: string;
  }): T2[] {
    const entriesInFirstArray = [];
    for (const entry of second_array) {
      const entryFound = first_array.find((firstArrayEntry) => {
        const first_array_entry = key_for_first_array
          ? firstArrayEntry[key_for_first_array]
          : firstArrayEntry;
        const second_array_entry = key_for_second_array
          ? entry[key_for_second_array]
          : entry;
        return first_array_entry === second_array_entry;
      });
      if (entryFound) {
        entriesInFirstArray.push(entry);
      }
    }
    return entriesInFirstArray;
  }
}

export { ComparisonUtil };
