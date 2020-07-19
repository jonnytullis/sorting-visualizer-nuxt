<template>
  <div style="height: 100%; display: flex; justify-content: center;">
    <node-view
      v-for="node of nodes"
      :value="node"
      tile
      flat
      :style="`margin-right: ${nodeMargin}px; align-self: flex-end;`"
    />
  </div>
</template>

<script>
import NodeView from './NodeView'
import NodeClass from '../assets/NodeClass'
import QuickSort from '../assets/algorithms/QuickSort'

const quickSort = new QuickSort()

export default {
  name: "ArrayView",
  components: {
    NodeView
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
    },
    sortType: {
      type: String
    }
  },
  data () {
    return {
      nodes: [],
      nodeWidth: 100,
      nodeMargin: 3,
      isExecuting: false
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init () {
      this.nodes = []
      this.$nextTick(() => {
        this.isExecuting = false
        this.setNodeWidth()
        this.colorAll('primary')
        for (let i = 0; i < this.numNodes; i++) {
          const num = Math.floor(Math.random() * (this.maxNum - this.minNum) + this.minNum)
          this.nodes.push(new NodeClass(
            num,
            this.nodeWidth,
            `${Math.floor((num / this.maxNum) * 100)}%`,
            'primary'
          ))
        }
      })
    },
    setNodeWidth () {
      const tableMargin = 50
      const tableWidth = window.innerWidth - tableMargin
      const totalMarginSpace = (this.nodeMargin + 1) * this.numNodes
      this.nodeWidth = Math.floor((tableWidth - totalMarginSpace) / this.numNodes)
    },
    async sort () {
      this.isExecuting = true
      this.colorAll('primary')
      if (this.sortType.toLowerCase().includes('quick')) {
        await quickSort.sort(this.nodes)
      }
      this.colorAll('primary')
      this.isExecuting = false
    },
    updateView () {
      this.$forceUpdate()
    },
    colorAll (color) {
      for (const node of this.nodes) {
        node.color = color
      }
    },
    stop () {
      const nodesCpy = JSON.parse(JSON.stringify(this.nodes))
      this.nodes = []
      for (const node of nodesCpy) {
        this.nodes.push(new NodeClass(
          node.value,
          node.width,
          node.height,
          'primary'
        ))
      }
      this.isExecuting = false
    },
    setStepTime (ms) {
      quickSort.stepTime = ms
    }
  },
  watch: {
    isExecuting: function () {
      this.$emit('executing', this.isExecuting)
    },
    'nodes.length': function () {
      this.updateView()
    }
  }
}
</script>
