<template>
  <v-container fluid class="pa-0">
    <v-row class="mb-6 mx-12" justify="space-between">
      <v-col cols="6">
        <v-layout align-center>
          <span>Number of items: &nbsp;&nbsp;</span>
          <v-slider
            v-model="numNodes"
            color="secondary"
            track-color="grey darken-3"
            min="1"
            :max="$vuetify.breakpoint.xsOnly ? 75 : 100"
            hide-details
          />
          &nbsp; {{ numNodes }}
        </v-layout>
      </v-col>
      <v-col cols="2">
        <v-btn color="secondary" @click="generateNewArray">
          <v-icon class="mr-2">
            mdi-restore
          </v-icon>
          Regenerate
        </v-btn>
      </v-col>
      <v-col cols="2">
        <v-select
          v-model="selectedSortType"
          :items="sortTypes"
          item-color="secondary"
          filled
          outlined
          dense
        />
      </v-col>
      <v-col cols="1">
        <v-btn color="secondary" @click="sort">
          Sort!
        </v-btn>
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
      numNodes: 8,
      sortTypes: ['Quick Sort', 'Merge Sort', 'Heap Sort', 'Bubble Sort'],
      selectedSortType: 'Quick Sort'
    }
  },
  methods: {
    generateNewArray () {
      this.$refs.sortTable.generateNewArray()
    },
    sort () {
      this.$refs.sortTable.sort(this.selectedSortType)
    }
  }
}
</script>
