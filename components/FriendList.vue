<template>
  <!-- TODO: toggle friendlist and transaction list-->
  <div>
    <InputText
      v-model="newFriendName"
      placeholder="add a friend here!"
      @keydown.enter="addFriend"
    />
    <p v-if="duplicateName.length">{{ duplicateName }} already added!</p>
    <p v-if="empty">Name cannot be empty, how about {{ newFriendName }}?</p>

    <!--friends is arr that contains all friend data-->
    <ol v-if="friends.length">
      <h2>Friend List</h2>
      <!-- friend is variable declared locally
         name is a property of class obj from Friend.vue-->
      <Friend
        v-for="friend in friends"
        :key="friend"
        :name="friend"
        @update:emit-name="editName"
      />
    </ol>
    <p v-else>Add some friends to get started!</p>
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
      duplicateName: "",
      empty: false,
      randBobaNames: [
        "Yuzu",
        "Krema",
        "Pearl",
        "Winter",
        "Creme",
        "Brulee",
        "Milk",
        "Earl",
        "Gray",
        "Kuro",
        "Sugar",
        "Buddha",
        "Latte",
        "Ichigo",
        "Sakura",
        "Shiba",
        "Corgi",
        "Bogi",
        "Matcha",
        "Pudding",
        "Verde",
        "Ume"
      ]
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

      // check if trimmedText is empty
      if (trimmedText.length === 0) {
        this.empty = true;
        const index = Math.floor(Math.random() * this.randBobaNames.length);
        this.newFriendName = this.randBobaNames[index];
        console.log(this.newFriendName);
        this.randBobaNames.splice(index, 1); // remove randBobaNames[index]
        console.log(`remove, ${index} contains ${this.randBobaNames[index]}`);
        return;
      }

      // TODO: write more readable error checks
      if (!this.isDuplicate(trimmedText)) {
        this.friends.push(trimmedText);

        // clear
        this.newFriendName = "";
        this.duplicateName = ""; // clear previous input, if any
        this.empty = false;
      } else {
        // name has been added already, notify user
        this.duplicateName = trimmedText;
      }
    },
    editName(newName, oldName) {
      newName = newName.trim();
      if (!this.isDuplicate(newName)) {
        // index of oldName
        const i = this.friends.findIndex(element => element === oldName);
        this.friends.splice(i, 1, newName); //replace
      }
      // error message
      else {
        this.duplicateName = newName;
      }
    }
  }
};
</script>
