<template> </template>

<script>
export default {
  // variables accepted from parent
  props: {
    friends: Array
  },
  data() {
    return {
      // local array whose index corresponds to friends
      // do not want to mutate prop o;
      friendsOwed: []
    };
  },
  methods: {}
};
</script>
