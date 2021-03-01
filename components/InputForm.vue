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
        v-bind:returnedCheckboxes.sync="localForm.ppl"
      />
    </div>

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
    id: Number
  },
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
        id: 0,
        name: "",
        expense: 0,
        ppl: [],
        payers: []
      }
      
    };
  },

  methods: {
    checkForErrors: function() {
      if (
        this.localForm.name &&
        this.localForm.expense > 0 &&
        this.localForm.ppl > 0 &&
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
      if (this.localForm.ppl.length === 0) {
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
        this.localForm.id = this.id;

        // syncs with newTransaction in TransactionList.vue
        this.$emit('update:emit-form', this.localForm);

        //reset form values
        this.localForm= {id: 0, name: "", expense: 0, ppl: [], payers: []};
      }
    },
    editFormData(){
      // TODO:
      // animate: jump-to the form
      // indicate with css: editing a transaction

      // re-assign values to the form

      // error checking
      if(this.checkForErrors()){
        // make sure to emit the correct id so parent knows
      // which transaction to replace!

      }
      
    }
  }
};
</script>
