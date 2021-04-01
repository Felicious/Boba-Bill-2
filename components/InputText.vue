<template>
  <label>
    {{ question }}
    <br />
    <input
      type="text"
      id="name"
      class="input"
      :value="value"
      v-on="listeners"
      ref="input"
    />
    <span class="line"></span>
  </label>
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

  mounted() {
    this.changeColor();
  },
  methods: {
    changeColor: function() {
      this.$refs.input.style.color = "white";
    }
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
