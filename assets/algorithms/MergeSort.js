import Sort from "./Sort";

export default class MergeSort extends Sort {
  static colors = {
    primary: 'primary',
    pivot: 'red',
    currentIteration: 'grey',
    swapping: 'yellow',
    lessThanPivot: 'purple',
    sorted: 'success'
  }

  async sort (arr) {
    this.arr = arr
    await this.mergeSort(arr, 0, arr.length - 1)
    await this.sleep(this.stepTime < 500 ? 500 : this.stepTime)
    return new Promise(resolve => resolve())
  }

  async mergeSort (arr, low, high) {

  }
}

