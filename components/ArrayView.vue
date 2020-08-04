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
import Sort from "assets/algorithms/Sort";

export default {
  name: "ArrayView",
  components: {
    NodeView
  },
  props: {
    numNodes: {
      type: Number
    },
    sortObject: {
      type: Sort,
      required: true
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
      nodeMargin: 3
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init () {
      this.nodes = []
      this.$nextTick(() => {
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
      this.$emit('start')
      this.colorAll('primary')
      try {
        await this.sortObject.execute(this.nodes)
        setTimeout(() => {
          this.colorAll('primary')
          this.$emit('stop')
        }, this.stepTime < 700 ? 700 : this.stepTime)
      } catch(e) {
      }
    },
    colorAll (color) {
      for (const node of this.nodes) {
        node.color = color
      }
    }
  },
  watch: {
    'nodes.length': function () {
      this.$forceUpdate()
    }
  }
}
</script>
