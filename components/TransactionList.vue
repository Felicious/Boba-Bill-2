<template>
  <div v-show="friends.length" class="transaction">
    <h2>Transaction</h2>
    <InputForm
      :friends="friends"
      :id="transactionId"
      @update:emit-form="addTransaction"
    />

    <!-- display transactions -->
    <div v-if="transactions.length" class="display">
      <Transaction
        v-for="(transaction, index) in transactions"
        :friends="friends"
        :bill.sync="transactions[index]"
        :key="transaction.name"
        :index="index"
      />
    </div>
  </div>
</template>

<script>
import InputForm from "./InputForm.vue";
import Transaction from "./Transaction.vue";

export default {
  // variables accepted from parent
  props: {
    friends: Array
  },

  components: {
    InputForm,
    Transaction
  },

  data() {
    return {
      transactionId: 2,
      transactions: [
        {
          id: 0,
          name: "Fugetsu",
          expense: 25,
          ppl: ["Derrick", "Bunbun"],
          payers: ["Derrick"]
        },
        {
          id: 1,
          name: "Shihlin Street Snacks",
          expense: 14,
          ppl: ["Derrick", "Bunbun"],
          payers: ["Bunbun"]
        }
      ],
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
      console.log(`editing this ${bill.name} now`);
      this.transactions.splice(index, 1, bill);
    }
  }
};
</script>
