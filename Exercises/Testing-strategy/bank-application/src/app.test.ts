import type { Server } from 'node:http'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createApp } from './app.ts'

let server: Server
let baseUrl: string

beforeAll(async () => {
  server = createApp()
  await new Promise<void>((resolve) => server.listen(0, resolve))

  const address = server.address()
  if (address === null || typeof address === 'string') {
    throw new Error('Server is not listening on a TCP port')
  }

  baseUrl = `http://localhost:${address.port}`
})

afterAll(async () => {
  await new Promise<void>((resolve, reject) => {
    server.close((error) => (error === undefined ? resolve() : reject(error)))
  })
})

describe('GET /health', () => {
  it('reports the service as healthy', async () => {
    const response = await fetch(`${baseUrl}/health`)

    expect(response.status).toBe(200)
    expect(await response.json()).toMatchObject({ status: 'ok' })
  })
})

describe('unknown routes', () => {
  it('responds with 404', async () => {
    const response = await fetch(`${baseUrl}/does-not-exist`)

    expect(response.status).toBe(404)
  })
})

describe('GET /balance', () => {
  it('returns the account balance', async () => {
    const response = await fetch(`${baseUrl}/balance`)

    expect(response.status).toBe(200)
    expect(await response.json()).toEqual({ balance: 1000 })
  })
})
