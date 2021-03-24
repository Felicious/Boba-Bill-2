<template>
  <div class="box">
    <div v-show="!isEdit">
      <!-- "Containers" are defined for flex to align the elements within them-->
      <div class="titleContainer">
        <span class="name">
          {{ bill.name }}
        </span>
        <a class="button plus" @click="toggle">{{ expandIcon }}</a>
      </div>
      <!--TODO: add friend icons that align with cost ?-->
      <div v-if="showCost" class="costContainer">
        <span> [friend icons go here] </span>
        <span class="expense">$ {{ bill.expense }}</span>
      </div>

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

        <div class="buttonsContainer">
          <a class="button" @click="isEdit = true">edit</a>
          <button>delete</button>
        </div>

        <br />
        <div v-show="!showCost" class="bottom">
          <span> total: </span>
          <span class="expense">$ {{ bill.expense }}</span>
        </div>

        <!--TODO: edit and delete transactions;
          these two do not appear on hover. They are auto
          visible when the user expands the transaction-->
      </div>
    </div>

    <div v-if="isEdit" class="form">
      <div class="titleContainer">
        <span>making edits...</span>
        <a class="button" @click="isEdit = false"> cancel </a>
      </div>
      <br />
      <InputForm
        :autoFillFormData="this.localBill"
        :friends="friends"
        :id="index"
        :instance="bill.id.toString()"
        @toggle-update-status="isEdit = false"
      />
    </div>
  </div>
</template>

<script>
import InputForm from "./InputForm.vue";

export default {
  props: {
    bill: {
      type: Object,
      required: true
    },
    index: Number,
    friends: Array
  },
  components: {
    InputForm
  },
  data() {
    return {
      expandToggle: false,
      localBill: {},
      hover: {
        name: false,
        expense: false
      },
      isEdit: false,
      showCost: true
    };
  },
  // these var are created when the component is created
  mounted() {
    this.localBill = this.bill;
  },
  // changes icon whenever expand icon changes
  computed: {
    expandIcon() {
      // shows "+" when window is minimized, & vice versa
      return this.expandToggle ? "[-]" : "[+]";
    }
  },
  methods: {
    toggle() {
      this.expandToggle = !this.expandToggle;
      this.showCost = !this.showCost;
    }
  }
};
</script>
