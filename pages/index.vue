<template>
  <v-container fluid>
    <sorting-visualizer />
  </v-container>
</template>

<script>

import SortingVisualizer from "../components/SortingVisualizer";

export default {
  name: 'index',
  components: {
    SortingVisualizer
  }
}
</script>
