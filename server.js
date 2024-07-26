// Node.js
// import { createServer } from 'node:http'
// const server = createServer((request, response) => {
//   console.log("Hello World")
// })
// server.listen({port})

// Fastify
import { fastify } from 'fastify'
import { DatabaseMemory } from './database-memory.js'

const server = fastify()

const database = new DatabaseMemory()

// POST
server.post('/items', (request, reply) => {
  const { title } = request.body
  
  database.create({
    title
  })
  
  return reply.status(201).send()
})

// GET
server.get('/items', (request) => {
  const search = request.query.search

  const items = database.list(search)
  
  return items
})

// PUT
server.put('/items/:id', (request, reply) => {
  const itemId = request.params.id

  const { title } = request.body

  database.update(itemId, {
    title
  })

  return reply.status(204).send()
})

// DELETE
server.delete('/delete/:id', (request, reply) => {
  const itemId = request.params.id

  database.delete(itemId)

  return reply.status(204).send()
})

server.listen({
  port: { port },
})