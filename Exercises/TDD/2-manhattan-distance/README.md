## Getting started

```bash
npm install
npm test           # single run
npm run test:watch # red/green/refactor loop
npm run typecheck
```

Tests live in `src/` next to the code they exercise, in `*.test.ts` files.
Rename the placeholder in `src/manhattan-distance.test.ts`, write the first
assertion for two identical points, and create `src/manhattan-distance.ts` only
once a test demands it.

# Manhattan Distance Kata

The Manhattan (or taxicab) distance between two points is the distance you would
walk on a street grid: you cannot cut across the block, so you add the horizontal
and vertical legs.

```
distance((0, 0), (3, 4)) === 7      // not 5 — that would be Euclidean
```

It is a tiny problem, which is exactly why it makes a good kata: the arithmetic
takes one line, so all the interesting work is in the _design_ — where the
behaviour lives, what a point is, and how far you let the abstraction grow.

## The problem

Given two points on an integer grid, return the sum of the absolute differences
of their coordinates.

| From       | To        | Distance |
| ---------- | --------- | -------- |
| `(0, 0)`   | `(0, 0)`  | 0        |
| `(0, 0)`   | `(1, 0)`  | 1        |
| `(0, 0)`   | `(0, 1)`  | 1        |
| `(0, 0)`   | `(3, 4)`  | 7        |
| `(3, 4)`   | `(0, 0)`  | 7        |
| `(-1, -1)` | `(1, 1)`  | 4        |
| `(2, -5)`  | `(-3, 5)` | 15       |

## The rules of the game

Follow the three laws of TDD:

1. Write no production code except to make a failing test pass.
2. Write only enough of a test to demonstrate a failure (a compilation error
   counts as a failure).
3. Write only enough production code to make the failing test pass.

Then red / green / refactor:

- **Red** — add the next test; watch it fail for the reason you expect.
- **Green** — simplest thing that passes.
- **Refactor** — clean up code _and_ tests while green.

## How to practice it

1. Start by writing down your test case steps
   What are the simplest cases you can think of?
   How are you going to introduce complexity gradually?

2. Start implementing the simplest test case and make it pass.
3. Gradually introduce more complex test cases, following the strategy you outlined in step 1.
4. Don't forget to refactor when all tests are passing.

5. Let's say we need to work in 3D now, build a TDD path for it
6. Implement it
