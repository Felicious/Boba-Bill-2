<template>
  <div>
    <button @click="calculateOwed(transactions[2])">
      calculate
    </button>
    {{ friendsOwed }}
  </div>
</template>

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
  mounted() {
    this.initArray();
  },
  methods: {
    initArray() {
      console.log("initialization");
      // populate array
      this.friends.forEach(friend => {
        this.friendsOwed.push({ name: friend, owed: 0 });
      });
    },
    /* 
		id, name, expense, ppl:[], payers:[]  */
    calculateOwed(transaction) {
      console.log("starting calc");
      // amount everyone owes if split evenly
      console.log(transaction.expense);
      let individCost = transaction.expense / transaction.ppl.length;
      for (let i = 0; i < transaction.ppl.length; i++) {
        const person = transaction.ppl[i];
        /* data of how much a person owes will be the saved 
            in the same order as how the names are stored in "friends"*/
        const index = this.friends.indexOf(person);

        // add to friendsOwed[index]
        this.friendsOwed[index].name = person;

        console.log(person);

        // is this person also a payer?

        if (transaction.payers.includes(person)) {
          console.log(`${person} is a payer`);
          // YES: expect a negative value
          const payerPaid = transaction.expense / transaction.payers.length;
          this.friendsOwed[index].owed += individCost - payerPaid;
        } else {
          // NO:
          console.log(`${person} owes some smoney.`);
          this.friendsOwed[index].owed += individCost;
        }
      }

      // edge case ALERT: what if a payer paid but didn't eat?
      transaction.payers.forEach(currentPayer => {
        if (!transaction.ppl.includes(currentPayer)) {
          // this is the edge case!
          const index = this.friends.indexOf(currentPayer);
          const amountPaid = transaction.expense / transaction.payers.length;
          this.friendsOwed[index].owed -= amountPaid;

          console.log(
            `Edge case triggered: ${currentPayer} paid ${amountPaid} but didn't eat themselves ><`
          );
        }
      });
    }
  }
};
</script>
