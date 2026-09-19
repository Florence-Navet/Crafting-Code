# String Calculator Kata

Roy Osherove's String Calculator is the classic first TDD exercise. The
requirements arrive one at a time, each one small enough to reach with a single
test, and each one slightly bending the design you already have. The exercise is
less about the parsing than about the rhythm: one test, one reason to change the
code, one refactor, repeat.

## The problem

Write a function that takes a string of numbers and returns their sum.

```
add('')        -> 0
add('1')       -> 1
add('1,2')     -> 3
```

Then work through the requirements below **in order**, one test at a time. Do
not read ahead; the point is to meet each change the way you meet a change in
real work — with the previous step already committed.

| #   | Requirement                                          | Example                | Result |
| --- | ---------------------------------------------------- | ---------------------- | ------ |
| 1   | An empty string returns 0                            | `''`                   | 0      |
| 2   | One number returns its value                         | `'1'`                  | 1      |
| 3   | Two numbers, comma separated, are summed             | `'1,2'`                | 3      |
| 4   | Any amount of numbers is allowed                     | `'1,2,3,4,5'`          | 15     |
| 5   | Newlines are delimiters too                          | `'1\n2,3'`             | 6      |
| 6   | A custom delimiter can be declared on the first line | `'//;\n1;2'`           | 3      |
| 7   | Negative numbers throw, listing every negative found | `'1,-2,-5'`            | throws |
| 8   | Numbers above 1000 are ignored                       | `'2,1001'`             | 2      |
| 9   | Delimiters can be any length                         | `'//[***]\n1***2***3'` | 6      |
| 10  | Several delimiters can be declared                   | `'//[*][%]\n1*2%3'`    | 6      |

For requirement 7, the message must name the offenders — something like
`negatives not allowed: -2, -5` — so a single test pins both the failure and its
content. Decide the error convention (throw, or a result type) once and stay
with it.

## Where it gets interesting

- **Requirement 5** is the first hint that splitting on a single character is a
  dead end. Resist generalising before requirement 6 actually asks for it.
- **Requirement 6** splits the input into a _header_ and a _body_. Notice how
  much simpler the rest becomes once parsing the delimiter is its own function,
  separate from summing.
- **Requirement 7** introduces a second responsibility — validation — into a
  function that until now only calculated. That is a seam worth naming.
- **Requirements 9 and 10** are cheap if delimiters are already a list, and
  painful if they are still a character. What you did at step 6 decides which.

## Refactoring targets

- one function that determines the delimiters, one that splits, one that sums —
  each nameable in a few words;
- no regex that needs a comment to be read (or: a regex with a name);
- tests that read as the requirement table above, not as seven near-identical
  blocks;
- the 1000 of requirement 8 given a name, not left as a literal.

## Getting started

```bash
npm install
npm test           # single run
npm run test:watch # red/green/refactor loop
npm run typecheck
```

Tests live in `src/` next to the code they exercise, in `*.test.ts` files.
Rename the placeholder in `src/string-calculator.test.ts`, write the first
assertion for the empty string, and create `src/string-calculator.ts` only once
a test demands it.
