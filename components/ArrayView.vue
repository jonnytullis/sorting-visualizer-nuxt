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
import NodeView from "./NodeView";
import NodeClass from "../assets/NodeClass";
import QuickSort from "../assets/algorithms/QuickSort";
import MergeSort from "../assets/algorithms/MergeSort";
import HeapSort from "../assets/algorithms/HeapSort";
import BubbleSort from "../assets/algorithms/BubbleSort";

let quickSort = new QuickSort()
let mergeSort = new MergeSort()
let heapSort = new HeapSort()
let bubbleSort = new BubbleSort()

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
      const tableMargin = 70
      const tableWidth = window.innerWidth - tableMargin
      const totalMarginSpace = this.nodeMargin * this.numNodes
      this.nodeWidth = Math.floor((tableWidth - totalMarginSpace) / this.numNodes)
    },
    async sort () {
      this.isExecuting = true
      this.colorAll('primary')
      if (this.sortType.toLowerCase().includes('quick')) {
        await quickSort.sort(this.nodes)
      } else if (this.sortType.toLowerCase().includes('merge')) {
        await mergeSort.sort(this.nodes)
      } else if (this.sortType.toLowerCase().includes('heap')) {
        await heapSort.sort(this.nodes)
      } else if (this.sortType.toLowerCase().includes('bubble')) {
        await bubbleSort.sort(this.nodes)
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
      mergeSort.stepTime = ms
      heapSort.stepTime = ms
      bubbleSort.stepTime = ms
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
