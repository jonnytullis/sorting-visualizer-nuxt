<template>
  <v-container fluid class="pa-0">
    <v-row class="my-6 mx-6" justify="space-between" align="center">
      <v-col cols="12" lg="5" md="5">
        <v-slider
          v-model="speed"
          color="secondary"
          min="0"
          :max="5"
          class="mb-4 mr-2"
        >
          <template #prepend>
            <v-layout align-center class="mr-2">
              Speed
            </v-layout>
            <v-icon @click="speed--">
              mdi-minus
            </v-icon>
          </template>
          <template #append>
            <v-icon @click="speed++">
              mdi-plus
            </v-icon>
          </template>
        </v-slider>
        <v-slider
          v-model="numNodes"
          color="secondary"
          min="5"
          :max="$vuetify.breakpoint.xsOnly ? 75 : 150"
          hide-detail
          hide-details
          class="mr-4"
          :disabled="isExecuting"
          @input="updateTableView"
        >
          <template #prepend>
            <v-layout align-center>
              #&nbsp;of&nbsp;items&nbsp;
            </v-layout>
          </template>
          <template #append>
            <v-layout align-center>
              {{ numNodes }}
            </v-layout>
          </template>
        </v-slider>
      </v-col>
      <v-col cols="12" lg="2" md="2">
        <v-select
          v-model="selectedSortType"
          :items="sortTypes"
          item-color="secondary"
          background-color="accent"
          label="Type"
          filled
          outlined
          dense
          hide-details
        />
      </v-col>
      <v-col cols="12" lg="2" md="2">
        <v-btn color="accent" width="100%" @click="generateNewArray">
          <v-icon class="mr-2">
            mdi-restore
          </v-icon>
          Regenerate
        </v-btn>
      </v-col>
      <v-col cols="12" lg="2" md="2">
        <v-btn v-if="!isExecuting" color="secondary" width="100%" @click="sort">
          <v-icon class="mr-2">mdi-play</v-icon>
          Sort
        </v-btn>
        <v-btn v-else color="red" width="100%" @click="stopSort">
          <v-icon class="mr-2">mdi-stop</v-icon>
          Stop
        </v-btn>
      </v-col>
    </v-row>
    <array-view
      ref="arrayView"
      :num-nodes="numNodes"
      :max-num="200"
      :min-num="20"
      :step-time="stepTime"
      @executing="(val) => { this.isExecuting = val }"
    />
  </v-container>
</template>

<script>

import ArrayView from "../components/ArrayView";

export default {
  name: "SortingVisualizer",
  components: {
    ArrayView
  },
  data() {
    return {
      numNodes: 20,
      sortTypes: ['Quick Sort', 'Merge Sort', 'Heap Sort', 'Bubble Sort'],
      selectedSortType: 'Quick Sort',
      speed: 0,
      maxStepTime: 2000,
      isExecuting: false
    }
  },
  mounted() {
    this.speed = 2
  },
  methods: {
    generateNewArray() {
      this.$refs.arrayView.init()
    },
    sort() {
      this.$refs.arrayView.sort(this.selectedSortType)
    },
    stopSort() {
      this.$refs.arrayView.stop()
    },
    updateTableView() {
      this.$refs.arrayView.init()
    }
  },
  computed: {
    stepTime() {
      switch (this.speed) {
        case 0:
          return 2000
        case 1:
          return 1000
        case 2:
          return 500
        case 3:
          return 100
        case 4:
          return 30
        case 5:
          return 0
        default:
          return 2
      }
    }
  },
  watch: {
    speed: function () {
      this.$refs.arrayView.setStepTime(this.stepTime)
    }
  }
}
</script>
