<template>
  <div id="app">
    <h2>Boba Bill</h2>
    <FriendList />
  </div>
</template>

<script>
import FriendList from "./components/FriendList.vue";
//import TransactionList from "./components/TransactionList.vue";

export default {
  components: {
    FriendList
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
