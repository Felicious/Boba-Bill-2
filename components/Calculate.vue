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

    <div class="drop-down-button">
      <a class="button" @click="loadInfo">{{ expandIcon }}</a>
    </div>
    <div v-if="expand">
      <!--TODO: implment alternating background colors (white and milk tea colored)
                (odd= white, even=boba) -->
      <div
        v-for="item in memoize"
        :key="item.shopName"
        class="transaction-details"
      >
        <span>{{ item.shopName }}</span> <span>{{ item.owed }}</span>
      </div>
      Total: ${{ friend.owed }}

      <!--TODO: separate calculation to figure out who owes who how much-->

      <p v-if="friend.owed > 0">oh my, u owe money</p>
      <p v-else-if="friend.owed == 0"></p>
      <p v-else>someone owes u money</p>
    </div>
    <!--end of transaction details-->
  </div>
</template>

<script>
export default {
  name: "Calculate",
  props: {
    friend: {
      // { name, owed }
      type: Object,
      required: true
    },
    transactions: Array // of objs
    // {id, name, expense, ppl, payers}
  },
  data() {
    return {
      // flag for showing transaction details or not
      expand: false,
      dropDownArrow: "[ v ]",
      hasLoaded: false,
      memoize: [] // will be array of {shopName, owed}
    };
  },
  methods: {
    /**
     * searches for the transaction entries related to **friend**
      
      returns: add entries **memoize** array
      */
    loadFirst() {
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
    },
    loadInfo() {
      this.toggle();
      // TODO: filter "transactions" array passed in as a prop
      //       and display transactions that friend is in
      // the expensive function:

      // check if info has been loaded before
      if (!this.hasLoaded) {
        this.loadFirst();
        this.hasLoaded = true;
      }
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
  }
};
</script>
