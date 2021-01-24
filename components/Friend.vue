<template>
  <!-- THIS IS TODO LIST ITEM-->
  <li>
    <input type="checkbox" id="checkbox" v-model="checked" />
    <label for="checkbox">{{ name.text }}</label>
  </li>
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
