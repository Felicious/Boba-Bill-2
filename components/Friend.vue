<template>
  <div class="list-item">
    <li @mouseover="hover = true" @mouseleave="hover = false">
      {{ name }}
      <a class="link" v-if="hover" @click="edit = true">edit</a>
    </li>
    <div v-if="edit">
      <input
        class="edit-name"
        type="text"
        placeholder="edit name here"
        v-model="newName"
        @keydown.enter="emitName"
      />
      <ul class="error" v-if="empty">
        Can't add an empty name!
      </ul>
    </div>
  </div>
</template>

<style>
li {
  font: inherit;
  font-size: medium;
}
</style>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      // editing name
      hover: false,
      edit: false,
      newName: "",
      //error checking
      empty: {
        type: Boolean
      }
    };
  },
  methods: {
    emitName() {
      console.log("start emitting changed name");
      // third param is saved as second param
      //   of v-on method call (editName) in parent
      if (this.newName.length > 0) {
        this.$emit("update:emit-name", this.newName, this.name);
      } else {
        this.empty = true;
      }
    }
  }
};
</script>
