<!--TODO: make component for Splitbetw, separate from FriendList-->
<template>
  <!-- this is the child of FriendList
           displays each friend in the list-->
  <li>{{ name }}</li>
  <!--Q: div or p looks better? -->
</template>

<style>
li {
  font: inherit;
  font-size: medium;
}
</style>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    }
  }
};
</script>
