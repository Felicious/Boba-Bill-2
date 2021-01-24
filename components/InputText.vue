<template>
  <input type="text" class="input" :value="value" v-on="listeners" />
</template>

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
