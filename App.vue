<template>
  <div id="app">
    <h2>Boba Bill</h2>
    <header>
      <nav>
        <ul>
          <li v-for="(tab, tabName) in tabs" :key="tabName">
            <button
              class="tab"
              :class="{ active: tabName === activeTab }"
              @click="setTabActive(tabName)"
            >
              <span class="tab-copy">{{ tabName }}</span>
              <!-- TODO: handle this later
            <span class="tab-background">
              <span class="tab-rounding left"></span>
              <span class="tab-rounding right"></span>
            </span> -->
            </button>
            <component v-bind:is="currentTabComponent" class="tab"></component>
          </li>
        </ul>
      </nav>
    </header>

    <FriendList v-bind:friends="friends" />

    <TransactionList v-bind:friends="friends" :transactions="transactions" />

    <CalculateList :friends="friends" :transactions="transactions" />
  </div>
</template>

<style>
@import "./assets/Stylesheet.css";
</style>

<script>
import FriendList from "./components/FriendList.vue";
import TransactionList from "./components/TransactionList.vue";
import CalculateList from "./components/CalculateList.vue";

export default {
  el: "#app",
  components: {
    FriendList,
    TransactionList,
    CalculateList
  },

  computed: {
    currentTabComponent() {
      return "tab-" + this.currentTab.toLowerCase();
    }
  },

  data() {
    return {
      tabs: {},
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
  }
};
</script>
