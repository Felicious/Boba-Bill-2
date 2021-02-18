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
        type="split"
        :name="friend"
        :returnedCheckboxes.sync="selectedFriends"
      />
    </div>

    {{ selectedFriends }}

    <div>
      <h2>Payers</h2>
      <SplitBetw
        v-for="friend in friends"
        type="payers"
        :key="friend"
        :returnedCheckboxes.sync="selectedPayers"
        :name="friend"
      />
    </div>

    {{ selectedPayers }}
    
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
    friends: Array,
    
    // returned to newTransaction in TransactionList
    value: Object
  },
  components: {
    InputText,
    SplitBetw
  },
  data() {
    return {
      // initialize *reactive* data
      errors: [],
      
      //bill: [],

      yourBusnName: "",
      yourExpense: "",
      // list that stores checked boxes
      selectedFriends: [],
      selectedPayers: []
      
    };
  },

  methods: {
    checkForErrors: function() {
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
        this.errors.push("Amount spent required.");
      }
      if (this.selectedFriends.length === 0) {
        this.errors.push("People to split costs with required.");
      }
      if (this.selectedPayers.length === 0) {
        this.errors.push("Payer required.");
      }

      if (!this.errors.length) {
        this.newTransaction.push(
          {
            busnName: this.yourBusnName,
            expense: this.yourExpense,
            friends: this.selectedFriends,
            payers: this.selectedPayers
          }
        );
        return true;
      }

    }, 
    addTransaction() {
      if(this.checkForErrors()) {
        this.$emit('update:add-transaction', this.newTransaction);
      }
    }
  }
};
</script>
