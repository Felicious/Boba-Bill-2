<template>
  <!-- this is the child of TransactionList
     displays checkbox next to Friend name-->
  <p>
    <label for="{name}">
      <input v-model="updateCheckbox" type="checkbox" :value="friend" />
      {{ name }}
    </label>
  </p>
  <!--Q: div or p looks better? -->
</template>

<script>
export default {
  props: {
    // return selected checkboxes to selectedFriends
    cats: Array,
    // local re-name of "friend", a Friend obj passed in from parent
    name: {
      type: Object,
      required: true
    },
    friends: Array
  },
  computed: {
    updateCheckbox: {
      get() {
        return this.cats;
      },
      set(newValue) {
        this.$emit("update:cats", newValue);
      }
    }
  }
};
</script>
