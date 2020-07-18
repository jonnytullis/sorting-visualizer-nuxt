
export default class QuickSort {

  static colors = {
    primary: 'primary',
    pivot: 'red',
    current: 'grey',
    swap: 'yellow',
    lessThanPivot: 'purple',
    sorted: 'success'
  }

  stepTime = 0

  async sort (arr) {
    await this.quickSort(arr, 0, arr.length - 1)
    await this.sleep(this.stepTime < 500 ? 500 : this.stepTime)
    return new Promise(resolve => resolve())
  }

  async quickSort (arr, low, high) {
    if (low <= high) {
      const pivotIndex = await this.partition(arr, low, high)
      arr[pivotIndex].color = QuickSort.colors.sorted
      await this.quickSort(arr, low, pivotIndex - 1)
      await this.quickSort(arr, pivotIndex + 1, high)
    }
    return new Promise(resolve => setTimeout(resolve, 10));
  }

  async partition (arr, low, high) {
    let pivot = arr[high]
    pivot.color = QuickSort.colors.pivot
    await this.sleep()

    let i = low - 1 // latest index less than the pivot value. Starts as -1

    for (let j = low; j <= high - 1; j++) {
      arr[j].color = QuickSort.colors.current
      await this.sleep()
      if (arr[j].value <= pivot.value) {
        i++
        arr[j].color = QuickSort.colors.lessThanPivot
        await this.sleep()

        arr[i].color = QuickSort.colors.swap
        arr[j].color = QuickSort.colors.swap
        await this.sleep()

        arr.swap(i, j)
        await this.sleep()

        arr[i].color = QuickSort.colors.lessThanPivot
        if (i !== j) {
          arr[j].color = QuickSort.colors.primary
        }
        await this.sleep()
      } else {
        // arr[j] is greater than pivot value
        arr[j].color = QuickSort.colors.primary
      }
    }
    // At this point 'i + 1' is the index where the pivot should be, and 'high' is the index where it currently is.
    arr.swap(i + 1, high)
    return new Promise(resolve => resolve(i + 1))
  }

  sleep (ms = this.stepTime) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

Array.prototype.swap = function (x, y) {
  const temp = this[x]
  this[x] = this[y]
  this[y] = temp
}
