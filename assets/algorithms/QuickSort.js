import Sort from "./Sort";

export default class QuickSort extends Sort {

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
    await this.quickSort(0, arr.length - 1)
    await this.sleep(this.stepTime < 500 ? 500 : this.stepTime)
    return new Promise(resolve => resolve(this.arr))
  }

  async quickSort (low, high) {
    if (low <= high) {
      const pivotIndex = await this.partition(low, high)
      this.arr[pivotIndex].color = QuickSort.colors.sorted
      await this.sleep()
      await this.quickSort(low, pivotIndex - 1)
      await this.quickSort(pivotIndex + 1, high)
    }
    return new Promise(resolve => setTimeout(resolve, 10));
  }

  async partition (low, high) {
    let pivot = this.arr[high]
    pivot.color = QuickSort.colors.pivot
    await this.sleep()

    let i = low - 1 // latest index less than the pivot value. Starts as -1

    for (let j = low; j <= high - 1; j++) {
      this.arr[j].color = QuickSort.colors.currentIteration
      await this.sleep()
      if (this.arr[j].value <= pivot.value) {
        i++
        this.arr[j].color = QuickSort.colors.lessThanPivot
        await this.sleep()

        if (i !== j) {
          this.arr[i].color = QuickSort.colors.swapping
          this.arr[j].color = QuickSort.colors.swapping
          await this.sleep()

          this.arr.swap(i, j)
          await this.sleep()

          this.arr[i].color = QuickSort.colors.lessThanPivot
          if (i !== j) {
            this.arr[j].color = QuickSort.colors.primary
          }
          await this.sleep()
        }
      } else {
        // arr[j] is greater than pivot value
        this.arr[j].color = QuickSort.colors.primary
      }
    }
    // At this point 'i + 1' is the index where the pivot should be, and 'high' is the index where it currently is.
    if ((i + 1) !== high) {
      this.arr[i + 1].color = QuickSort.colors.swapping
      this.arr[high].color = QuickSort.colors.swapping
      await this.sleep()

      this.arr.swap(i + 1, high)
      await this.sleep()

      this.arr[i + 1].color = QuickSort.colors.primary
      this.arr[high].color = QuickSort.colors.primary
    }

    return new Promise(resolve => resolve(i + 1))
  }
}
