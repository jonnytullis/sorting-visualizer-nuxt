<template>
  <div
    :style="`height:${value.height}; width:${value.width}px; border: 1px solid ${$vuetify.theme.themes.dark.accent} !important;`"
    :class="value.color"
  >
    <div class="font-weight-bold label">
      <span :style="`font-size: ${fontSize}px`">
        {{ value.value }}
      </span>
    </div>
  </div>
</template>

<script>
import NodeClass from '../assets/NodeClass'
export default {
  name: "NodeView",
  props: {
    value: {
      type: NodeClass
    }
  },
  computed: {
    fontSize () {
      switch (true) {
        case (this.value.width > 100):
          return 30
        case (this.value.width > 60):
          return 20
        case (this.value.width > 45):
          return 16
        case (this.value.width > 35):
          return 12
      }
      return 0
    }
  }
}
</script>

<style scoped>
  .label {
    margin: auto;
    height: 100%;
    width: 40px;
    display: flex;
  }

  .label span {
    align-self: flex-end;
    margin-left: auto;
    margin-right: auto;
  }
</style>
