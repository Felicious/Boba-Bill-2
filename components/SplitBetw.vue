<template>
  <!-- this is the child of FriendList
     displays each friend in the list-->
  <div>
    <input
      type="checkbox"
      id="{name.text}"
      v-on:click="$emit('select-friend')"
    />
    <label for="{name.text}">{{ name.text }}</label>
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
  }
};
</script>
