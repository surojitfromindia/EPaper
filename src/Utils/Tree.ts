class Tree {
  static makeTree = ({
    entries,
    joinFrom,
    joinTo,
    children_as,
    children_count_as,
  }) => {
    const hashTable = Object.create(null);
    // create a map
    entries.forEach((entry) => {
      hashTable[entry[joinFrom]] = {
        ...entry,
        [children_count_as]: 0,
        [children_as]: [],
      };
    });
    const dataTree = [];
    for (let [, entry] of Object.entries(hashTable)) {
      const entryParent = entry[joinTo];
      const entryInHashTable = hashTable[entry[joinFrom]];

      if (entryParent && hashTable[entryParent]) {
        // if a parent is found in the hash table, we push this entry in the children array
        hashTable[entryParent][children_as].push(entryInHashTable);
        hashTable[entryParent][children_count_as] =
          hashTable[entryParent][children_as].length;
      } else {
        // else the account will be treated as root
        dataTree.push(entryInHashTable);
      }
    }

    return dataTree;
  };

  static traverseTree = (root, children_as) => {
    const preorderTreeTraversal = function (
      root,
      storeArray = [],
      children_as,
    ) {
      if (!root) {
        return storeArray;
      }
      storeArray.push(root);
      for (let child of root[children_as]) {
        preorderTreeTraversal(child, storeArray, children_as);
      }
      delete root[children_as];

      return storeArray;
    };
    const resultArray = [];
    preorderTreeTraversal(root, resultArray, children_as);
    return resultArray;
  };
}

export { Tree };
