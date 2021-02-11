<template>
  <form id="transaction" @submit.prevent="addTransaction">
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

    <div>
      <h2>Split Between</h2>
      <SplitBetw
        v-for="friend in friends"
        :key="friend"
        :name="friend"
        :returnedCheckboxes.sync="selectedFriends"
      />
    </div>

    {{ selectedFriends }}

    <div>
      <h2>Payers</h2>
      <SplitBetw
        v-for="friend in friends"
        :key="friend"
        :returnedCheckboxes.sync="selectedPayers"
        :name="friend"
      />
    </div>
    
    <button type="submit">
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
        this.yourBusnName &&
        this.yourExpense > 0 &&
        this.selectedFriends > 0 &&
        this.selectedPayers > 0
      ) {
        return true;
      }

      this.errors = [];

      if (!this.yourBusnName) {
        this.errors.push("Shop name required.");
      }
      if (!this.yourExpense) {
        // does falsy include 0?
        this.errors.push(
          "Congrats! Was your boba on the house bc you look Q today? Go ahead and cancel this transaction bc you can't split your charm (;"
        );
      }
      if (this.selectedFriends.length === 0) {
        this.errors.push("People to split bill with required.");
      }
      if (this.selectedPayers.length === 0) {
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
