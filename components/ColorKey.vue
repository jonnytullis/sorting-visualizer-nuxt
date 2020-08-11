<template>
  <v-row>
    <v-col
      v-for="prop in Object.keys(colors)"
      :key="prop"
    >
      <v-layout justify-center align-center>
        <div style="width: 25px; height: 25px; border-radius: 5px;" :class="`${colors[prop]} mr-4`" />
        {{ formatText(prop) }}
      </v-layout>
    </v-col>
  </v-row>
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
