import Sort from "./Sort";

export default class BubbleSort extends Sort {
  static colors = {
    pivot: 'red',
    currentIteration: 'grey',
    swapping: 'yellow',
    lessThanPivot: 'purple',
    sorted: 'success'
  }

  async sort () {
    await this.bubbleSort(0, this.arr.length - 1)
    return new Promise(resolve => resolve())
  }

  async bubbleSort (low, high) {
  }
}

