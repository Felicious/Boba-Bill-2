<template>
  <div id="app">
    <h2>Boba Bill</h2>
    <FriendList />
  </div>
</template>

<script>
import FriendList from "./components/FriendList.vue";

export default {
  components: {
    FriendList
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400&display=swap");
#app {
  font-family: "Montserrat", sans-serif;
}
h2 {
  text-align: center;
}
</style>
