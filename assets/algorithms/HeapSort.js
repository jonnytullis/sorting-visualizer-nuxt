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
    console.log('REACHED')
    await this.heapSort(this.arr.length - 1)
    await this.sleep(this.stepTime < 500 ? 500 : this.stepTime)
    return new Promise(resolve => resolve())
  }

  async heapSort (end) {
    // Build heap (rearrange array)
    for (let i = Math.floor(end / 2) - 1; i >= 0; i--) {
      await this.heapify(end, i)
    }

    // One by one extract an element from heap
    for (let i = (end - 1); i > 0; i--) {
      // Move current root to end
      this.arr.swap(0, i)

      // call max heapify on the reduced heap
      await this.heapify(i, 0);
    }
    return new Promise(resolve => resolve())
  }

  async heapify (n, i) {
    let largest = i // Initialize largest as root
    let left = 2 * i + 1 // left = 2*i + 1
    let right = 2 * i + 2 // right = 2*i + 2

    // If left child is larger than root
    if (left < n && this.arr[left] > this.arr[largest])
    largest = left

    // If right child is larger than largest so far
    if (right < n && this.arr[right] > this.arr[largest])
    largest = right

    // If largest is not root
    if (largest !== i) {
      this.arr.swap(i, largest)

      // Recursively heapify the affected sub-tree
      await this.heapify(n, largest);
    }

    return new Promise(resolve => resolve())
  }
}

