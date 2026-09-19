type Parcel = { orderTotalInCents: number; weightInGrams: number }

// ❌ Bad — what is 5000? Cents or euros? Why 1290? Changing the free-shipping
// threshold means hunting for every 5000 in the codebase and guessing which
// ones mean this.
function shippingFeeInCentsBad(parcel: Parcel): number {
  if (parcel.orderTotalInCents > 5000) return 0
  if (parcel.weightInGrams > 20000) return 1290

  return 490
}

// ✅ Good — the constants name the rule and its units; the function now reads
// as the shipping policy itself.
const FREE_SHIPPING_THRESHOLD_IN_CENTS = 5_000
const HEAVY_PARCEL_THRESHOLD_IN_GRAMS = 20_000
const HEAVY_PARCEL_FEE_IN_CENTS = 1_290
const STANDARD_FEE_IN_CENTS = 490

function shippingFeeInCents(parcel: Parcel): number {
  if (parcel.orderTotalInCents > FREE_SHIPPING_THRESHOLD_IN_CENTS) return 0
  if (parcel.weightInGrams > HEAVY_PARCEL_THRESHOLD_IN_GRAMS) return HEAVY_PARCEL_FEE_IN_CENTS

  return STANDARD_FEE_IN_CENTS
}

export { shippingFeeInCentsBad, shippingFeeInCents }
