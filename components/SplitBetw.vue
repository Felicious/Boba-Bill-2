<template>
  <!-- this is the grand-child of TransactionList
     displays checkbox next to Friend name-->
  <p>
    <input
      :id="name + type"
      v-model="updateCheckbox"
      type="checkbox"
      :value="name"
    />
    <label :for="name + type">
      {{ name }}
    </label>
  </p>
  <!--Q: div or p looks better? -->
</template>

<script>
export default {
  props: {
    // return selected checkboxes to selectedFriends
    returnedCheckboxes: Array,

    // local re-name of "friend", a Friend obj passed in from parent
    name: String,
    type: String
  },
  computed: {
    updateCheckbox: {
      get() {
        return this.returnedCheckboxes;
      },
      set(newValue) {
        this.$emit("update:returnedCheckboxes", newValue);
      }
    }
  }
};
</script>
