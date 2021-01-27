<template>
  <input type="text" class="input" :value="value" v-on="listeners" />
</template>

<!-- TODO: style this input field; just kinda ripped something off the web-->
<style>
input {
  border: 5px solid white;
  padding: 15px;
  background: pink;
  margin: 0 0 10px 0;
  font: inherit;
  font-size: smaller;
}
</style>

<script>
// each Friend obj
export default {
  props: {
    value: {
      type: String,
      default: "Derrick"
    }
  },
  computed: {
    listeners() {
      return {
        // TODO: understand this return statement bc idk what these lines do yet
        // Pass all component listeners directly to input
        ...this.$listeners,
        // Override input listener to work with v-model
        input: event => this.$emit("input", event.target.value)
      };
    }
  }
};
</script>
