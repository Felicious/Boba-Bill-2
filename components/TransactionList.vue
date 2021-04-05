<template>
  <div v-show="friends.length" class="transaction">
    <h2>Transaction</h2>
    <div class="newTransaction">
      <InputForm
        :friends="friends"
        :id="transactionId"
        @update:emit-form="addTransaction"
      />
    </div>

    <!-- display transactions, 3 in a row -->
    <div v-if="transactions.length" class="display">
      <Transaction
        v-for="(transaction, index) in transactions"
        :friends="friends"
        :key="index"
        :index="index"
        :bill="transaction"
        @edit-form="editTransaction"
      />
    </div>

    {{ transactions[0].payers }}
  </div>
</template>

<script>
import InputForm from "./InputForm.vue";
import Transaction from "./Transaction.vue";

export default {
  // variables accepted from parent
  props: {
    friends: Array,
    transactions: Array
  },

  components: {
    InputForm,
    Transaction
  },

  data() {
    return {
      transactionId: 2,
      currentState: "view"
    };
  },

  methods: {
    // @param: returned form data from InputForm
    addTransaction(newTransaction) {
      console.log(newTransaction);
      this.transactions.push(newTransaction);

      //reset values for new transaction
      this.transactionId++;
    },
    editTransaction(bill, index) {
      console.log(`editing ${index}: ${bill.name} now`);
      // this.transactions.splice(index, 1, bill);
    }
  }
};
</script>
