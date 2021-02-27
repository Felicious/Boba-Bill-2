<template>
  <div class="box">
    <!--TODO: transaction 1 displayed here -->
    <span class="name">{{ bill.name }}</span>
    <span class="expense">{{ bill.expense }}</span>
    <div v-if="expand">
      <ul>
        Split Between:
        <li v-for="name in bill.ppl" :key="name">
          {{ name }}
        </li>
      </ul>

      <ul>
        Payer(s):
        <li v-for="name in bill.payers" :key="name">
          {{ name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    bill: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      expand: true
    };
  }
};
</script>
