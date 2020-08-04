import Sort from "./Sort";

export default class HeapSort extends Sort {
  static colors = {
    primary: 'primary',
    pivot: 'red',
    currentIteration: 'grey',
    swapping: 'yellow',
    lessThanPivot: 'purple',
    sorted: 'success'
  }

  async sort () {
    await this.heapSort(0, this.arr.length - 1)
    await this.sleep(this.stepTime < 500 ? 500 : this.stepTime)
    return new Promise(resolve => resolve())
  }

  async heapSort (low, high) {
  }
}

