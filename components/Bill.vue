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

      <a class="button" @click="loadInfo">{{ expandIcon }}</a>
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
      this.toggle();
      // TODO: filter "transactions" array passed in as a prop
      //       and display transactions that friend is in
      // the expensive function:
      this.transactions.forEach(transaction => {
        console.log(`Looking thru transactions for ${this.friend.name}`);
        // if friend is in transaction.ppl
        if (transaction.ppl.includes(this.friend.name)) {
          console.log(`${this.friend.name} is in ${transaction.name}`);
          // calculate how much this person owes
          // theyre payer
          if (transaction.payers.includes(this.friend.name)) {
            const cost = -1 * (transaction.expense / transaction.ppl.length);
            this.memoize.push({ shopName: transaction.name, owed: cost });
          } else {
            // not the payer
            const cost = transaction.expense / transaction.ppl.length;
            this.memoize.push({ shopName: transaction.name, owed: cost });
          }
        }
      });
      console.log(this.memoize);
    },
    toggle() {
      // TODO: implement toggle for details (maybe < to v) ?
      this.dropDownArrow = !this.dropDownArrow;
      // TODO: toggle and set "expand" to true
      this.expand = !this.expand;
    }
  },
  computed: {
    expandIcon() {
      return this.dropDownArrow ? "[ < ]" : "[ v ]";
    }
  },
  data() {
    return {
      // flag for showing transaction details or not
      expand: false,
      dropDownArrow: "[ v ]",
      memoize: [] // will be array of ids
    };
  }
};
</script>
