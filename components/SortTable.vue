<template>
  <div :style="`height:${tableHeight}px; min-width:90%;border-radius:10px;box-shadow:2px 2px 3px #191919`" class="pa-8 accent">
    <v-layout fill-height justify-center align-end>
      <node
        v-for="node of nodes"
        :value="node"
        tile
        flat
        :style="`margin-right: ${nodeMargin}px`"
        @change="updateView"
      />
    </v-layout>
  </div>
</template>

<script>
import Node from './Node'
import SortNode from './SortNode'
import QuickSort from '../algorithms/QuickSort'

const quickSort = new QuickSort()

export default {
  name: "SortTable",
  components: {
    Node
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
    },
    stepTime: {
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
  mounted() {
    this.init()
  },
  methods: {
    init () {
      this.setNodeWidth()
      this.colorAll('primary')
      this.nodes = []
      for (let i = 0; i < this.numNodes; i++) {
        const num = Math.floor(Math.random() * (this.maxNum - this.minNum) + this.minNum)
        this.nodes.push(new SortNode(
          num,
          this.nodeWidth,
          `${Math.floor((num / this.maxNum) * 100)}%`,
          'primary'
        ))
      }
    },
    generateNewArray () {
      this.nodes = []
      this.init()
    },
    setNodeWidth () {
      const tableMargin = 50
      const tableWidth = window.innerWidth - tableMargin
      const totalMarginSpace = (this.nodeMargin - 1) * this.numNodes
      this.nodeWidth = Math.floor((tableWidth - totalMarginSpace) / this.numNodes)
    },
    sort (type) {
      this.colorAll('primary')
      if (type.toLowerCase().includes('quick')) {
        quickSort.sort(this.nodes)
      }
    },
    updateView () {
      this.$forceUpdate()
    },
    colorAll (color) {
      for (const node of this.nodes) {
        node.color = color
      }
    }
  }
}
</script>
