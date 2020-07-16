<template>
  <v-container fluid class="pa-0">
    <v-row class="mb-6">
      <v-col>
        <v-layout justify-center>
          <v-btn color="amber darken-3" @click="generateNewArray">
            <v-icon class="mr-2">
              mdi-restore
            </v-icon>
            Generate New
          </v-btn>
        </v-layout>
      </v-col>
      <v-col cols="5">
        <v-layout align-center justify-center>
          <span>Number of items: &nbsp;&nbsp;</span>
          <v-slider
            v-model="numNodes"
            color="amber darken-3"
            track-color="grey darken-3"
            min="1"
            :max="$vuetify.breakpoint.xsOnly ? 75 : 100"
            hide-details
          />
          &nbsp; {{ numNodes }}
        </v-layout>
      </v-col>
      <v-col cols="2">
        <v-layout justify-center>
          <v-select
            v-model="selectedSortType"
            :items="sortTypes"
            filled
            outlined
            dense
          />
        </v-layout>
      </v-col>
      <v-col cols="2">
        <v-layout justify-center>
          <v-btn color="amber darken-3" @click="sort">
            Sort!
          </v-btn>
        </v-layout>
      </v-col>
    </v-row>
    <sort-table ref="sortTable" :num-nodes="numNodes" :max-num="200" :min-num="10" v-bind="$attrs" />
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
      numNodes: 20,
      sortTypes: ['Quick Sort', 'Merge Sort', 'Heap Sort', 'Bubble Sort'],
      selectedSortType: 'Quick Sort'
    }
  },
  methods: {
    generateNewArray () {
      if (this.$refs.sortTable) {
        this.$refs.sortTable.generateNewArray()
      }
    },
    sort () {
      if (this.selectedSortType === 'Quick Sort') {
        this.quickSort()
      }
    },
    quickSort () {
      if (this.$refs.sortTable) {
        this.$refs.sortTable.quickSort()
      }
    }
  }
}
</script>
