<template> </template>

<script>
export default {
  // variables accepted from parent
  props: {
    friends: Array,
    transactions: Array
  },
  data() {
    return {
      // local array whose index corresponds to friends
      // do not want to mutate prop o;
      friendsOwed: [
        //name: "",
        //owed: 0
      ]
    };
  },
  methods: {
    /* 
		id, name, expense, ppl:[], payers:[]  */
    calculateOwed(transaction) {
      // amount everyone owes if split evenly
      let individCost = transaction.cost / transaction.ppl.length;
      for (let i = 0; i < transaction.ppl.length; i++) {
        const person = transaction.ppl[i];
        const index = this.friends.indexOf(person);
        // add to friendsOwed[index]

        // is this person also a payer?

        if (transaction.payer.includes(person)) {
          // YES: expect a negative value
          const payerPaid = transaction.cost / transaction.payer.length;
          friendsOwed[index] += individCost - payerPaid;
        } else {
          // NO:
          friendsOwed[index] += individCost;
        }
        // ALERT: what if a payer paid but didn't eat?
        // TODO: handle this edge case
      }
    }
  }
};
</script>
