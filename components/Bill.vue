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

    <div style="display: flex; justify-content: right;">
      <span v-if="friend.owed < 0">oh my u owe money</span>
      <span v-else>someone owes u money </span>
      <a class="button details" @click="loadInfo">details</a>
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
