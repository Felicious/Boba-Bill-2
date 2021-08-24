<template>
  <!--a single bill -->
  <div class="bill">
    <div class="init">
      <span class="name">
        {{ friend.name }}
      </span>
      <span class="owed"> $ {{ roundToNearestCent }} </span>
    </div>

    <div class="drop-down-button">
      <a class="button" @click="loadInfo">{{ expandIcon }}</a>
    </div>
    <div v-if="expand">
      <!--TODO: implment alternating background colors (white and milk tea colored)
                (odd= white, even=boba) -->
      <div class="transaction-details">
        <span>Shop name</span> <span> Cost ($)</span>
      </div>
      <div
        v-for="(item, index) in memoize"
        :key="item.shopName"
        class="transaction-details"
        v-bind:class="{ bobaBackground: isOdd(index) }"
      >
        <!-- display in cents-->
        <span>{{ item.shopName }}</span>
        <span>{{ displayCent(item.owed.toString()) }}</span>
      </div>
      <br />
      <div class="transaction-details">
        <span> Total: </span> <span>${{ roundToNearestCent }} </span>
      </div>

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
      this.expand = !this.expand;
    },
    // returns boolean to determine whether index is odd
    isOdd(index) {
      return index % 2 === 1;
    },
    /** Derrick helped me write this (: Then I referenced this while writing roundToNearestCent
     *
     * function displays and string @price in cents
     */
    displayCent(price) {
      let [first, second = ""] = price.split(".");
      second += "00";

      return first + "." + second.substring(0, 2);
    }
  },
  computed: {
    expandIcon() {
      return this.dropDownArrow ? "[ < ]" : "[ v ]";
    },
    /**
     * rounds cost, stored in @friend.owed to the nearest cent
     *
     * returns a string
     */
    roundToNearestCent() {
      const cost = this.friend.owed.toString();
      // set to empty string if decimal digits is undefined
      let [wholeNum, decimalDigits = ""] = cost.split(".");
      console.log(`${wholeNum} , ${decimalDigits}`);

      if (decimalDigits.length === 2) {
        console.log("dont do anything");
        return wholeNum + "." + decimalDigits;
      }

      decimalDigits += "00"; // add 2 0s regardless

      /**
       * account for overflow, for example $9.999
       * decided to just drop the penny and save me the trouble
       */
      let hundredsDigit = decimalDigits.substring(1, 2);
      console.log(`hundredths digit ${hundredsDigit}`);
      // overflow, like 9.999, im just going to  x:
      if (hundredsDigit === "9") {
        // return as is
        console.log("we can drop a penny and save me the trouble");
        console.log(`${wholeNum}.${decimalDigits.substring(0, 2)}`);
        return wholeNum + "." + decimalDigits.substring(0, 2);
      }

      /**
       * 12.345
       *
       * rounding algorithm:
       * takes hundredths digit (4)
       *
       * makes a new number 4.5 and rounds this value
       * to find the new hundredths digit
       *
       * hundredths digit cannot be 9
       */
      const roundThisNumber = parseFloat(
        hundredsDigit + "." + decimalDigits.substring(2)
      );
      console.log(`rounding ${roundThisNumber}`);

      hundredsDigit = Math.round(roundThisNumber);
      console.log(`return new hundredths digit ${hundredsDigit}`);

      console.log(
        `${wholeNum}.${decimalDigits.substring(0, 1)}${hundredsDigit}}`
      );
      return wholeNum + "." + decimalDigits.substring(0, 1) + hundredsDigit;
    }
  }
};
</script>
