import NodeClass from "../NodeClass";

export default class Sort {
  stepTime = 0
  isExecuting = false
  arr = []
  haltedMessage = 'Execution Halted'

  updateStatus(message) {
    window.dispatchEvent(new CustomEvent('updateStatus', { detail: message }))
  }

  async sleep (ms = this.stepTime) {
    this.forceUpdate()
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        return this.isExecuting ? resolve() : reject(this.haltedMessage)
      }, ms)
    })
  }

  async execute(arr) {
    this.isExecuting = true
    this.arr = arr
    this.arr.colorRange(0, this.arr.length - 1, 'primary')
    dispatchEvent(new Event('start'))
    try {
      await this.sort()
      this.updateStatus('COMPLETE!')
      await this.sleep(this.stepTime < 500 ? 500 : this.stepTime)
    } catch(e) {
      if (e.toString() !== this.haltedMessage) {
        throw e
      }
    }
    this.stop()
    return new Promise(resolve => resolve(this.arr))
  }

  // Override this function in children
  sort() {}

  /** The view updates when array length changes **/
  forceUpdate () {
    this.arr.push(new NodeClass(0, 0, 0, 0, 'transparent'))
    this.arr.pop()
  }

  stop() {
    dispatchEvent(new Event('stop'))
    this.isExecuting = false
    this.status = ''
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
