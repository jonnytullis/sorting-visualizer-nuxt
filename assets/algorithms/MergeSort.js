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
    if (left < right) {
      let middle = left + Math.floor((right - left) / 2)
      await this.mergeSort(left, middle)
      await this.mergeSort(middle + 1, right)
      await this.merge(left, middle, right)
    }
    return new Promise(resolve => resolve())
  }

  // Merges two sub-arrays of this.arr[].
  // First subarray is arr[left..middle]
  // Second subarray is arr[middle + 1..right]
  async merge (left, middle, right) {
    const leftArr = []
    const rightArr = []
    for (let i = left; i <= right; i++) {
      if (i <= middle) {
        leftArr.push(this.arr[i])
      } else {
        rightArr.push(this.arr[i])
      }
    }

    let i = 0 // Index of left array
    let j = 0 // Index of right array
    let k = left // First index of subarray within this.this.arr[]
    while (i < leftArr.length && j < rightArr.length) {
      if (leftArr[i].value < rightArr[j].value) {
        this.arr[k] = leftArr[i]
        i++
      } else {
        this.arr[k] = rightArr[j]
        j++
      }
      k++
    }

    // Copy any remaining elements in leftArr and rightArr
    while (i < leftArr.length) {
      this.arr[k] = leftArr[i]
      i++
      k++
    }
    while (j < rightArr.length) {
      this.arr[k] = rightArr[j]
      j++
      k++
    }

    return new Promise(resolve => resolve())
  }
}

