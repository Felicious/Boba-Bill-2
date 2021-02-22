<template>
  <div class="box">
    <!--TODO: transaction 1 displayed here -->
    <span class="name">{{ bill.name }}</span>
    <span class="expense">{{ bill.expense }}</span>
  </div>
</template>

<script>
export default {
  props: {
    bill: {
      type: Object,
      required: true
    }
  }
};
</script>
