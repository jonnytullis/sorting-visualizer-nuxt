import NodeClass from "../NodeClass";

export default class Sort {
  stepTime = 0
  arr = []

  sleep (ms = this.stepTime) {
    this.forceUpdate(this.arr)
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /** The view updates when array length changes (see WATCHER in 'components/ArrayView.vue') **/
  forceUpdate (arr) {
    arr.push(new NodeClass(0, 0, 0, ''))
    arr.pop()
  }
}

Array.prototype.swap = function (x, y) {
  const temp = this[x]
  this[x] = this[y]
  this[y] = temp
}
