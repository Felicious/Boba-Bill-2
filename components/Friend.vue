<template>
  <div class="list-item">
    <li @mouseover="hover = true" @mouseleave="hover = false">
      {{ name }}
      <small v-if="hover" @click="changeName">edit</small>
    </li>
    <div v-if="edit">
      <input type="text" />
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
      hover: false,
      edit: false
    };
  },
  methods: {
    changeName: {
      // somehow throw in an inputbox
    }
  }
};
</script>
