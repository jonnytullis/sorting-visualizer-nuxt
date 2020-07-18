<template>
  <div
    :style="`height:${value.height}; width:${value.width}px;`"
    :class="value.color"
  />
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
