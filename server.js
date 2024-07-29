// Node.js
// import { createServer } from 'node:http'
// const server = createServer((request, response) => {
//   console.log("Hello World")
// })
// server.listen({port})

// Fastify
import { fastify } from 'fastify'
// import { DatabaseMemory } from './database-memory.js'
import { DatabasePostgres } from './database-postgres.js'

const server = fastify()

// const database = new DatabaseMemory()
const database = new DatabasePostgres()

// POST
server.post('/items', async (request, reply) => {
  const title = request.body
  
  await database.create({
    title
  })
  
  return reply.status(201).send()
})

// GET
server.get('/items', async (request) => {
  const search = request.query.search

  const items = await database.list(search)
  
  return items
})

// PUT
server.put('/items/:id', async (request, reply) => {
  const itemId = request.params.id

  const title = request.body

  await database.update(itemId, {
    title
  })

  return reply.status(204).send()
})

// DELETE
server.delete('/delete/:id', async (request, reply) => {
  const itemId = request.params.id

  await database.delete(itemId)

  return reply.status(204).send()
})

server.listen({
  port: process.env.PORT ?? {PORT}
})