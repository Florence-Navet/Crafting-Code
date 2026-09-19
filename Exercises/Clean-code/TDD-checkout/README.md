# Checkout Kata

A supermarket checkout totals a sequence of scanned items. Items are identified
by SKU; each SKU has a unit price, and some carry a multi-buy offer — buy `n`,
pay `y` for the group instead of `n × unit`.

The kata descends from Dave Thomas's CodeKata Kata01 (Supermarket Pricing) and
Kata09 (Back to the Checkout), with extensions from the common interview
variants and from Emily Bache's SupermarketReceipt refactoring kata.

The full milestone-by-milestone brief lives in [`PLAN.md`](./PLAN.md). This
README is the short version.

## The problem

Reference price list — **test data only, never hardcoded into production code**:

| SKU | Unit price | Offer     |
|-----|------------|-----------|
| A   | 50         | 3 for 130 |
| B   | 30         | 2 for 45  |
| C   | 20         | none      |
| D   | 15         | none      |

Rules of the domain:

- Items may be scanned in any order. `B`, `A`, `B` must still recognise the pair
  of Bs and price them at 45.
- Offers apply greedily and repeatedly. Five As price as one group of three (130)
  plus two singles (100) = 230.
- Prices are integers in the smallest currency unit. **No floating point
  anywhere in the money path.**
- Pricing changes frequently. Rules are supplied to a checkout when a
  transaction starts; they are not compiled into it.

## Public API

```
new Checkout(pricingRules)   // construction takes the rules
checkout.scan(sku)           // records one scanned item
checkout.total(): number     // total for everything scanned so far
```

`total()` is a query: calling it twice must return the same value and must not
mutate anything. Scanning an unknown SKU is an error — pick one convention
(throw, or a result type) and apply it consistently, with a test.

## Milestones

Work them in order. Each one exists to create the design pressure that the next
one resolves — **do not build the M3 abstraction during M1 or M2.** Feeling the
pain first is the point; a design arrived at prematurely is exactly the failure
mode this kata exposes.

### M1 — Unit pricing only

| Scanned    | Expected |
|------------|----------|
| (nothing)  | 0        |
| `A`        | 50       |
| `AB`       | 80       |
| `CDBA`     | 115      |

A map of SKU to price and a running sum is correct at this stage. Do not
anticipate offers.

### M2 — Multi-buy offers

| Scanned    | Expected | | Scanned   | Expected |
|------------|----------|-|-----------|----------|
| `AA`       | 100      | | `AAAAAA`  | 260      |
| `AAA`      | 130      | | `AAAB`    | 160      |
| `AAAA`     | 180      | | `AAABB`   | 175      |
| `AAAAA`    | 230      | | `AAABBD`  | 190      |
|            |          | | `DABABA`  | 190      |

Let the implementation get ugly if that is where it goes. Scan order must not
affect the total, so the total is computed from item *counts*, not from the scan
sequence. That realisation is the point of this milestone.

### M3 — Refactor to a rules model

No new tests, no behaviour change, suite green after every step. Extract pricing
into a model where each offer is a value behind a common interface, `Checkout`
holds a basket of counted SKUs plus a collection of rules and asks them for a
total, and a plain unit price is itself a rule — so there is no special case for
"items with no offer".

Verify all five hard constraints explicitly before closing this milestone:

1. `Checkout` contains no SKU literal anywhere.
2. `Checkout` contains no `if`/`switch` on offer type and no `instanceof`-style test.
3. A new kind of offer requires a new type plus registration — no edit to
   `Checkout` or to any existing offer type.
4. A rule set containing no offers still produces correct totals.
5. The A/B/C/D table lives in test fixtures, not production code.

### M4 — Prove extensibility

One at a time, tests first, separate commits: 20% off every C; buy two of X get
20% off Y; 10% off the order when the subtotal exceeds 5000, applied after all
item-level discounts. If any of them forces a change to `Checkout` or to an
existing offer type, M3 was not finished — go back and fix the design.

The third introduces rule *ordering* (item rules, then basket rules). Make that
order explicit and data-driven, not an accident of iteration order, and document
the decision.

### M5 — Itemised receipt

Add a `receipt()` query returning per line: SKU, quantity, gross amount,
discount applied, and the name of the rule that produced it — **without changing
how the total is calculated**. If rules currently return bare integers, they
should have been returning discount records. This milestone tells you whether
the M3 model was right.

Exit criteria: receipt line discounts sum exactly to `gross − total()`, asserted
in a test.

## Stretch goals

Only once M1–M5 are complete and clean: weighted goods at 199/kg with integral
prices (pin the rounding decision with a test, and state whether it is per line
or per basket); a best-price guarantee when several offers compete for the same
items (keep the naive path and add the optimiser behind the same interface); and
a property test — total ≤ sum of unit prices, and scan order never changes the
total.

## Definition of done

- [ ] Every acceptance value in M1 and M2 is covered by a test.
- [ ] All five M3 hard constraints hold in the final code.
- [ ] No floating point in the money path.
- [ ] No SKU literals outside test fixtures.
- [ ] Typecheck clean.
- [ ] A README section or docstring explaining how to register a new offer, with
      one worked example.
- [ ] Commit history shows the milestone progression, with M3 as a
      behaviour-preserving refactor commit.

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

## Registering a new offer

> Fill this in during M3/M4 with a worked example — it is part of the definition
> of done, and writing it is the fastest way to discover that your extension
> point is awkward.
