<template>
  <div>
    <button @click="calculateAll" class="boba-button">
      <span class="shadow"></span>
      <span class="button-edge"></span>
      <span class="front">
        calculate
      </span>
    </button>

    <Bill v-for="friend in friendsOwed" :key="friend" :friend="friend" />

    {{ friendsOwed }}
  </div>
</template>

<script>
import Bill from "./Bill.vue";
export default {
  name: "BillList",
  components: {
    Bill
  },
  // variables accepted from parent
  props: {
    friends: Array,
    transactions: Array
  },
  data() {
    return {
      // local array whose index corresponds to friends
      // do not want to mutate prop o;
      // an obj that stores friend data
      friendsOwed: [
        //name: "",
        //owed: 0
      ],
      flagTransaction: []
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      // TODO: check if new friends and transactions are created when a new friend or transaction is added
      console.log("initialization");
      // populate local friends array
      this.friends.forEach(friend => {
        this.friendsOwed.push({ name: friend, owed: 0 });
      });

      // set flags to unread
      this.transactions.forEach(() => {
        this.flagTransaction.push(false);
      });
    },
    /*
    id, name, expense, ppl:[], payers:[]
    */
    calculateOwed(transaction) {
      console.log("starting calc");
      // amount everyone owes if split evenly
      console.log(transaction.expense);
      let individCost = transaction.expense / transaction.ppl.length;
      for (let i = 0; i < transaction.ppl.length; i++) {
        // TODO: person, the variable, is unnecessary but it's here for readability. maybe can remove it in a later date?
        const person = transaction.ppl[i];
        /* data of how much a person owes will be the saved
            in the same order as how the names are stored in "friends"*/
        const index = this.friends.indexOf(person);
        console.log(`before, ${person} owed ${this.friendsOwed[index].owed}.`);

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
          console.log(`${person} owes ${individCost} smoney.`);
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
    },
    calculateAll() {
      this.transactions.forEach(transaction => {
        /* NOTE TO SELF:
          the index of the transaction is stored at:
          transaction.id (: */
        if (!this.flagTransaction[transaction.id]) {
          this.calculateOwed(transaction);
          // mark as "read"
          this.flagTransaction[transaction.id] = true;
        }
        // don't count again if flag is true
      });
    }
    // end of "methods()"
  }
};
</script>
