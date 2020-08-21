import Sort from "./Sort";

export default class BubbleSort extends Sort {
  static colors = {
    comparing: 'purple',
    swapping: 'yellow',
    limit: 'grey',
    sorted: 'success'
  }

  async sort () {
    await this.bubbleSort()
    return new Promise(resolve => resolve())
  }

  async bubbleSort () {
    let sorted = false
    let limit = this.arr.length - 1
    while (!sorted) {
      this.updateStatus(`(limit index = ${limit}. Iterating array...`)
      this.arr[limit].color = BubbleSort.colors.limit
      let swapped = false
      for (let i = 0; i < limit; i++) {
        this.arr.colorRange(i, i+ 1, BubbleSort.colors.comparing)
        await this.sleep()
        if (this.arr[i].value > this.arr[i + 1].value) {
          this.arr.colorRange(i, i+ 1, BubbleSort.colors.swapping)
          await this.sleep()
          this.arr.swap(i, i + 1)
          swapped = true
          await this.sleep()
        }
        this.arr.colorRange(i, i+ 1, 'primary')
      }
      this.arr[limit].color = BubbleSort.colors.sorted
      this.updateStatus('Limit sorted')
      await this.sleep()
      limit--
      if (!swapped || limit < 0) {
        if (!swapped) {
          this.updateStatus('Iterated with no swaps! Exiting loop...')
        }
        this.arr.colorRange(0, limit, BubbleSort.colors.sorted)
        sorted = true
      }
    }
    return new Promise(resolve => resolve())
  }
}

