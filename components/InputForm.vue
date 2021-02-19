<template>
  <form id="transaction" @submit.prevent="emitFormData">
    <p v-if="errors.length">
      <b>Please correct the following errors:</b>
      <ul>
        <li v-for="error in errors" :key="error">{{ error }} </li>
      </ul>

    </p>

    <InputText v-model="localForm.name" placeholder="name of shop" />

    <input
      id="expense"
      placeholder="$"
      v-model="localForm.expense"
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
        type="split"
        v-bind:returnedCheckboxes.sync="localForm.friends"
      />
    </div>

    {{ localForm.friends }}

    <div>
      <h2>Payers</h2>
      <SplitBetw
        v-for="friend in friends"
        type="payers"
        :key="friend"
        :returnedCheckboxes.sync="localForm.payers"
        :name="friend"
      />
    </div>

    {{ localForm.payers }}
    
    <button type="submit">
      submit
    </button>
  </form>
</template>

<script>
import InputText from "./InputText.vue";
import SplitBetw from "./SplitBetw.vue";

export default {
  props: { friends: Array },
  components: {
    InputText,
    SplitBetw
  },
  data() {
    return {
      // initialize *reactive* data
      errors: [],

      // emit this to TransactionList
      localForm: {
        name: "",
        expense: 0,
        friends: [],
        payers: []
      }
      
    };
  },

  methods: {
    checkForErrors: function() {
      if (
        this.localForm.name &&
        this.localForm.expense > 0 &&
        this.localForm.friends > 0 &&
        this.localForm.payers > 0
      ) {
        return true;
      }

      this.errors = [];

      if (!this.localForm.name) {
        this.errors.push("Shop name required.");
      }
      if (!this.localForm.expense) {
        // does falsy include 0?
        this.errors.push("Amount spent required.");
      }
      if (this.localForm.friends.length === 0) {
        this.errors.push("People to split costs with required.");
      }
      if (this.localForm.payers.length === 0) {
        this.errors.push("Payer required.");
      }

      if (!this.errors.length) {
        return true;
      }

    },
    
    emitFormData() { // on submit handler
      if(this.checkForErrors()) {
        console.log("start emitting");

        // emit each property one by one

        console.log(`business name: ${this.localForm.name}`);
        
        console.log(`cost: ${this.localForm.expense}`);

        console.log(`selected friends: ${this.localForm.friends}`);
        
        console.log(`selected payers: ${this.localForm.payers}`);

        // syncs with newTransaction in TransactionList.vue
        this.$emit('update:emit-form', this.localForm);
      }
    }
  }
};
</script>
