<template>
  <!--a single bill -->
  <div class="bill">
    <div class="init">
      <span class="name">
        {{ friend.name }}
      </span>
      <span class="owed"> $ {{ friend.owed }} </span>
    </div>

    <div class="drop-down-button">
      <a class="button" @click="loadInfo">{{ expandIcon }}</a>
    </div>
    <div v-if="expand">
      <!--TODO: implment alternating background colors (white and milk tea colored)
                (odd= white, even=boba) -->
      <div
        v-for="(item, index) in memoize"
        :key="item.shopName"
        class="transaction-details"
        v-bind:class="{ bobaBackground: isOdd(index) }"
      >
        <span>{{ item.shopName }}</span> <span>{{ item.owed }}</span>
      </div>
      Total: ${{ friend.owed }}

      <!--TODO: separate calculation to figure out who owes who how much-->

      <p v-if="friend.owed > 0">oh my, u owe money</p>
      <p v-else-if="friend.owed == 0"></p>
      <p v-else>someone owes u money</p>
    </div>

    <div>
      <a @click="computeDollarValue(1.112)">CLICK ME</a>
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
      this.expand = !this.expand;
    },
    // returns boolean to determine whether index is odd
    isOdd(index) {
      return index % 2 === 1;
    },
    /**coding practice:
     * write a function that rounds **price** to the nearest cent
     * possible price inputs:
     * 100, 100.01, 1, 1.2, 1.23, 1.234, ...
     * if the dollar value is over $100 and whole, ignore cents
     */
    computeDollarValue(price) {
      const original = price.toString();
      console.log(original);

      const numbers = original.split(".");
      console.log(numbers);

      if (numbers.length == 1) {
        // $100+ case
        if (numbers[0].length > 2) {
          // just return dollar val w/o decimals
          console.log(`more than $10: ${numbers[0]}`);
          return parseFloat(numbers[0]);
        }
        // $1 - 99 case
        else {
          // add .00
          let money = numbers[0] + ".00";
          console.log(money);
          return parseFloat(money);
        }
      }
      const decimalDigits = numbers[1];
      console.log(decimalDigits);

      // there are decimals
      if (decimalDigits.length > 2) {
        // case .123+
        // delete 1
        const sigFig = decimalDigits.substring(1);
        console.log(sigFig);
        const addDecimal = sigFig.substring(0, 1) + "." + sigFig.substring(1);
        let round = parseFloat(addDecimal);
        console.log(round);
        console.log(Math.round(round));
        const lastDigit = Math.round(round);
        const build =
          numbers[0] + "." + numbers[1].substring(0, 1) + lastDigit.toString();
        console.log(build);
        // truncate or round
      } else if (decimalDigits.length == 1) {
        // case .1
        let money = numbers[0] + "." + numbers[1] + "0";
        console.log(money);
        //return parseFloat(money);
      } else {
        // case .12
        console.log("dont do anything");
        console.log(original);
        return original;
      }
    }
  },
  computed: {
    expandIcon() {
      return this.dropDownArrow ? "[ < ]" : "[ v ]";
    }
    /**
     * takes **friend.owed** and convert it to a dollar value
     */
    /**
     * can be 1, 1.2, 1.23, 1.234:
     * write a function that converts a number into a decimal
     * with 2 digits
     * example: 1.00
     */
    /*
    computeDollarValue(){
      const original = this.friend.owed.toString();
      console.log(original);

      const decimalDigits = original.split(".")[1];
      console.log(decimalDigits);
    }*/
  }
};
</script>
