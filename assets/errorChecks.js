// where all the error checking occurs

let formTests = {
  /**
   * @param: error array (of objs) + form data object
   *
   * returns a mutated error array.
   *  If no errors, the array will be empty: [].
   *
   *  a non-empty error array will always be length === 4:
   *  ex: 1 error in payers will be stored as
   *    [ {}, {}, {}, {id: "payers", msg: "u errored"}]
   *
   * to check if obj is empty, use `Object.keys()`
   *
   */
  formIsFilled(errors, formData) {
    console.log("starting error checking!");
    console.log(`current errors: ${errors}`);
    if (
      formData.name &&
      formData.expense > 0 &&
      formData.ppl > 0 &&
      formData.payers > 0
    ) {
      console.log("no errors! (:");
      return [];
    }

    // clear residual errors from last time
    // note: cannot use errors = []
    errors.splice(0);

    // check if name is empty
    // AND if the error is already inside the error array
    if (!formData.name) {
      errors.push("Shop name required.");
    }
    if (!formData.expense) {
      // does falsy include 0?
      errors.push("Amount spent required.");
    }
    if (formData.ppl.length === 0) {
      errors.push("People to split costs with required.");
    }
    if (formData.payers.length === 0) {
      errors.push("Payer required.");
    }

    if (!errors.length) {
      return [];
    } else {
      console.log("errors we end up with:");
      console.log(errors);
      return errors;
    }
  },

  /* checks if new transaction is already in transactions
    algorithm: trying DFS method, where searching if the first attribute (busnName) matches,
      will search deep and check if the other attributes are the same.
      If there are no matches on a level, return false (no dupl) and exit (:
  */

  isDuplicateT(transactions, newTransaction) {
    // sweep busNames first, if not dups, exit
    for (let i = 0; i < transactions.length; i++) {
      const currentName = transactions[i].name;
      if (currentName === newTransaction.name) {
        // this means we need to do a deep search, cri
        console.log(
          `another transaction at ${currentName} detected! Commencing deep search`
        );

        // check cost:
        const currentCost = transactions[i].expense;
        if (currentCost === newTransaction.expense) {
          console.log(
            `oop the prices of ${currentCost} match too! going deeper`
          );

          // now have to check the ppl it's split between. this is complicated because this is an array within an arr oop

          /** thinking about the algorithm, say I have the currentArray ["Derrick", "Felicia"] and newArray ["Derrick"]
           * since the array elements might not always have the same order, I can't always just check if the first element is Derrick
           * I have to check if every element of the currentArray (so Derrick and Felicia) is in newArray
           *
           * Therefore, it is a duplicate if all elements of currentArray are found in newArray
           * (I think there is an array member function that checks if a value is in the array? Let's call it "isIn()" for now,
           * I'll look for the real name when I land hahaha)
           */

          const currentPpl = transactions[i].ppl;
          console.log(`what array is it?: ${currentPpl}`);

          // return true if all elements of currentArray are found in newArray
          const pplMatch = currentPpl.every(person => {
            // evaluates to true if this element is found in newArray
            console.log(
              `checking ${person}: ${transactions[i].ppl.includes(person)}`
            );

            transactions[i].ppl.includes(person);
          });

          console.log(pplMatch);

          if (pplMatch) {
            console.log("TODO: the ppl match! check if payers match too");
          } else {
            console.log("the ppl don't match! moving on (:");
            continue;
          }
        } else {
          console.log(
            `price of newTransaction: ${newTransaction.expense} does not match with array element cost ${currentCost}. We can continue looking at other names now`
          );
          continue; // move onto to comparing the next name
        }
      }
    }

    // if it got out of the for loop, that means none of the names matched! yay!
    console.log("No duplicates found");
    return false; // for no duplicates
  }
};

export default formTests;
