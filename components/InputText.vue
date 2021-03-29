<template>
  <div class="inputContainer">
    <label :for="question"> {{ question }} </label>
    <br />
    <input type="text" class="input" :value="value" v-on="listeners" />
    <span class="line"></span>
  </div>
</template>

<style>
@import "../assets/Animations.css";
</style>

<script>
// each Friend obj
export default {
  props: {
    value: {
      type: String
    },
    question: String
  },

  computed: {
    // the following is a workaround to combine v-on listeners
    // with v-model, as some higher priority listeners in the parent
    // are triggered first, breaking v-model

    listeners() {
      return {
        // Pass all component listeners directly to input
        ...this.$listeners,

        // Override input listener of the same name from v-on
        input: event => this.$emit("input", event.target.value)
      };
    }
  }
};
</script>
