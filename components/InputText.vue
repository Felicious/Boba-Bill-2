<template>
  <input type="text" class="input" :value="value" v-on="listeners" />
</template>

<script>
// each Friend obj
export default {
  props: {
    value: {
      type: String
    }
  },

  computed: {
    // don't really understand the copied code, but look at
    // DOCS: https://vuejs.org/v2/guide/components-custom-events.html#Binding-Native-Events-to-Components

    listeners() {
      return {
        // Pass all component listeners directly to input
        ...this.$listeners,
        // Override input listener to work with v-model
        input: event => this.$emit("input", event.target.value)
      };
    }
  }
};
</script>
