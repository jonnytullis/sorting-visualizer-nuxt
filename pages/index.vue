<template>
  <v-container fluid>
    <v-row class="my-6" justify="space-between" align="center">
      <v-col cols="12" lg="5" md="5">
        <v-slider
          v-model="numNodes"
          color="secondary"
          :min="minNumNodes"
          :max="maxNumNodes"
          thumb-label="always"
          :disabled="isExecuting"
          @input="updateTableView"
        >
          <template #prepend>
            <div style="width: 70px; text-align: right; margin-top: 2px;">
              #&nbsp;of&nbsp;Items
            </div>
          </template>
          <template #append>
            <v-icon @click="decrementNodes">mdi-minus</v-icon>
            <v-icon class="ms-3" @click="incrementNodes">mdi-plus</v-icon>
          </template>
          <template #thumb-label>
            <b style="font-size: 14px;">{{ numNodes }}</b>
          </template>
        </v-slider>
        <v-slider
          v-model="speed"
          color="secondary"
          hide-details
          min="0"
          max="4"
          class="mt-2"
          thumb-label="always"
        >
          <template #prepend>
            <div style="width: 70px; text-align: right; margin-top: 2px;">
              Speed
            </div>
          </template>
          <template #append>
            <v-icon @click="speed--">mdi-minus</v-icon>
            <v-icon class="ms-3" @click="speed++">mdi-plus</v-icon>
          </template>
          <template #thumb-label>
            <v-icon>
              {{ speedIcon }}
            </v-icon>
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
    <v-card elevation="6">
      <v-toolbar v-show="$vuetify.breakpoint.mdAndUp" rounded>
        <v-toolbar-title>
          Color Key
        </v-toolbar-title>
        <color-key :colors="sortColors" />
      </v-toolbar>
      <div style="height: 450px; padding: 20px;">
        <array-view
          ref="arrayView"
          :num-nodes="numNodes"
          :max-num="maxNodeValue"
          :min-num="minNodeValue"
          :step-time="stepTime"
          :sort-type="selectedSortType"
          @executing="(val) => { this.isExecuting = val }"
        />
      </div>
    </v-card>
  </v-container>
</template>

<script>

import ArrayView from "../components/ArrayView";
import ColorKey from "../components/ColorKey";
import QuickSort from "../assets/algorithms/QuickSort";
import MergeSort from "../assets/algorithms/MergeSort";
import HeapSort from "../assets/algorithms/HeapSort";
import BubbleSort from "../assets/algorithms/BubbleSort";

export default {
  name: "SortingVisualizer",
  components: {
    ColorKey,
    ArrayView
  },
  data() {
    return {
      numNodes: 20,
      sortTypes: ['Quick Sort', 'Merge Sort', 'Heap Sort', 'Bubble Sort'],
      selectedSortType: 'Merge Sort',
      speed: 0,
      maxStepTime: 2000,
      isExecuting: false,
      minNumNodes: 5,
      maxNumNodes: this.$vuetify.breakpoint.xsOnly ? 75 : 200,
      maxNodeValue: 200,
      minNodeValue: 20
    }
  },
  mounted() {
    this.speed = 1
  },
  methods: {
    generateNewArray() {
      this.$refs.arrayView.init()
    },
    sort() {
      this.$refs.arrayView.sort()
    },
    stopSort() {
      this.$refs.arrayView.stop()
    },
    updateTableView() {
      this.$refs.arrayView.init()
    },
    incrementNodes() {
      if (this.numNodes !== this.maxNumNodes) {
        if (this.numNodes <= (this.maxNumNodes - 10)) {
          this.numNodes += 10
        } else {
          this.numNodes = this.maxNumNodes
        }
        this.updateTableView()
      }
    },
    decrementNodes() {
      if (this.numNodes !== this.minNumNodes) {
        if (this.numNodes >= (this.minNumNodes + 10)) {
          this.numNodes -= 10
        } else {
          this.numNodes = this.minNumNodes
        }
        this.updateTableView()
      }
    }
  },
  computed: {
    stepTime() {
      switch (this.speed) {
        case 0:
          return 1000
        case 1:
          return 500
        case 2:
          return 200
        case 3:
          return 50
        case 4:
          return 0
      }
    },
    sortColors () {
      if (this.selectedSortType.toLowerCase().includes('quick')) {
        return QuickSort.colors
      } else if (this.selectedSortType.toLowerCase().includes('merge')) {
        return MergeSort.colors
      } else if (this.selectedSortType.toLowerCase().includes('heap')) {
        return HeapSort.colors
      } else if (this.selectedSortType.toLowerCase().includes('bubble')) {
        return BubbleSort.colors
      }
      return {}
    },
    speedIcon () {
      switch (this.speed) {
        case 0:
          return 'mdi-tortoise'
        case 1:
          return 'mdi-walk'
        case 2:
          return 'mdi-run'
        case 3:
          return 'mdi-run-fast'
        case 4:
          return 'mdi-exclamation-thick'
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
