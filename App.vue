<template>
  <div id="app">
    <h2>Boba Bill</h2>

    <button
      v-for="(tab, index) in tabs"
      :key="index"
      class="tab-button"
      @click="(activeTab = tab), findTabDirection(index)"
    >
      <span class="tab-front" :style="tab === activeTab && styleActive">{{
        tab
      }}</span>
    </button>
    <transition name="component-slide" mode="out-in">
      <component
        v-bind:is="currentTabComponent"
        v-bind="currentProperties"
      ></component>
    </transition>
  </div>
</template>

<style>
@import "./assets/Stylesheet.css";
@import "./assets/Animations.css";
</style>

<script>
import FriendList from "./components/FriendList.vue";
import TransactionList from "./components/TransactionList.vue";
import CalculateList from "./components/CalculateList.vue";

export default {
  components: {
    FriendList,
    TransactionList,
    CalculateList
  },

  computed: {
    /* func that work together with :is
        to pass props into dynamic components */
    currentTabComponent() {
      return this.activeTab + "List";
    },
    currentProperties() {
      if (this.activeTab === "FriendList") {
        // set props
        return { friends: this.friends };
      } else {
        return { friends: this.friends, transactions: this.transactions };
      }
    },
    styleActive() {
      return {
        "border-bottom": "5px solid #f09381",
        color: "black"
      };
    }
  },

  data() {
    return {
      tabs: ["Friend", "Transaction", "Calculate"],
      previousTab: 0,
      activeTab: "Friend",
      transitionRight: false,
      friends: ["Derrick", "Bunbun"],
      transactions: [
        {
          id: 0,
          name: "Fugetsu",
          expense: 25,
          ppl: ["Derrick", "Bunbun"],
          payers: ["Derrick"]
        },
        {
          id: 1,
          name: "Shihlin Street Snacks",
          expense: 14,
          ppl: ["Derrick", "Bunbun"],
          payers: ["Bunbun"]
        }
      ]
    };
  },
  methods: {
    findTabDirection(newIndex) {
      console.log("new tab has been clicked!");
      console.log(newIndex);
      console.log(this.previousTab);

      if (this.previousTab < newIndex) {
        console.log("shift left");
        this.transitionRight = false;
      } else {
        console.log("shift right");
        this.transitionRight = true;
      }
      this.previousTab = newIndex;
    }
  }
};
</script>
