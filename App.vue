<template>
  <div id="app">
    <h2>Boba Bill</h2>
    <FriendList v-bind:friends="friends" v-bind:initialCounter="nextFriendId" />

    <TransactionList friends="friends" />
  </div>
</template>

<script>
import FriendList from "./components/FriendList.vue";
import TransactionList from "./components/TransactionList.vue";

let nextFriendId = 1;
export default {
  components: {
    FriendList,
    TransactionList
  },

  data() {
    return {
      friends: [
        {
          id: nextFriendId++,
          text: "Derrick"
        },
        {
          id: nextFriendId++,
          text: "Bunbun"
        }
      ],

      nextFriendId
    };
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Varela+Round&display=swap");
#app {
  font-family: "Varela Round", sans-serif;
  background-color: #fbdec8;
  color: #1e1a1c;
}
h2 {
  text-align: center;
}
</style>
