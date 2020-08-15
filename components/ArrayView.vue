<template>
  <div id="arrayView" style="height: 100%; display: flex; justify-content: center;">
    <node-view
      v-for="node of nodes"
      :value="node"
      tile
      flat
      style="align-self: flex-end;"
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
      nodes: []
    }
  },
  mounted() {
    this.init()
    window.onresize = () => {
      this.setNodeWidth()
    }
  },
  methods: {
    init () {
      this.nodes = []
      this.$nextTick(() => {
        this.colorAll('primary')
        for (let i = 0; i < this.numNodes; i++) {
          const num = Math.floor(Math.random() * (this.maxNum - this.minNum) + this.minNum)
          this.nodes.push(new NodeClass(
            num,
            100,
            `${Math.floor((num / this.maxNum) * 100)}%`,
            'primary'
          ))
        }
        this.setNodeWidth()
      })
    },
    setNodeWidth () {
      const padding = 10
      const tableWidth = document.getElementById('arrayView').parentElement.clientWidth - padding
      const nodeWidth = Math.floor(tableWidth / (this.numNodes + 1))
      for (const node of this.nodes) {
        node.width = nodeWidth
      }
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
  }
}
</script>
