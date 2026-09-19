import { createServer, type Server, type ServerResponse } from 'node:http'
import { getBalance } from './account-service.ts'

type Health = { status: 'ok'; uptimeInSeconds: number }
type Balance = { balance: number }

function createApp(): Server {
  return createServer((request, response) => {
    if (request.method === 'GET' && request.url === '/health') {
      const health: Health = { status: 'ok', uptimeInSeconds: Math.floor(process.uptime()) }

      respondWithJson(response, 200, health)
      return
    }

    if (request.method === 'GET' && request.url === '/balance') {
      const balance: Balance = { balance: getBalance() }

      respondWithJson(response, 200, balance)
      return
    }

    respondWithJson(response, 404, { error: 'Not found' })
  })
}

function respondWithJson(response: ServerResponse, statusCode: number, body: unknown): void {
  response.writeHead(statusCode, { 'content-type': 'application/json' })
  response.end(JSON.stringify(body))
}

export { createApp }
