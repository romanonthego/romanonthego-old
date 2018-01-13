export default class List {
  constructor() {
    this.list = []
    this.length = 0
  }

  get(index) {
    return this.list[index]
  }
}
