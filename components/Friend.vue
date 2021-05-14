<template>
  <div class="list-item" :class="setBackground">
    <li @mouseover="hover = true" @mouseleave="hover = false">
      <!--a computed getter for display name-->
      {{ name }}
      <a class="link" v-show="hover" @click="edit = !edit">edit</a>
    </li>

    <div v-if="edit">
      <!-- emits changed name to parent at "enter"-->
      <input
        class="edit-name"
        type="text"
        placeholder="edited name"
        v-model="localName"
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
      localName: "",
      //error checking
      empty: false
    };
  },

  computed: {
    /** need to use computed function + not simply assign
     * :class="active : edit" because the background is expected to change
     * when this.edit changes. Setting it like how i described above is static
     * computed is dynaamic
     */
    setBackground() {
      return {
        "edits-active": this.edit
      };
    }
  },

  methods: {
    // emits localName and oldName to the method editName in parent
    emitName() {
      // ternary operator -> conditional ? if condition : else condition
      return this.localName.length > 0
        ? this.$emit("update:emit-name", this.localName, this.name)
        : (this.empty = true);
    },
    closeEditBox() {
      this.edit = false;
      this.empty = false;
    }
  }
};
</script>
