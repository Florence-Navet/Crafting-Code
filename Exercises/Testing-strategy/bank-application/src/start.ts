import { createApp } from './app.ts'

const DEFAULT_PORT = 3000
const port = Number(process.env.PORT ?? DEFAULT_PORT)

const server = createApp()

server.listen(port, () => {
  const address = server.address()
  const boundPort = address !== null && typeof address !== 'string' ? address.port : port

  console.log(`listening on http://localhost:${boundPort}`)
})
