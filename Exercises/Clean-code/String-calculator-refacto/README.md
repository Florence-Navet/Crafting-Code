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

## The exercise

### Step 1

Applying your clean code skills, refactor the implementation of the string calculator while ensuring all tests continue to pass. Focus on readability, maintainability, and simplicity of the code.

## Step 2

Push your changes on a branch with your name/pseudo.

## Step 3

Move to the branch of your neighbour and start implementing the following rules:
(NB this is TDD)

- Multiple of ten are doubled in your sum
- The computation is stopped after encountering the 3rd separator

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
