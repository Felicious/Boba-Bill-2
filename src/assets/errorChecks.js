// where all the error checking occurs

let formTests = {
  /**
   * @param: error array (of objs) + form data object
   *
   * returns a mutated error array.
   *  If no errors, the array will be empty: [].
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

  /* 
    algorithm: DFS method, while searching for matches, check the first attriute (busName) for a match,
      Will check the proceeding attributes only if all the attributes before it match
      Ex: will only need to check (3) if both the business (1) and cost (2) match 

      Priority:
      1. Business name
      2. Amount spent
      3. Ppl the bill is split between
      4. Payers

    return: true if new transaction is already in transactions
  */

  // check if name is already in array
  isDuplicateF(friends, newName) {
    return friends.some(name => name.toLowerCase() === newName.toLowerCase()); // true if name is in friends
  },

  // check if transaction already exists
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
          console.log(`who are the ppl?: ${currentPpl}`);

          // return true if all elements of currentArray are found in newArray
          const pplMatch = currentPpl.every(person => {
            // evaluates to true if this element is found in newArray
            console.log(
              `checking if ${person} (current) is found in ${newTransaction.ppl}(new)`
            );

            console.log(newTransaction.ppl.includes(person));
            return newTransaction.ppl.includes(person);
          });

          if (pplMatch) {
            console.log("the ppl match! check if payers match too");

            const currentPayers = transactions[i].payers;
            console.log(`Who are the payers? ${currentPayers}`);

            const payersMatch = currentPayers.every(payer => {
              console.log(`is ${payer} in ${newTransaction.payers}?`);
              console.log(newTransaction.payers.includes(payer));
              return newTransaction.payers.includes(payer);
            });

            if (payersMatch) {
              console.log("Omg everything matches, lol. This is a duplicate");
              return true;
            } else {
              console.log(
                `the payers don't match. Time to go all the way back to checking names!`
              );
            }
          } else {
            console.log("the ppl don't match! moving on (:");
          }
        } else {
          console.log(
            `new price ${newTransaction.expense} does not match with array element cost ${currentCost}. We can continue looking at other names now`
          );
        }
      }
    }

    // if it got out of the for loop, that means none of the names matched! yay!
    console.log("No duplicates found");
    return false; // for no duplicates
  }
};

export default formTests;
