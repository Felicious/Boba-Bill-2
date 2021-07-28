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
      <p v-if="friend.owed > 0">oh my u owe money</p>
      <p v-else>someone owes u money</p>
      <a class="button" @click="loadInfo">details</a>
    </div>
    <div v-if="expand"></div>
  </div>
</template>

<script>
export default {
  props: {
    friend: {
      type: Object,
      required: true
    }
    // { name, owed }
  }
};
</script>
