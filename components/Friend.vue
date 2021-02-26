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
      hover: false,
      edit: false,
      newName: ""
    };
  },
  methods: {
    emitName() {
      console.log("start emitting changed name");
      // third param is saved as second param
      //   of v-on method call (editName) in parent
      this.$emit("update:emit-name", this.newName, this.name);
    }
  }
};
</script>
