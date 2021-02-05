<template>
<div>
  <h2>Transaction</h2>

  <form id="transaction" 
    @submit="checkForErrors" 
    action="[destination url]" 
    method="post"
  >

  <input
    id="busnName"
    v-model="busnName"
    type="text"
    name="busnName"
    placeholder="name of shop"
  >

  <input
    id="expense"
    v-model="expense"
    type="number"
    name="expense"
    min="0"
  >

  <h2>Split Between</h2>
  <SplitBetw
    v-for="friend in friends"
    :key="friend.id"
    :cats.sync="selectedFriends"
    :name="friend"
  />

  <!--use selected friends to store checked checkbox values

    NOT SURE IF THIS IS RIGHT PLS CHECK AGAIN + look at Friend class-->
  <p v-for="friend in selectedFriends" :key="friend.id">{{ friend.text }}</p>
  
</div>
</template>

<script>
import FriendList from "./FriendList.vue";
import SplitBetw from "./SplitBetw.vue";

let nextShopId = 1;
export default {
  components: {
    FriendList, SplitBetw
  },

  data() {
    return {
      errors: [],
      transactions: [
      {
        id: nextShopId++,  
        name: 'Fugetsu',
        expense: 25,
        ppl: ['Derrick', 'Bunbun'],
        payers: ['Derrick']
      },
      {
        id: nextShopId++,
        name: 'Shihlin Street Snacks',
        expense: 14,
        ppl: ['Derrick', 'Bunbun'],
        payers: ['Bunbun']
      }
      ],
      selectedFriends: [],
      selectedPayers: []
    };
  },

  methods: {
    checkForErrors: function(e){
      if (this.name && (this.expense > 0) && 
        (this.ppl.length > 0) && (this.payers.length > 0)) 
      {
        return true;
      }

      this.errors = [];

      if (!this.name) {
        this.errors.push('Shop name required.');
      }
      if (!this.expense){ // does falsy include 0?
        this.errors.push('Congrats! Was your boba on the house bc you look Q today? Go ahead and cancel this transaction bc you can\'t split your charm (;');
      }
      if (this.ppl.length === 0){
        this.errors.push('People to split bill with required.');
      }
      if (this.payers.length === 0){
          this.errors.push('Payer required.')
      }

      e.preventDefault();
    }
  }
};
</script>
