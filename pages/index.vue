<template>
  <v-container fluid class="pa-0">
    <v-row class="my-6 mx-6" justify="space-between" align="center">
      <v-col cols="12" lg="6" md="6">
        <v-slider
          v-model="speed"
          color="secondary"
          min="0"
          :max="maxStepTime"
          class="mb-4"
        >
          <template #prepend>
            <v-layout align-center class="mr-4">
              Speed
            </v-layout>
            <v-icon>
              mdi-speedometer-slow
            </v-icon>
          </template>
          <template #append>
            <v-icon>
              mdi-speedometer
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
      <v-col cols="12" lg="1" md="1">
        <v-btn color="secondary" width="100%" @click="sort">
          Sort!
        </v-btn>
      </v-col>
    </v-row>
    <sort-table ref="sortTable" :num-nodes="numNodes" :max-num="200" :min-num="20" :step-time="stepTime" v-bind="$attrs" />
  </v-container>
</template>

<script>
import SortTable from '../components/SortTable'

export default {
  name: "SortingVisualizer",
  components: {
    SortTable
  },
  data () {
    return {
      numNodes: 8,
      sortTypes: ['Quick Sort', 'Merge Sort', 'Heap Sort', 'Bubble Sort'],
      selectedSortType: 'Quick Sort',
      speed: 0,
      maxStepTime: 2000
    }
  },
  methods: {
    generateNewArray () {
      this.$refs.sortTable.generateNewArray()
    },
    sort () {
      this.$refs.sortTable.sort(this.selectedSortType)
    },
    updateTableView () {
      this.$refs.sortTable.init()
    }
  },
  computed: {
    stepTime () {
      return this.maxStepTime - this.speed
    }
  }
}
</script>
