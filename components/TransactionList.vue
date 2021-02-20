<template>
  <div>
    <h2>Transaction</h2>
    <InputForm :friends="friends" @update:emit-form="addTransaction" />
    <!-- newTranaction is an object with 4 attributes-->
  </div>
</template>

<script>
import InputForm from "./InputForm.vue";

export default {
  // variables accepted from parent
  props: {
    friends: Array
  },

  components: {
    InputForm
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
