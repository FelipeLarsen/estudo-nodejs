import { randomUUID } from 'node:crypto'

export class DatabaseMemory {
  #items = new Map()

  list(search) {
    return Array.from(this.#items.entries())
      .map((itemArray) => {
        const id = itemArray[0]
        const data = itemArray[1]

        return {
          id,
          ...data
        }
      })
      .filter(item => {
        if (search) {
          return item.title.includes(search)
        }
        return true
      })
  }

  create(item) {
    const itemId = randomUUID()

    this.#items.set(itemId, item)
  }

  update(id, item) {
    this.#items.set(id, item)
  }

  delete(id) {
    this.#items.delete(id)
  }
}