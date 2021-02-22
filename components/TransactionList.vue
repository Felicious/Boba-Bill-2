<template>
  <div class="transaction">
    <div class="wave">
      <!-- creating a SVG image -->
      <svg viewBox="0 0 500 500" preserveAspectRatio="xMinYMin meet">
        <path
          d="M0, 100 C150, 200 350, 
                0 500, 100 L500, 00 L0, 0 Z"
          style="stroke:none; fill:white;"
        ></path>
      </svg>
    </div>
    <h2>Transaction</h2>
    <InputForm :friends="friends" @update:emit-form="addTransaction" />

    <!-- display transactions -->
    <div v-if="transactions.length" class="display">
      <Transaction
        v-for="transaction in transactions"
        :key="transaction.name"
        :bill="transaction"
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
      newTransaction: {},
      transactions: [
        {
          name: "Fugetsu",
          expense: 25,
          ppl: ["Derrick", "Bunbun"],
          payers: ["Derrick"]
        },
        {
          name: "Shihlin Street Snacks",
          expense: 14,
          ppl: ["Derrick", "Bunbun"],
          payers: ["Bunbun"]
        }
      ]
    };
  },

  methods: {
    // @param: returned form data from InputForm
    addTransaction(newTransaction) {
      console.log("Adding a transaction");
      this.transactions.push(newTransaction);
    }
  }
};
</script>
