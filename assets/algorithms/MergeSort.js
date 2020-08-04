import Sort from "./Sort";

export default class MergeSort extends Sort {
  static colors = {
    leftSubArray: 'purple',
    rightSubArray: 'orange',
    sorted: 'success'
  }

  async sort () {
    const resolve = new Promise(resolve => resolve())
    await this.mergeSort(0, this.arr.length - 1).catch((e) => {
      return resolve
    })
    return resolve
  }

  async mergeSort (left, right) {
    if (left < right) {
      let middle = left + Math.floor((right - left) / 2)
      await this.mergeSort(left, middle)
      await this.mergeSort(middle + 1, right)
      await this.merge(left, middle, right)

      this.arr.colorRange(left, right, MergeSort.colors.sorted)
      if (left !== 0 || right !== this.arr.length - 1) {
        await this.sleep()
        this.arr.colorRange(left, right, 'primary')
        await this.sleep()
      }
    }
    return new Promise(resolve => resolve())
  }

  // Merges two sub-arrays of this.arr[]
  // First subarray is arr[left..middle]
  // Second subarray is arr[middle + 1..right]
  async merge (left, middle, right) {
    this.arr.colorRange(left, middle, MergeSort.colors.leftSubArray) // Left Subarray
    this.arr.colorRange(middle + 1, right, MergeSort.colors.rightSubArray) // Right Subarray
    await this.sleep()

    let currentLeft = left
    let currentRight = middle + 1

    for (let i = left; i <= right; i++) {
      if (currentLeft < right) {
        if (this.arr[currentLeft].value > this.arr[currentRight].value) {
          this.arr.moveIndex(currentRight, currentLeft)
          if (currentLeft < currentRight) {
            currentLeft++
          }
          if (currentRight < right) {
            currentRight++
          }
          await this.sleep()
        } else {
          if (currentLeft < currentRight) {
            currentLeft++
          } else if (currentRight < right) {
            currentRight++
          }
        }
      }
    }

    return new Promise(resolve => resolve())
  }
}
