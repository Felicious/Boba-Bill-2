<template>
  <!-- THIS DISPLAYS THE LIST OF FRIENDS-->
  <div>
    <input type="checkbox" id="checkbox" v-model="splitPpl" />
    <label for="checkbox">{{ name.text }}</label>
  </div>
  <!--Q: div or p looks better? -->
</template>

<script>
export default {
  props: {
    name: {
      type: Object,
      // TODO: why is this required?
      required: true
    }
  },
  data() {
    return {
      splitPpl: []
    };
  }
};
</script>
