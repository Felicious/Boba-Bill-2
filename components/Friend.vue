<template>
  <!-- THIS DISPLAYS THE LIST OF FRIENDS-->
  <p>
    <input type="checkbox" id="checkbox" v-model="splitPpl" />
    <label for="checkbox">{{ name.text }}</label>
  </p>
</template>

<script>
export default {
  props: {
    name: {
      type: Object,
      // TODO: why is this required?
      required: true
    }
  }
};
</script>
