<template>
  <v-card
    :key="value.width"
    :height="value.height"
    :width="value.width"
    :color="value.color"
    v-bind="$attrs"
  >
    <v-layout v-show="showLabels" fill-height align-end justify-center class="font-weight-bold">
      {{ value.value }}
    </v-layout>
  </v-card>
</template>

<script>
import SortNode from './SortNode'
export default {
  name: "Node",
  props: {
    value: {
      type: SortNode
    }
  },
  data () {
    return {
      showLabels: false
    }
  },
  watch: {
    'value': {
      immediate: true,
      deep: true,
      handler: function () {
        this.showLabels = this.value.width > 30
        this.$emit('change')
      }
    }
  }
}
</script>
