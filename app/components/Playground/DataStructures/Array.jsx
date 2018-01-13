export default class SimpleArray {
  constructor(array = []) {
    this.array = array
  }

  add(element) {
    this.array.push(element)
  }

  remove(element) {
    const index = this.array.indexOf(element)

    if (index >= 0) {
      this.array = this.array.splice(index, 1)
    }
  }

  indexOf(element) {
    const index = this.array.indexOf(element)

    if (index >= 0) {
      return index
    }

    return null
  }

  atIndex(index) {
    return this.array[index] || null
  }

  toString() {
    return this.array.map(JSON.stringify).join(' ')
  }
}
