<template>
  <v-container fluid class="pa-0">
    {{ formatText('thisIsATest') }}
  </v-container>
</template>

<script>
import startCase from 'lodash.startcase'
export default {
  name: "ColorKey",
  props: {
    colors: {
      type: Object
    }
  },
  methods: {
    formatText (str) {
      return startCase(str)
    }
  }
}
</script>
