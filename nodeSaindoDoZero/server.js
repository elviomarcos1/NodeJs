import { fastify } from 'fastify'
import { DatabasePostgres } from './databasePostgres.js'

const server = fastify()

const database = new DatabasePostgres()

server.post('/videos', async (request, reply) => {
    const {title, description, duration} = request.body

    await database.create({
        title,
        description,
        duration,
    })

    console.log(database.list())

    return reply.status(201).send()
})

server.get('/videos', (request) => {
    const search = request.query.search

    const videos = database.list(search)

    return videos
})

server.put('/videos/:id', (request, reply) => {
   const videoId = request.params.id
   const {title, description, duration} = request.body

    database.update(videoId, {
    title,
    description,
    duration,
   })

   return reply.status(204).send()
})  

server.delete('/videos/:id', (request, reply) => {
    const videoId = request.params.id
    
    database.delete(videoId)
    
    return reply.status(204).send()
})

server.listen({
    port: 3333,
})