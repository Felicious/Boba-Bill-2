<template>
  <!-- THIS IS TODO LIST-->
  <div>
    <InputText
      v-model="newFriendName"
      placeholder="add a friend here!"
      @keydown.enter="addFriend"
    />

    <!--friends is arr that contains all friend data-->
    <ul v-if="friends.length">
      <h2>Split between</h2>
      <!-- friend is variable declared locally
         name is a property of class obj from Friend.vue-->
      <Friend v-for="friend in friends" :key="friend.id" :name="friend" />
    </ul>
  </div>
</template>

<script>
import InputText from "./InputText.vue";
import Friend from "./Friend.vue";

let nextFriendId = 1;
export default {
  components: {
    InputText,
    Friend
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
      ]
    };
  },
  methods: {
    addFriend() {
      // TODO: what is this trimmed text for LOL just copying rn
      const trimmedText = this.newFriendName.trim();
      if (trimmedText) {
        this.friends.push({
          id: nextFriendId++,
          text: trimmedText
        });
        this.newFriendName = ""; // clear
      }
    }
  }
};
</script>
