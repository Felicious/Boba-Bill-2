<template>
  <form id="transaction" v-on:submit="addTransaction">
    <p v-if="errors.length">
      <b>Please correct the following errors:</b>
      <ul>
        <li v-for="error in errors" :key="error">{{ error }} </li>
      </ul>

    </p>

    <InputText v-model="yourBusnName" placeholder="name of shop" />

    <input
      id="expense"
      v-model="yourExpense"
      type="number"
      name="expense"
      min="0"
    />

    <h2>Split Between</h2>
    <SplitBetw
      v-for="friend in friends"
      :key="friend"
      :name="friend"
      :returnedCheckboxes.sync="selectedFriends"
    />

    {{ selectedFriends }}

    <h2>Payers</h2>
    <SplitBetw
      v-for="friend in friends"
      :key="friend"
      :returnedCheckboxes.sync="payers"
      :name="friend"
    />

    <button class="btn">
      submit
    </button>
  </form>
</template>

<script>
import InputText from "./InputText.vue";
import SplitBetw from "./SplitBetw.vue";

export default {
  props: {
    friends: Array
  },
  components: {
    InputText,
    SplitBetw
  },
  data() {
    return {
      errors: [],
      
        yourBusnName: "",
        yourExpense: "",
        // list that stores checked boxes
        selectedFriends: [],
        selectedPayers: []
      
    };
  },

  methods: {
    checkForErrors: function(e) {
      if (
        this.name &&
        this.expense > 0 &&
        this.ppl.length > 0 &&
        this.payers.length > 0
      ) {
        return true;
      }

      this.errors = [];

      if (!this.name) {
        this.errors.push("Shop name required.");
      }
      if (!this.expense) {
        // does falsy include 0?
        this.errors.push(
          "Congrats! Was your boba on the house bc you look Q today? Go ahead and cancel this transaction bc you can't split your charm (;"
        );
      }
      if (this.ppl.length === 0) {
        this.errors.push("People to split bill with required.");
      }
      if (this.payers.length === 0) {
        this.errors.push("Payer required.");
      }

      if (!this.errors.length) {
        return true;
      }

      e.preventDefault(); // what does this do?
    }
  },
  addTransaction() {
    if(this.checkForErrors()) {
      this.$emit('update:add-transaction', this.bill);
    }
  }
};
</script>
