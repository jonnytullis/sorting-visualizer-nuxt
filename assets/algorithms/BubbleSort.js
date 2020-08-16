import Sort from "./Sort";

export default class BubbleSort extends Sort {
  static colors = {
    parentNode: 'red',
    leftChild: 'orange',
    rightChild: 'purple',
    swapping: 'yellow',
    rootNode: 'grey',
    sorted: 'success'
  }

  async sort () {
    await this.bubbleSort()
    return new Promise(resolve => resolve())
  }

  async bubbleSort () {
  }
}

