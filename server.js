import { createServer } from 'node:http'

const server = createServer((request, response) => {
  console.log("Hello World")
})

server.listen(3000)