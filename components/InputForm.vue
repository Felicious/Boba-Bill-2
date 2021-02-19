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
        :returnedCheckboxes.sync="localForm.friends"
      />
    </div>

    {{ localForm.friends }}

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
    value: {
      type: Object,
      required: true
    }
  },
  components: {
    InputText,
    SplitBetw
  },
  data() {
    return {
      // initialize *reactive* data
      errors: [],
      /*
      bill: [], 
      value.name: "",
      value.expense: "", */
      // list that stores checked boxes
      selectedFriends: [],
      selectedPayers: [],

    };
  },
  
  watch: {
    /*
    updateFriends: {
      immediate: true,
      handler() {
        this.localForm.friends = this.selectedFriends;
      }
    }

    localForm: {
      immediate: true,
      handler(newVal) {
          this.$emit('input', newVal)
      },
      deep: true
    }*/
  },

  // computed section handles the getters + setters
  computed:{

    // local copy of `value` object;
    // not good practice to directly modify prop from parent
    localForm: {
      get() { return this.value },
      set(newVal) {this.$emit('input', newVal)
      }
    },


    // event handler for modifications of friends and payers arr
    
    /*
    updateFriends: {
      get() {
        return this.selectedFriends;
      },
      set(newVal) {
       this.$emit('update:friend', newVal);
      }
    },
    
    updatePayers: {
      get() {
        return this.selectedPayers;
      },
      set(newVal) {
       this.$emit('input', newVal);
      }
    }*/
  },

  methods: {
    checkForErrors: function() {
      if (
        this.value.name &&
        this.value.expense > 0 &&
        this.selectedFriends > 0 &&
        this.selectedPayers > 0
      ) {
        return true;
      }

      this.errors = [];

      if (!this.value.name) {
        this.errors.push("Shop name required.");
      }
      if (!this.value.expense) {
        // does falsy include 0?
        this.errors.push("Amount spent required.");
      }
      if (this.localForm.friends.length === 0) {
        this.errors.push("People to split costs with required.");
      }
      if (this.selectedPayers.length === 0) {
        this.errors.push("Payer required.");
      }

      if (!this.errors.length) {
        this.bill = 
          {
            busnName: this.value.name,
            expense: this.value.expense,
            friends: this.selectedFriends,
            payers: this.selectedPayers
          };
        return true;
      }

    }, 
    emitFormData() { // on submit handler
      if(this.checkForErrors()) {
        console.log("start emitting");

        // emit each property one by one

        console.log(`Form data: ${this.value.name}`);
        console.log(`business name: ${this.localForm.name}`)
        
        console.log(`Form data: ${this.value.expense}`);
        console.log(`cost: ${this.localForm.expense}`);

        //this.localContainer.friends = this.selectedFriends;
        console.log(`Form data: ${this.value.friends}`);
        console.log(`selected friends: ${this.localForm.friends}`);
        
        /*
        this.localContainer.payers= this.selectedPayers;
        console.log(`Form data:${this.selectedPayers}`);
        console.log(`selected payers: ${this.localContainer.payers}`);

        this.$emit('update:add-transaction', this.localContainer);
        */
      
      }
    }
  }
};
</script>
