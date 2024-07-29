import { randomUUID } from 'node:crypto'
import { sql } from './db.js'

export class DatabasePostgres {
  async list(search) {
    let items

    if (search) {
      items = await sql`select * from items where title ilike ${'%' + search + '%'}`
    } else {
      items = await sql`select * from items`
    }

    return items
  }

  async create(item) {
    const itemId = randomUUID()
    const title = item
    
    await sql`insert into items (id, title) VALUES (${itemId}, ${title})`
  }
  
  async update(id, item) {
    const title = item

    await sql`update items set title = ${title} WHERE  id = ${id}`
  }

  async delete(id) {
    await sql`delete from items where id = ${id}`
  }
}