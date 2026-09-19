# Diamond Kata

The Diamond kata, introduced by Seb Rose, asks for something deceptively simple:
print a diamond of letters. It is a favourite follow-up to the Prime Factors
kata because the "obvious" incremental approach famously *stalls* — the code you
write for `A` and `B` does not grow smoothly into the code for `C`. That stall
is the lesson.

## The problem

Given a letter, print a diamond starting with `A`, with the given letter at the
widest point, and back to `A`. Each line is padded with spaces so the diamond is
symmetrical both horizontally and vertically.

```
diamond('A')

A
```

```
diamond('B')

 A
B B
 A
```

```
diamond('C')

  A
 B B
C   C
 B B
  A
```

Notes on the shape:

- The first and last lines contain a single `A`.
- Every other line contains the letter twice, separated by an odd number of
  spaces.
- Lines have no trailing whitespace beyond what the shape requires — decide this
  explicitly with a test, since it is the kind of detail that bites later.

## Why this kata is interesting

With Prime Factors, each new test nudges the implementation one step further and
the algorithm emerges naturally. With Diamond, you quickly reach a point where
the next test cannot be satisfied by a small tweak: you have to *throw away* the
special cases and think about the shape as a whole.

That confrontation is the point. It shows that "take the next smallest test and
do the simplest thing" is a heuristic, not a law, and that sometimes red/green/
refactor means a deliberate redesign during the refactor step.

There are two well-known ways through it, and it is worth trying both:

1. **Incremental / transformational** — go `A`, `B`, `C`, `D`… and push through
   the stall. Notice exactly where it happens and what you had to rethink.
2. **Property-based / "think first"** — instead of asserting whole diamonds,
   assert properties: the output is square, it is symmetrical top-to-bottom and
   left-to-right, row *i* contains the *i*-th letter twice, all other characters
   are spaces. The implementation then falls out of the properties.

## The rules of the game

Follow the three laws of TDD:

1. Write no production code except to make a failing test pass.
2. Write only enough of a test to demonstrate a failure (a compilation error
   counts as a failure).
3. Write only enough production code to make the failing test pass.

Then red / green / refactor:

- **Red** — add the next test; watch it fail for the reason you expect.
- **Green** — make it pass by the simplest means available.
- **Refactor** — improve code *and* tests while green. This is where the Diamond
  kata demands real work.

## Refactoring targets

Once it is green, look for:

- one function that builds a row and one that assembles rows — mirroring is a
  separate concern from letter placement;
- a helper for the alphabet range rather than arithmetic on char codes scattered
  through the code;
- tests that read as a specification; multi-line expected values are much easier
  to read as template literals than as escaped strings;
- duplication between the "top half" and "bottom half" logic — there should be
  none.

## Getting started

```bash
npm install
npm test           # single run
npm run test:watch # red/green/refactor loop
npm run typecheck
```

Tests live in `src/` next to the code they exercise, in `*.test.ts` files.
Rename the placeholder test in `src/diamond.test.ts`, write the first real
assertion for `diamond('A')`, and create `src/diamond.ts` only once a test
demands it.

## Going further

- Do the kata twice: once incrementally, once property-first, and compare the
  designs you end up with.
- Time-box the incremental attempt to 15 minutes and note where you stalled.
- Decide how the function should behave for lowercase input or a non-letter —
  and write the test before the code.
