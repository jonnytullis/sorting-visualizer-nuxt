<template>
  <div style="height: 100%; display: flex; padding-bottom: 22px;">
    <div
      :style="`height:${value.height}; width:${value.width}px; border: 1px solid` +
        `${$vuetify.theme.themes.dark.accent} !important; align-self: flex-end;`"
      :class="value.color"
    >
      <div class="label font-weight-bold">
        <span :style="`font-size: ${labelFontSize}px`">
          {{ value.value }}
        </span>
      </div>
      <div class="index pt-1">
        <span :style="`font-size: ${labelFontSize > 0 ? 14 : 0}px`">
          {{ value.index }}
        </span>
      </div>
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
    labelFontSize () {
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

  .index {
    margin: auto;
    width: 40px;
    display: flex;
  }

  .index span {
    align-self: flex-end;
    margin-left: auto;
    margin-right: auto;
  }
</style>
