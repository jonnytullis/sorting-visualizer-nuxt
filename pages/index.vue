<template>
  <v-container fluid class="pa-0">
    <v-row no-gutters class="mb-6" align="center">
      <v-spacer />
      <span>Number of items: &nbsp;&nbsp;</span>
      <v-slider
        v-model="numNodes"
        color="secondary"
        min="5"
        :max="$vuetify.breakpoint.xsOnly ? 75 : 200"
        hide-details
      />
      &nbsp; {{ numNodes }}
      <v-spacer />
      <v-btn color="secondary">
        Sort
      </v-btn>
      <v-spacer />
    </v-row>
    <sort-table :num-nodes="numNodes" :max-num="200" :min-num="10" />
  </v-container>
</template>

<script>
import SortTable from '../components/SortTable'

export default {
  name: "Index",
  components: {
    SortTable
  },
  data () {
    return {
      numNodes: 20
    }
  }
}
</script>
