<template>
  <div class="list-item">
    <li @mouseover="hover = true" @mouseleave="hover = false">
      {{ name }}
      <a class="link" v-show="hover" @click="toggle">edit</a>
    </li>

    <div v-if="edit">
      <!-- emits changed name to parent at "enter"-->
      <input
        class="edit-name"
        type="text"
        placeholder="edited name"
        v-model="newName"
        @keydown.enter="emitName"
      />

      <!-- to close edit box -->
      <button @click="closeEditBox">x</button>

      <!-- error checking for edited name -->
      <p class="error" v-if="empty">
        Can't add an empty name!
      </p>
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
      empty: false
    };
  },
  methods: {
    // emits newName and oldName to the method editName in parent
    emitName() {
      if (this.newName.length > 0) {
        this.$emit("update:emit-name", this.newName, this.name);
      } else {
        this.empty = true;
      }
    },
    toggle() {
      this.edit = !this.edit;
    },
    closeEditBox() {
      this.edit = false;
      this.empty = false;
    }
  }
};
</script>
