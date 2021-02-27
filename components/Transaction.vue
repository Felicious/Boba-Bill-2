<template>
  <div class="box">
    <!--TODO: transaction 1 displayed here -->
    <span class="name">{{ bill.name }}</span>
    <span class="expense">{{ bill.expense }}</span>
    <a class="plus" @click="expand = true">[+]</a>
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

      <!--TODO: edit and delete transactions;
          these two do not appear on hover. They are auto
          visible when the user expands the transaction-->
      <a @click="edit = true">edit</a>
      <button>delete</button>
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
