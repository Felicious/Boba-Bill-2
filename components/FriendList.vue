<template>
  <!-- THIS IS TODO LIST,
        the parent of Friend.vue-->

  <!--friends aren't being properly imported -->
  <div>
    <InputText
      v-model="newFriendName"
      placeholder="add a friend here!"
      @keydown.enter="addFriend"
    />
    <p v-if="duplicateName.length">{{ duplicateName }} already added!</p>

    <!--friends is arr that contains all friend data-->
    <ol v-if="friends.length">
      <h2>Friend List</h2>
      <!-- friend is variable declared locally
         name is a property of class obj from Friend.vue-->
      <Friend v-for="friend in friends" :key="friend" :name="friend" />
    </ol>
    <p v-else>
      Add some friends to the list!
    </p>
  </div>
</template>

<script>
import InputText from "./InputText.vue"; // referencing/using other files or dependencies
import Friend from "./Friend.vue";

export default {
  // variables accepted from parent
  props: {
    // kinda like function agruments (can pass to children. They're parent's data)
    friends: Array
  },
  components: {
    InputText,
    Friend
  },
  data() {
    return {
      newFriendName: "",
      duplicateName: ""
    };
  },
  methods: {
    // check if name is already in array
    isDuplicate(name) {
      return this.friends.some(
        friendName => friendName.toLowerCase() === name.toLowerCase()
      ); // true if name is in friends
    },
    addFriend() {
      // trim removes the "" at both ends of the string
      const trimmedText = this.newFriendName.trim();
      if (!this.isDuplicate(trimmedText)) {
        this.friends.push(trimmedText);
        this.newFriendName = ""; // clear
        this.duplicateName = ""; // clear previous input, if any
      } else {
        // name has been added already, notify user
        this.duplicateName = trimmedText;
      }
    }
  }
};
</script>
