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
      <!-- load Transactions
      <a class="button" @click="loadInfo">details</a> -->
    </div>
    <div v-if="expand"></div>
  </div>
</template>

<script>
export default {
  props: {
    friend: {
      // { name, owed }
      type: Object,
      required: true
    },
    transactions: Array // of objs
    // {id, name, expense, ppl, payers}
  },
  methods: {
    loadInfo() {
      // TODO: implement toggle for details (maybe < to v) ?
      // TODO: toggle and set "expand" to true
      // TODO: filter "transactions" array passed in as a prop
      //       and display transactions that friend is in
    }
  },
  data() {
    return {
      expand: false
    };
  }
};
</script>
