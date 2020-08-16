<template>
  <v-container fluid>
    <v-row justify="space-between" align="center">
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
          v-model="sortType"
          :items="sortTypeOptions"
          item-color="secondary"
          background-color="accent"
          :disabled="isExecuting"
          label="Type"
          filled
          outlined
          dense
          hide-details
        />
      </v-col>
      <v-col cols="12" lg="2" md="2">
        <v-btn color="accent" width="100%" :disabled="isExecuting" @click="generateNewArray">
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
    <v-row>
      <v-col>
        <v-card elevation="6">
          <v-toolbar v-if="$vuetify.breakpoint.mdAndUp" dense>
            <div style="width: 100%">
              <color-key :colors="sortColors" />
            </div>
          </v-toolbar>
          <v-toolbar v-else>
            <v-spacer />
            <v-toolbar-items>
              <v-dialog max-width="200">
                <template #activator="{ on }">
                  <v-btn icon v-on="on">
                    <v-icon>mdi-menu</v-icon>
                  </v-btn>
                </template>
                <v-card>
                  <v-toolbar class="mb-2">
                    <v-toolbar-title>Color Key</v-toolbar-title>
                  </v-toolbar>
                  <color-key :colors="sortColors" :vertical="true" class="px-5 pb-2" />
                </v-card>
              </v-dialog>
            </v-toolbar-items>
          </v-toolbar>
          <div :style="`height:${displayHeight}px;`" class="py-4">
            <array-view
              ref="arrayView"
              :num-nodes="numNodes"
              :max-num="maxNodeValue"
              :min-num="minNodeValue"
              :sort-type="sortType"
              :sort-object="sortObject"
            />
          </div>
        </v-card>
      </v-col>
      <v-col
        cols="12"
        lg="4"
        md="12"
        sm="12"
      >
        <v-card elevation="6">
          <v-toolbar dense>
            <v-toolbar-title>Status Output</v-toolbar-title>
          </v-toolbar>
          <StatusOutput
            class="py-2"
            :items="statusOutput"
            :height="displayHeight"
          />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

import ArrayView from "../components/ArrayView";
import ColorKey from "../components/ColorKey";
import QuickSort from "../assets/algorithms/QuickSort";
import MergeSort from "../assets/algorithms/MergeSort";
import HeapSort from "../assets/algorithms/HeapSort";
import BubbleSort from "../assets/algorithms/BubbleSort";
import StatusOutput from "@/components/StatusOutput";

let quickSort = new QuickSort()
let mergeSort = new MergeSort()
let heapSort = new HeapSort()
let bubbleSort = new BubbleSort()

export default {
  name: "SortingVisualizer",
  components: {
    StatusOutput,
    ColorKey,
    ArrayView
  },
  data() {
    return {
      numNodes: 20,
      sortTypeOptions: ['Quick Sort', 'Merge Sort', 'Heap Sort', 'Bubble Sort'],
      sortType: 'Heap Sort',
      speed: 1,
      isExecuting: false,
      maxStepTime: 2000,
      minNumNodes: 5,
      maxNumNodes: this.$vuetify.breakpoint.xsOnly ? 75 : 200,
      maxNodeValue: 200,
      minNodeValue: 20,
      statusOutput: [],
      displayHeight: 425
    }
  },
  created() {
    window.addEventListener('start', () => {
      this.statusOutput = []
      this.isExecuting = true
    })
    window.addEventListener('stop', () => {
      this.isExecuting = false
    })
    window.addEventListener('updateStatus', (event) =>  {
      if (this.statusOutput.length > 0) {
        const lastIndex = this.statusOutput.length - 1
        if (this.statusOutput[lastIndex] !== event.detail) {
          this.statusOutput.push(event.detail)
        }
      } else {
        this.statusOutput.push(event.detail)
      }
    })
  },
  methods: {
    generateNewArray() {
      this.$refs.arrayView.init()
      this.statusOutput = []
    },
    sort() {
      try {
        this.sortObject.execute(this.$refs.arrayView.nodes)
      } catch(e) {
      }
    },
    stopSort() {
      this.sortObject.stop()
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
    sortObject() {
      if (this.sortType.toLowerCase().includes('quick')) {
        return quickSort
      } else if (this.sortType.toLowerCase().includes('merge')) {
        return mergeSort
      } else if (this.sortType.toLowerCase().includes('heap')) {
        return heapSort
      } else if (this.sortType.toLowerCase().includes('bubble')) {
        return bubbleSort
      }
    },
    stepTime() {
      switch (this.speed) {
        case 0:
          return 2000
        case 1:
          return 800
        case 2:
          return 300
        case 3:
          return 100
        case 4:
          return 0
      }
    },
    sortColors () {
      if (this.sortType.toLowerCase().includes('quick')) {
        return QuickSort.colors
      } else if (this.sortType.toLowerCase().includes('merge')) {
        return MergeSort.colors
      } else if (this.sortType.toLowerCase().includes('heap')) {
        return HeapSort.colors
      } else if (this.sortType.toLowerCase().includes('bubble')) {
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
    speed: {
      handler: function () {
        quickSort.stepTime = this.stepTime
        mergeSort.stepTime = this.stepTime
        heapSort.stepTime = this.stepTime
        bubbleSort.stepTime = this.stepTime
      },
      immediate: true
    }
  }
}
</script>
