<template>
  <div
    id="scroller"
    :style="`height:${height}px`"
    style="overflow-y: auto;"
  >
    <div v-for="str in items" class="px-4" style="font-family: monospace">
      {{ str }}
    </div>
  </div>
</template>

<script>
export default {
  name: "StatusOutput",
  props: {
    items: {
      type: Array,
      default: []
    },
    height: {
      type: Number | String,
      default: 450
    }
  }
}
</script>
