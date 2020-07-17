
export default class QuickSort {


  async sort (arr) {
    await this.quickSort(arr, 0, arr.length - 1)
    await sleep()
    return arr
  }

  async quickSort (arr, low, high) {
    if (low <= high) {
      const pivotIndex = await this.partition(arr, low, high)
      arr[pivotIndex].color = color.sorted
      await this.quickSort(arr, low, pivotIndex - 1)
      await this.quickSort(arr, pivotIndex + 1, high)
    }
    return new Promise(resolve => setTimeout(resolve, 10));
  }

  async partition (arr, low, high) {
    let pivot = arr[high]
    pivot.color = color.pivot
    await sleep()

    let i = low - 1 // latest index less than the pivot value. Starts as -1

    for (let j = low; j <= high - 1; j++) {
      arr[j].color = color.current
      await sleep()
      if (arr[j].value <= pivot.value) {
        i++
        arr[j].color = color.lessThanPivot
        await sleep()

        arr[i].color = color.swap
        arr[j].color = color.swap
        await sleep()

        arr.swap(i, j)
        await sleep()

        arr[i].color = color.lessThanPivot
        if (i !== j) {
          arr[j].color = color.primary
        }
        await sleep()
      } else {
        // arr[j] is greater than pivot value
        arr[j].color = color.primary
      }
    }
    // At this point 'i + 1' is the index where the pivot should be, and 'high' is the index where it currently is.
    arr.swap(i + 1, high)
    return new Promise(resolve => resolve(i + 1))
  }
}

Array.prototype.swap = function (x, y) {
  const temp = this[x]
  this[x] = this[y]
  this[y] = temp
}

let stepTime = 200
function sleep () {
  return new Promise(resolve => setTimeout(resolve, stepTime));
}



const color = {
  primary: 'primary',
  pivot: 'red',
  current: 'grey',
  swap: 'yellow',
  lessThanPivot: 'pink lighten-2',
  sorted: 'success'
}
