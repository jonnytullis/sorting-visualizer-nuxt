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
    await this.mergeSort(0, arr.length - 1)
    await this.sleep(this.stepTime < 500 ? 500 : this.stepTime)
    return new Promise(resolve => resolve())
  }

  async mergeSort (left, right) {
    if (1 < right) {
      const middle = (this.arr.length + 1) / 2
      await this.mergeSort(left, middle)
      await this.mergeSort(middle + 1, right)
      await this.merge(left, middle, right)
    }
    return new Promise(resolve => resolve())
  }

  // Merges two sub-arrays of arr[].
  // First subarray is arr[l..m]
  // Second subarray is arr[m+1..r]
  async merge (left, middle, right) {
  }
}

