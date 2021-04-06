<template>
  <form id="transaction" @submit.prevent="emitFormData">
    <p v-if="errors.length">
      <b>Please correct the following errors:</b>
      <ul>
        <li v-for="error in errors" :key="error">{{ error }} </li>
      </ul>

    </p>

    <div class="lineContainer">

    <InputText v-model="localForm.name" question="Business name" 
      ref="busnInput" class="col-item"/>
    
    <InputNum v-model.number="localForm.expense" min="0" ref="costInput" class="col-item"/>

    </div>

    <div>
      <h2>Split Between</h2>
      <SplitBetw
        v-for="friend in friends"
        :key="friend"
        :name="friend"
        type="split"
        :instance="localForm.id.toString()"
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
        :instance="localForm.id.toString()"
      />
    </div>
    
    <!-- button itself is a wrapper
          what we'll be clicking is the button edge? -->
    <button type="submit" class="submit">
      <span class="shadow"></span>
      <span class="button-edge"></span>
      <span class="front">
        submit
      </span>
    </button>
  </form>
</template>

<style>
@import "../assets/Animations.css";
</style>

<script>
import InputText from "./InputText.vue";
import InputNum from "./InputNum.vue";
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
    InputNum,
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

      /* directly manipulate InputText to change font color
         of input to white so it can be seen on black background */
      this.$refs.busnInput.changeColor("white");
      this.$refs.costInput.changeColor("white");
      }
    },

    /*
    helper function that returns array size of errors
      */
    haveErrors(){
      let errorArray = formTests.formIsFilled(this.errors, this.localForm);
      if(errorArray.length === 0){
        // no errors!
        return false;
      } else {
        return true;
      }
    },

    emitFormData() { // on submit handler
      if(this.haveErrors())
      {
        return; // cancel if there are errors
      }

      // EDIT TRANSACTION
      if(this.isEdit){

        // TODO:
      // animate: jump-to the form
      // indicate with css: editing a transaction

      // re-assign values to the form
        console.log('emit to Transaction');
        this.$emit('toggle-update-status');

        console.log("emit to grandma");
        this.$emit("edit-form", this.localForm, this.localForm.id);
      }
      // ADD TRANSACTION
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
