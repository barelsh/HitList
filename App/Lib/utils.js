module.exports = {
  joinArrays: (array1, key1, array2, key2, reducer) => {
    let ix = new Map();
    array1.forEach((row) => // loop through m items
        ix.set(row[key1], row),    // populate index for primary table
      );                         // create an index for primary table

    return array2.map(row =>              // loop through n items
      reducer(ix.get(row[key2]),     // get corresponding row from primary
        row));
  },

  generateGuid: () => {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }

    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
           s4() + '-' + s4() + s4() + s4();
  }

}
