<template>
  <div id="app">
    <h2>Boba Bill</h2>

    <button
      v-for="tab in tabs"
      :key="tab"
      class="tab"
      :class="['tab-button', { active: tab === activeTab }]"
      @click="activeTab = tab"
    >
      <span class="tab-copy">{{ tab }}</span>
      <!-- TODO: handle this later
            <span class="tab-background">
              <span class="tab-rounding left"></span>
              <span class="tab-rounding right"></span>
            </span> -->
    </button>
    <component
      v-bind:is="currentTabComponent"
      v-bind="currentProperties"
      class="tab"
    ></component>

    <!--
    <FriendList v-bind:friends="friends" />

    <TransactionList v-bind:friends="friends" :transactions="transactions" />

    <CalculateList :friends="friends" :transactions="transactions" /> -->
  </div>
</template>

<style>
@import "./assets/Stylesheet.css";
</style>

<script>
import FriendList from "./components/FriendList.vue";
import TransactionList from "./components/TransactionList.vue";
import CalculateList from "./components/CalculateList.vue";

/* globally register components */

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
    }
  },

  data() {
    return {
      tabs: ["Friend", "Transaction", "Calculate"],
      activeTab: "Friend",
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
    setTabActive(tab) {
      console.log("setActiveTab was called");
      this.activeTab = tab;
    }
  }
};
</script>
