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
    id: Number,
    autoFillFormData: {
      type: Object,
      required: false
    }
  },
  components: {
    InputText,
    SplitBetw
  },
  mounted(){
    this.initEdits();
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
      },

      // is this form for adding/editing transactions?
      isEdit: false
    };
  },

  methods: {
    initEdits(){
      if(this.autoFillFormData){
      this.localForm = this.autoFillFormData;
      this.isEdit = true;
      }
    },
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
      if(!this.checkForErrors()) {
        return; // cancel if errors
      }

      // editing form
      if(this.isEdit){

        // TODO:
      // animate: jump-to the form
      // indicate with css: editing a transaction

      // re-assign values to the form

        console.log("emit edits");
        this.$emit('edit-form', this.localForm);
        console.log(this.localForm);
      }
      //adding new form
      else {
        console.log("add new transaction");
        this.localForm.id = this.id;

        // syncs with newTransaction in TransactionList.vue
        this.$emit('update:emit-form', this.localForm);

        //reset form values
        this.localForm= {id: 0, name: "", expense: 0, ppl: [], payers: []};
      }
      
    }
  }
};
</script>
