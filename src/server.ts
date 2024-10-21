import Fastify, { FastifyInstance, RouteShorthandOptions } from 'fastify'

export const server: FastifyInstance = Fastify({ logger: true })
export const logger = server.log

const opts: RouteShorthandOptions = {
  schema: {
    response: {
      200: {
        type: 'object',
        properties: {
          pong: {
            type: 'string'
          }
        }
      }
    }
  }
}

server.get('/health', async () => ({ status: 'OK' }));