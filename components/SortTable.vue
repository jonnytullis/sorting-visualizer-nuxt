<template>
  <v-card :height="tableHeight" min-width="90%" class="pa-4">
    <v-layout fill-height justify-center align-end>
      <bar
        v-for="bar of nodes"
        :value="bar"
        tile
        flat
        :style="`margin-right: ${nodeMargin}px`"
      />
    </v-layout>
  </v-card>
</template>

<script>
import Bar from './Bar'
import SortNode from './SortNode'

export default {
  name: "SortTable",
  components: {
    Bar
  },
  props: {
    numNodes: {
      type: Number
    },
    maxNum: {
      type: Number
    },
    minNum: {
      type: Number
    }
  },
  data () {
    return {
      nodes: [],
      nodeWidth: 100,
      nodeMargin: 3,
      tableHeight: 550,
    }
  },
  methods: {
    init () {
      this.setNodeWidth()
      while (this.nodes.length !== this.numNodes) {
        if (this.nodes.length < this.numNodes) {
          const num = Math.floor(Math.random() * (this.maxNum - this.minNum) + this.minNum)
          this.nodes.push(new SortNode(
            this.nodes.length,
            num,
            this.nodeWidth,
            `${Math.floor((num / this.maxNum) * 100)}%`,
            'primary'
          ))
        } else {
          this.nodes.pop()
        }
        for (const node of this.nodes) {
          node.width = this.nodeWidth
        }
      }
    },
    setNodeWidth () {
      const tableMargin = 50
      const tableWidth = window.innerWidth - tableMargin
      const totalMarginSpace = (this.nodeMargin - 1) * this.numNodes
      this.nodeWidth = Math.floor((tableWidth - totalMarginSpace) / this.numNodes)
    }
  },
  watch: {
    numNodes: {
      handler: function () {
        this.init()
      },
      immediate: true
    }
  }
}
</script>
