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
      <v-col>
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
      <v-col>
        <v-layout justify-center>
          <v-btn color="amber darken-3" @click="quickSort">
            Sort
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
      numNodes: 20
    }
  },
  methods: {
    generateNewArray () {
      if (this.$refs.sortTable) {
        this.$refs.sortTable.generateNewArray()
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
