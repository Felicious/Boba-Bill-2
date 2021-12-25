<template>
  <div id="app">
    <!--TODO: work on navBar-->
    <div class="nav-wrapper">
      <h2>Boba Bill</h2>

      <button
        v-for="(tab, index) in tabs"
        :key="index"
        class="tab-button"
        @click="(activeTab = tab), findTabDirection(index)"
      >
        <span class="tab-front" :style="tab === activeTab && styleActiveTab">{{
          tab
        }}</span>
      </button>
    </div>
    <main class="wrapper">
      <transition :name="computeSlideDirection" mode="out-in">
        <component
          v-bind:is="currentTabComponent"
          v-bind="currentProperties"
        ></component>
      </transition>
    </main>
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
    styleActiveTab() {
      return {
        "border-bottom": "5px solid #f09381",
        color: "black"
      };
    },
    computeSlideDirection() {
      return this.transitionLeft ? "slide-left" : "slide-right";
    }
  },

  data() {
    return {
      tabs: ["Friend", "Transaction", "Calculate"],
      previousTab: 0,
      activeTab: "Friend",
      transitionLeft: true,
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
      console.log(`${this.previousTab} -> ${newIndex}`);

      if (this.previousTab < newIndex) {
        console.log("shift left");
        this.transitionLeft = true;
      } else {
        console.log("shift right");
        this.transitionLeft = false;
      }
      this.previousTab = newIndex;
    }
  }
};
</script>
