## Initial specs

A supermarket checkout totals a sequence of scanned items.

Items are identified by SKU. Each SKU has a unit price. Some SKUs additionally carry a
multi-buy offer: buy `n`, pay `y` for the group instead of `n × unit`.

Reference price list (test data only, never hardcoded into production classes):

| SKU | Unit price | Offer     |
| --- | ---------- | --------- |
| A   | 50         | 3 for 130 |
| B   | 30         | 2 for 45  |
| C   | 20         | none      |
| D   | 15         | none      |

Rules of the domain:

- Items may be scanned in any order. Scanning `B`, `A`, `B` must still recognize the
  pair of Bs and price them at 45.
- Offers apply greedily and repeatedly. Five As are two groups short of six, so they
  price as one group of three (130) plus two singles (100), totalling 230.
- Prices are integers in the smallest currency unit. **No floating point anywhere in the
  money path.** If the language has a decimal or money type already in use in this repo,
  prefer it.
- Pricing changes frequently. Rules are supplied to a checkout when a transaction
  starts; they are not compiled into it.

## Public API

Target shape, adapted to the repo's language idioms (naming case, error conventions,
optionals vs exceptions):

```
checkout.scan(sku)          // records one scanned item
checkout.total() -> integer // current total for everything scanned so far
```

`total()` is a query. Calling it twice in a row must return the same value and must not
mutate anything.

Scanning an unknown SKU is an error.

**Hard constraints, verify each one explicitly before closing this milestone:**

1. The `Checkout` type contains no SKU literal (`"A"`, `"B"`, …) anywhere.
2. The `Checkout` type contains no `if`/`switch` on offer type, and no `instanceof`-style
   type test.
3. Adding a new kind of offer requires adding a new type and registering it. It must not
   require editing `Checkout` or any existing offer type.
4. A pricing rule set containing no offers still produces correct totals.
5. Test data (the A/B/C/D table) lives in test fixtures, not in production code.

## Specs part 1: Basic Offers

1. Design a step by step plan to solve this in TDD
2. Implement it step by step
3. Think about design when needed.

## Specs part 2: Advanced Offers

1. **Percentage off an item.** 20% off every C.
2. **Cross-product offer.** Buy two of X, get 20% off Y.
3. **Basket-level discount.** 10% off the order when the subtotal exceeds 5000, applied
   after all item-level discounts.
