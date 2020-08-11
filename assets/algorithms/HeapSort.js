import Sort from "./Sort"

export default class HeapSort extends Sort {
  static colors = {
    parentNode: 'red',
    leftChild: 'orange',
    rightChild: 'purple',
    swapping: 'yellow',
    rootNode: 'grey',
    sorted: 'success'
  }

  async sort () {
    await this.heapSort(this.arr.length)
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
      this.arr[0].color = HeapSort.colors.swapping
      this.arr[i].color = HeapSort.colors.swapping
      this.status = 'Sorting Root Node...'
      await this.sleep()

      this.arr.swap(0, i)
      await this.sleep()

      this.arr[i].color = HeapSort.colors.sorted

      // call max heapify on the reduced heap
      await this.heapify(i, 0)
    }

    this.arr[0].color = HeapSort.colors.sorted
    return new Promise(resolve => resolve())
  }

  async heapify (end, i) {
    this.status = 'Building Heap...'
    this.arr[0].color = HeapSort.colors.rootNode

    let largest = i // Initialize largest as root
    let left = (2 * i) + 1
    let right = (2 * i) + 2

    if (largest < end) this.arr[largest].color = HeapSort.colors.parentNode
    if (left < end) this.arr[left].color = HeapSort.colors.leftChild
    if (right < end) this.arr[right].color = HeapSort.colors.rightChild
    await this.sleep()

    // If left child is larger than root
    if (left < end && this.arr[left].value > this.arr[largest].value) {
      largest = left
    }

    // If right child is larger than largest so far
    if (right < end && this.arr[right].value > this.arr[largest].value) {
      largest = right
    }

    // If largest is not root
    if (largest !== i) {
      const childColor = this.arr[largest].color
      this.arr[i].color = HeapSort.colors.swapping
      this.arr[largest].color = HeapSort.colors.swapping
      await this.sleep()

      this.arr.swap(i, largest)
      await this.sleep()

      this.arr[i].color = HeapSort.colors.parentNode
      this.arr[largest].color = childColor
      await this.sleep()

      this.arr[0].color = HeapSort.colors.rootNode
      this.arr.colorRange(1, end - 1, 'primary')

      // Recursively heapify the affected sub-tree
      await this.heapify(end, largest)
    }

    this.arr[0].color = HeapSort.colors.rootNode
    this.arr.colorRange(1, end - 1, 'primary')

    return new Promise(resolve => resolve())
  }
}

