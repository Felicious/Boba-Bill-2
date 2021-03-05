<template>
  <div class="box">
    <span
      class="name"
      @mouseover="hover.name = true"
      @mouseleave="hover.name = false"
    >
      {{ bill.name }}
      <a class="link" v-show="hover" @click="editName">edit</a>
    </span>
    <span class="expense">{{ bill.expense }}</span>
    <a class="plus" @click="toggle">{{ expandIcon }}</a>
    <div v-if="expandToggle">
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
      <a @click="editThisTransaction">edit</a>
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
      expandToggle: false,
      hover: {
        name: false,
        expense: false
      },
      expandIcon: "[+]",
      isEdit: false
    };
  },
  methods: {
    toggle() {
      this.expandToggle = !this.expandToggle;
      // change the icons
      if (this.expandIcon === "[+]") {
        this.expandIcon = "[-]";
      } else {
        this.expandIcon = "[+]";
      }
    },
    //
    isEdit() {}
  }
};
</script>
