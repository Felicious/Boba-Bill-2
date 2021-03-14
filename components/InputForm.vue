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
        :instance="localForm.id"
        v-bind:returnedCheckboxes.sync="localForm.ppl"
      />
    </div>

    <div>
      <h2>Payers</h2>
      <SplitBetw
        v-for="friend in friends"
        :key="friend"
        :returnedCheckboxes.sync="localForm.payers"
        :name="friend"
        type="payers"
        :instance="localForm.id"
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
import formTests from "../assets/errorChecks.js";

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

    /*
    this function is the long version of the (unreadable) 
      functional function below
      */
    checkSize(arr){
      if(arr.length === 0){
        //
        return true;
      } else {
        return false
      }
    },

    emitFormData() { // on submit handler
      if( !this.checkSize (formTests.formIsFilled(this.errors, this.localForm)))
      {
        return; // cancel if errors
      }

      // editing form
      if(this.isEdit){

        // TODO:
      // animate: jump-to the form
      // indicate with css: editing a transaction

      // re-assign values to the form
        console.log('emit to Transaction');
        this.$emit('update:edits');

        console.log("emit to grandma");
        this.$emit("edit-form", this.localForm, this.localForm.id);
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
