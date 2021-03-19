<template>
  <div id="app">
    <h2>Boba Bill</h2>
    <FriendList v-bind:friends="friends" />

    <TransactionList v-bind:friends="friends" :transactions="transactions" />

    <CalculateList :friends="friends" :transactions="transactions" />
  </div>
</template>

<style>
@import "./assets/Stylesheet.css";
</style>

<script>
import FriendList from "./components/FriendList.vue";
import TransactionList from "./components/TransactionList.vue";
import CalculateList from "./components/CalculateList.vue";

export default {
  components: {
    FriendList,
    TransactionList,
    CalculateList
  },

  data() {
    return {
      friends: ["Derrick", "Bunbun"],
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
      ]
    };
  }
};
</script>
