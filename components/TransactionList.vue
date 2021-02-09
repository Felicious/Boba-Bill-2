<template>
  <div>
    <h2>Transaction</h2>

    <!--shorthand; v-bind:friends is same is :friends-->
    <InputForm
      v-bind:friends="friends"
      v-model="newTransaction"
      v-on:add-transaction="addTransaction"
    />

    <!--use selected friends to store checked checkbox values

    NOT SURE IF THIS IS RIGHT PLS CHECK AGAIN + look at Friend class-->
    <p v-for="friend in selectedFriends" :key="friend">{{ friend }}</p>
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
    addTransaction() {
      // put the data in
    }
  }
};
</script>
