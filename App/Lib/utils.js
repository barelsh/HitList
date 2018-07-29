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
  },

  /**
   *
   * @param balances [{id_number, name_string, balance_number}...]
   * @param transaction {whoPayed_number,forWhom_number,amount_number}
   * @returns {Array} [{id_number, name_string, balance_number}...]
   */
  updateBalances: (balances, transaction) => {
    const payedCount = transaction.forWhom.length
    const isPayerIncluded = transaction.forWhom.includes(transaction.whoPayed)
    return balances.map(member =>
      member.memberId == transaction.whoPayed ?
        (isPayerIncluded ?
          {...member,
            balance: Math.round((member.balance - (transaction.amount * (1 - (1/payedCount)))) * 100) / 100
          }
        :
          {...member,
            balance: Math.round((member.balance - transaction.amount) * 100) / 100
          }
        )
      :
      transaction.forWhom.includes(member.memberId) ?
        {...member,
          balance: Math.round((member.balance + (transaction.amount / payedCount)) * 100) / 100
        }
        :
        {...member}
    )
  }

}
