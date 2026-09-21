## Getting started

```bash
npm install
npm test           # single run
npm run test:watch # red/green/refactor loop
npm run typecheck
```

Tests live in `src/` next to the code they exercise, in `*.test.ts` files.
Rename the placeholder in `src/checkout.test.ts`, write the first M1 assertion,
and create `src/checkout.ts` only once a test demands it.
