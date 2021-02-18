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
    // sync-ed with parent, parent receives an arr selectedFriends
    returnedCheckboxes: Array,

    // local re-name of "friend", so the ids can be unique across diff iterations of SplitBetw component
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

// read [docs](https://github.com/Felicious/Boba-Bill-2/blob/main/notes.md#Potential-Errors-when-using-Repeated-Components)
// for further explanation on how the code in this component works
</script>
