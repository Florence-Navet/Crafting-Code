# The Five Test Doubles

Dummy, stub, fake, spy and mock are not five kinds of object. They are five
*roles*, and the difference between them is not in what the object looks like —
it is in where the knowledge about correctness lives.

To make that visible, this repo has one interface:

```ts
export interface UserRepository {
  findByEmail(email: string): User | null;
  save(user: User): void;
}
```

…one system under test, `RegistrationService`, and **five implementations of
that interface**, one per role. All five compile against it, the service cannot
tell them apart, and no `any`, cast or `@ts-expect-error` appears anywhere — the
compiler certifying that they are interchangeable is part of the point.

## The table

| Double | Returns canned data | Records calls | Holds its own assertions | The test asserts on |
|--------|---------------------|---------------|--------------------------|---------------------|
| **Dummy** | no — it throws | no | no | that it was never reached |
| **Stub**  | yes | no | no | the result of the service |
| **Fake**  | no — it computes | no (it stores) | no | resulting **state** |
| **Spy**   | yes (trivially) | yes | no | recorded **interaction** |
| **Mock**  | yes (trivially) | yes | **yes** | nothing — the double already did |

## The decision rule

- Needs to answer a query with a chosen value → **stub** or richer.
- Needs to remember what happened so the test can check it → **spy** or **mock**.
- Contains the expectation itself and fails on its own → **mock**, only.
- Needs real behaviour rather than canned answers, so that a write changes what
  a later read returns → **fake**. It is the outlier: the only double you assert
  *state* against rather than calls, and the only one that can produce emergent
  behaviour — `fake.test.ts` registers the same email twice and gets a
  `DuplicateEmail` that no stub could have produced, because `save` and
  `findByEmail` genuinely agree with each other.

## The diff that explains everything

```bash
diff src/doubles/spy.ts src/doubles/mock.ts
```

Same interface, same two methods, same shape. The spy pushes to an array and the
test checks it afterwards; the mock checks the call as it arrives and throws.
**Moving the assertion out of the test body and into `save` is the entire
difference between a spy and a mock.** It is a question of who owns verification,
not of what the object is made of.

`vi-fn-is-a-spy.test.ts` makes the same point with the library: `vi.fn()` is
called a mock by almost everyone, but a bare `vi.fn()` verified with
`expect(save).toHaveBeenCalledOnce()` is a **spy**. Put the expectation inside
the `vi.fn()` implementation so it throws at call time, and the same function
becomes a **mock**.

## Why the service looks the way it does

`RegistrationService.register` has exactly three parts, and each one exists to
make a different double necessary:

1. a password guard that returns before touching the repository — the only
   branch a **dummy** can survive;
2. a `findByEmail` query that decides a branch — what a **stub** is for;
3. a `save` command that returns nothing — which is why **spies** and **mocks**
   exist at all, since there is no return value to assert on.

## Running it

```bash
npm install && npm test
```

`npm run typecheck` runs `tsc --noEmit` under `strict: true`.

## A note on the duplication

The five files repeat each other, there is no shared base class, and there is no
barrel export. That is deliberate: each file is meant to be opened on its own and
read end to end, and any two of them are meant to be diffed. Factoring the
repetition away would delete the teaching material.
