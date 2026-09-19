import { spawn, type ChildProcess } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

const STARTUP_TIMEOUT_IN_MS = 10_000

let serverProcess: ChildProcess
let baseUrl: string

beforeAll(async () => {
  serverProcess = spawn('node', ['src/start.ts'], {
    cwd: fileURLToPath(new URL('..', import.meta.url)),
    env: { ...process.env, PORT: '0' },
    stdio: ['ignore', 'pipe', 'pipe'],
  })

  baseUrl = await readListeningUrl(serverProcess)
}, STARTUP_TIMEOUT_IN_MS)

afterAll(async () => {
  if (serverProcess.exitCode !== null) return

  const exited = new Promise((resolve) => serverProcess.once('exit', resolve))
  serverProcess.kill()
  await exited
})

function readListeningUrl(childProcess: ChildProcess): Promise<string> {
  return new Promise((resolve, reject) => {
    let output = ''

    childProcess.stdout?.on('data', (chunk: Buffer) => {
      output += chunk.toString()

      const listeningUrl = output.match(/listening on (http:\/\/\S+)/)
      if (listeningUrl?.[1] !== undefined) resolve(listeningUrl[1])
    })

    childProcess.stderr?.on('data', (chunk: Buffer) => reject(new Error(chunk.toString())))
    childProcess.once('error', reject)
    childProcess.once('exit', (code) => reject(new Error(`Server exited before listening (code ${code})`)))
  })
}

describe('GET /balance', () => {
  it('serves the account balance from a real server process', async () => {
    const response = await fetch(`${baseUrl}/balance`)

    expect(response.status).toBe(200)
    expect(response.headers.get('content-type')).toBe('application/json')
    expect(await response.json()).toEqual({ balance: 1000 })
  })
})
