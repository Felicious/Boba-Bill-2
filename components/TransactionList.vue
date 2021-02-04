<template>
  <h2>Transaction</h2>

  <form id="transaction" 
    @submit="checkForm" 
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
    :name="friend"
    v-on:select-friend="checkboxHandler(friend)"
  />

  <p>{{ selectedFriends }}</p>



  
      

</template>

<script>
import FriendList from "./FriendList.vue";
import SplitBetw from "./SplitBetw.vue";

let nextShopId = 1;
export default {
  components: {},

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
      selectedFriends: []
    };
  },

  methods: {
    checkForm: function(e){
        
    }

    /* @param: instance of friend; {id: someNum, text: "name"}
     * returns: name of friend added/removed from selectedFriends list
     */
    checkboxHandler(friend) {
      // if name is in list, remove name
      if (this.selectedFriends.find(element => element === friend.text)) {
        /* why is it so complicated to remove an item from an array?
          splice requires 1) index of thing you're removing
          2) num of things you're removing*/
        this.selectedFriends.splice(
          this.selectedFriends.indexOf(friend.text),
          1
        );
      } else {
        this.selectedFriends.push(friend.text);
      }
    }
  }
};
</script>
