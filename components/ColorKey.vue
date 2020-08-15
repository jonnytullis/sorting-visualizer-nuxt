<template>
  <v-row no-gutters>
    <v-col
      v-for="prop in Object.keys(colors)"
      :key="prop"
    >
      <v-layout justify-center align-center>
        <div style="width: 20px; height: 20px; border-radius: 50%;" :class="`${colors[prop]} mr-2`" />
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
