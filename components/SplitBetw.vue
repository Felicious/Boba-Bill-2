<template>
  <!-- this is the child of TransactionList
     displays checkbox next to Friend name-->
  <div>
    <input v-model="updateCheckbox" type="checkbox" id="{name.text}" />

    <label for="{name.text}">{{ name.text }}</label>
  </div>
  <!--Q: div or p looks better? -->
</template>

<script>
export default {
  props: {
    // return selected checkboxes to selectedFriends
    cats: Array,
    // local re-name of "friend", a Friend obj passed in from parent
    name: Object
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
