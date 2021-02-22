<template>
  <div id="app">
    <h2>Boba Bill</h2>
    <FriendList v-bind:friends="friends" />

    <TransactionList v-bind:friends="friends" />
  </div>
</template>

<style>
@import "./assets/Stylesheet.css";
</style>

<script>
import FriendList from "./components/FriendList.vue";
import TransactionList from "./components/TransactionList.vue";

export default {
  components: {
    FriendList,
    TransactionList
  },

  data() {
    return {
      friends: ["Derrick", "Bunbun"]
    };
  }
};
</script>
