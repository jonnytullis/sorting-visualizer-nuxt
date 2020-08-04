import NodeClass from "../NodeClass";

export default class Sort {
  stepTime = 0
  isExecuting = false
  arr = []

  sleep (ms = this.stepTime) {
    if (!this.isExecuting) {
      throw new Error('Stopped Sorting')
    }
    this.arr.push(new NodeClass(0, 0, 0, 'transparent'))
    this.arr.pop()
    this.forceUpdate()
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  execute() {
    this.$emit('start')
    this.sort()
  }

  sort() {}

  /** The view updates when array length changes (see WATCHER in 'components/ArrayView.vue') **/
  forceUpdate () {
    this.arr.push(new NodeClass(0, 0, 0, 'transparent'))
    this.arr.pop()
  }

  stop() {
    this.$emit('stop')
    this.isExecuting = false
  }
}

Array.prototype.swap = function (x, y) {
  const temp = this[x]
  this[x] = this[y]
  this[y] = temp
}

Array.prototype.moveIndex = function(target, destination) {
  const temp = this[target]
  if (target > destination) {
    for (let i = target; i > destination; i--) {
      this[i] = this[i - 1]
    }
  } else if (target < destination) {
    for (let i = target; i < destination; i++) {
      this[i] = this[i + 1]
    }
  }
  this[destination] = temp
}

Array.prototype.isSorted = function () {
  for (let i = 0; i < this.length - 1; i++) {
    if (this[i].value > this[i + 1].value) {
      return false
    }
  }
  return true
}

Array.prototype.toString = function (lowIndex = 0, highIndex = this.length - 1) {
  let str = '[ '
  for (let i = lowIndex; i <= highIndex; i++) {
    str += this[i].value
    if (i < highIndex - 1) {
      str += ', '
    }
  }
  str += ' ]'
  return str
}

Array.prototype.colorRange = function (lowIndex, highIndex, color) {
  for (let i = lowIndex; i <= highIndex; i++) {
    this[i].color = color
  }
}
