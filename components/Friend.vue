<template>
  <div>
    <li @mouseover="hover = true" @mouseleave="hover = false">
      {{ name }}
    </li>
    <span v-if="hover">u are hovering over {{ name }}</span>
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
      hover: false
    };
  }
};
</script>
