const makeTree = ({ entries, joinFrom, joinTo, children_as }) => {
  const hashTable = Object.create(null);
  // create a map
  entries.forEach((entry) => {
    hashTable[entry[joinFrom]] = { ...entry, [children_as]: [] };
  });
  const dataTree = [];
  for (let [, entry] of Object.entries(hashTable)) {
    const entryParent = entry[joinTo];
    const entryInHashTable = hashTable[entry[joinFrom]];

    if (entryParent && hashTable[entryParent]) {
      // if a parent is found in the hash table, we push this entry in the children array
      hashTable[entryParent][children_as].push(entryInHashTable);
    } else {
      // else the account will be treated as root
      dataTree.push(entryInHashTable);
    }
  }

  return dataTree;
};

export { makeTree };
