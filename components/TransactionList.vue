<template>
  <div>
    <h2>Transaction</h2>
    <InputForm :friends="friends" @update:emit-form="addTransaction" />

    <!-- display transactions -->
    <div v-if="transactions.length" class="display">
      <div class="box">
        <!--TODO: transaction 1 displayed here -->
      </div>
      <div class="box">
        <!--second transaction displayed here-->
      </div>
      <div class="box">
        <!-- third displayed here -->
      </div>
    </div>
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
