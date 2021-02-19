<template>
  <div>
    <h2>Transaction</h2>

    <!--shorthand; v-bind:friends is same is :friends-->
    <!--
    <InputForm :friends="friends" :Container.sync="newTransaction" /> -->
    <!-- shorthand is :add-transaction.sync="addTransaction"-->

    <InputForm :friends="friends" :emit-form.sync="newTransaction" />
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
  }
};
</script>
