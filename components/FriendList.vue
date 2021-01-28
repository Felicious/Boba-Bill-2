<template>
  <!-- THIS IS TODO LIST,
        the parent of Friend.vue-->
  <div>
    <InputText
      v-model="newFriendName"
      placeholder="add a friend here!"
      @keydown.enter="addFriend"
    />

    <!--friends is arr that contains all friend data-->
    <ul v-if="friends.length">
      <h2>Friend List</h2>
      <!-- friend is variable declared locally
         name is a property of class obj from Friend.vue-->
      <Friend v-for="friend in friends" :key="friend.id" :name="friend" />

      <h2>Split Between</h2>
      <SplitBetw
        v-for="person in friends"
        :key="person.id"
        :name="person"
        v-on:select-friend="checkboxHandler(person)"
      />

      <p>{{ selectedFriends }}</p>
    </ul>
  </div>
</template>

<script>
import InputText from "./InputText.vue";
import Friend from "./Friend.vue";
import SplitBetw from "./SplitBetw.vue";

let nextFriendId = 1;
export default {
  components: {
    InputText,
    Friend,
    SplitBetw
  },
  data() {
    return {
      newFriendName: "",
      friends: [
        {
          id: nextFriendId++,
          text: "Derrick"
        },
        {
          id: nextFriendId++,
          text: "Bunbun"
        }
      ],
      selectedFriends: []
    };
  },
  methods: {
    addFriend() {
      // trim removes the "" at both ends of the string
      const trimmedText = this.newFriendName.trim();
      if (trimmedText) {
        this.friends.push({
          id: nextFriendId++,
          text: trimmedText
        });
        this.newFriendName = ""; // clear
      }
    },
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
