# Bank Application

A minimal HTTP server in TypeScript, run natively by Node — no build step, no
`tsx`, no bundler. `node src/start.ts` runs the TypeScript directly.

## Requirements

Node 22.18 or later (native TypeScript support). Check with `node -v`.

## Install

```bash
npm install
```

## Commands

| Command              | What it does                                          |
| -------------------- | ----------------------------------------------------- |
| `npm run dev`        | Starts the server with `--watch`: it restarts on save |
| `npm start`          | Starts the server once                                |
| `npm test`           | Runs the test suite once                              |
| `npm run test:watch` | Re-runs tests on save — the red/green/refactor loop   |
| `npm run typecheck`  | Type-checks the project (`tsc --noEmit`)              |

The server listens on port 3000 by default. Override it with `PORT`:

```bash
PORT=4000 npm run dev
```

**Node strips types but does not check them**, so `npm run dev` will happily run
code that does not type-check. Run `npm run typecheck` (or keep it in watch mode
in a second terminal) — it is not optional here.

## Endpoints

| Method | Path       | Response                                     |
| ------ | ---------- | -------------------------------------------- |
| `GET`  | `/health`  | `200` `{"status":"ok","uptimeInSeconds":12}` |
| `GET`  | `/balance` | `200` `{"balance":1000}`                     |
| _any_  | _anything_ | `404` `{"error":"Not found"}`                |

Try them with the server running:

```bash
curl localhost:3000/health
curl localhost:3000/balance
curl -i localhost:3000/does-not-exist
```

## Layout

```
src/
├── app.ts                  createApp() — routes, returns a server that is not listening yet
├── start.ts                entry point — reads PORT and listens
├── account-service.ts      returns the balance (currently a fixed 1000)
├── app.test.ts             HTTP tests — bind port 0, call the routes with fetch
└── account-service.test.ts unit test for the service
```

`createApp()` returns a server that has not been bound to a port, so the tests
start their own on an ephemeral port (`server.listen(0)`) and read the real port
back from `server.address()`. Nothing collides with a dev server left running in
another terminal, and no `supertest` is needed — plain `fetch` against a real
socket.

## What's Next

1. Collective design session to plan architecture for the getBalance feature.
2. Implement the BalanceRepository to manage account balances (reading)

3. Collective design session to plan architecture for the updateBalance feature.
4. Implement the updateBalance feature in the BalanceRepository.

5. Is the app resilient to race condition on updating balances?
   AKA what if two requests try to update the same account balance at the same time?
   How can this be prevented?
