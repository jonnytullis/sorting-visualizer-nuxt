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
import Vue from 'vue'

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
  },
  data() {
    return {
      userScrolled: false
    }
  },
  mounted() {
    const scroller = document.getElementById('scroller')

    window.addEventListener('statusUpdate', () => {
      // Keep the scroller pinned to the bottom unless user scrolls
      Vue.nextTick(() => {
        if (!this.userScrolled) {
          document.getElementById('scroller').scrollTop = scroller.scrollHeight
        }
      })
    })

    scroller.addEventListener('scroll', () => {
      Vue.nextTick(() => {
        // The user has scrolled if the scroll position minus offset is less than the height
        this.userScrolled = (scroller.scrollHeight - scroller.scrollTop) > this.height
      })
    })
  }
}
</script>
