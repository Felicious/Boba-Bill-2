<template>
  <!--a single bill -->
  <div class="bill">
    <div class="init">
      <span class="name">
        {{ friend.name }}
      </span>
      <span class="owed">
        {{ friend.owed }}
      </span>
    </div>
    <div class="expand">
      <a>details</a>
    </div>
    <div v-if="expand"></div>
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
