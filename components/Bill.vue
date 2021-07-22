<template>
  <div class="bill-item">
    {{ friend.name }}
    {{ friend.owed }}
  </div>
</template>

<script>
export default {
  props: {
    friend: Object
    // { name, owed }
  }
};
</script>
