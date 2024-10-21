import Fastify, { FastifyInstance, RouteShorthandOptions } from 'fastify'

export const server: FastifyInstance = Fastify({ logger: true })
export const logger = server.log

server.get('/health', async () => ({ status: 'OK' }))