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
      newFriendName: ""
    };
  },
  methods: {
    addFriend() {
      // trim removes the "" at both ends of the string
      const trimmedText = this.newFriendName.trim();
      if (trimmedText) {
        this.friends.push(trimmedText);
        this.newFriendName = ""; // clear
      }
    }
  }
};
</script>
