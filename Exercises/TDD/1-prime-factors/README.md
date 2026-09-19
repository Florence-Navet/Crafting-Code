# Prime Factors Kata

The Prime Factors kata, popularised by Robert C. Martin ("Uncle Bob"), is one of
the classic exercises for practising Test-Driven Development. It is short enough
to repeat daily, yet it produces one of the most striking demonstrations of how
an algorithm can *emerge* from tests rather than being designed up front.

## The problem

Write a function that takes an integer `n > 1` and returns the list of its prime
factors, in ascending order, with repetitions.

```
generate(1)  -> []
generate(2)  -> [2]
generate(3)  -> [3]
generate(4)  -> [2, 2]
generate(6)  -> [2, 3]
generate(8)  -> [2, 2, 2]
generate(9)  -> [3, 3]
generate(12) -> [2, 2, 3]
```

## The rules of the game

Follow the three laws of TDD:

1. Write no production code except to make a failing test pass.
2. Write only enough of a test to demonstrate a failure (a compilation error
   counts as a failure).
3. Write only enough production code to make the failing test pass.

And the red / green / refactor cycle:

- **Red** — add the next smallest test; watch it fail.
- **Green** — do the simplest thing that makes it pass, even if it feels naive.
- **Refactor** — clean up the code *and the tests* while everything stays green.

## How to practice it

Take the inputs in order (`1, 2, 3, 4, 5, 6, 8, 9, ...`) and add one test at a
time. Resist the urge to jump ahead: the point of the kata is to notice how the
implementation grows.

A typical progression looks like this:

1. `1` returns an empty list — the simplest possible implementation returns `[]`.
2. `2` forces a first `if`.
3. `3` generalises the `if` into a division by 2.
4. `4` turns the `if` into a `while`.
5. `6` forces a second, outer loop over candidate divisors.
6. Around `8` and `9` the special cases collapse and the whole function becomes
   a handful of lines.

The lesson: **as the tests get more specific, the code gets more generic.** By
the end there are no `if` statements left for particular numbers — just two
nested loops. Uncle Bob calls this the *Transformation Priority Premise* in
action.

## Refactoring targets

Once it is green, look for:

- a clear name for the loop variable (`divisor`, not `i`);
- guard clauses instead of nested conditionals;
- tests that read as a specification (table-driven tests work nicely here);
- no duplication between test cases.

## Getting started

```bash
npm install
npm test          # single run
npm run test:watch # red/green/refactor loop
npm run typecheck
```

Tests live in `src/` next to the code they exercise, in `*.test.ts` files.
Start by renaming the placeholder test in `src/prime-factors.test.ts` and
writing the first real assertion — then create `src/prime-factors.ts` only once
a test demands it.

## Going further

- Time yourself: the kata should eventually take under 10 minutes.
- Try it without looking at a previous solution.
- Try it in a different language, or with a property-based test
  (`factors.reduce((a, b) => a * b) === n` and every factor is prime).
