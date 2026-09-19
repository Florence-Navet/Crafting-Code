
// ❌ Bad — the reader has to execute the code in their head to learn what it means.
type Line = { s: number; p: number; q: number }

function calc(d: Line[], t: number): number {
  let r = 0
  for (const x of d) {
    if (x.s === 1) {
      r += x.p * x.q
    }
  }
  return r * (1 + t)
}

// ✅ Good — names carry the domain, the units and the intent.
type OrderLine = {
  isShipped: boolean
  unitPriceInCents: number
  quantity: number
}

function shippedTotalInCents(lines: OrderLine[], vatRate: number): number {
  const shippedLines = lines.filter((line) => line.isShipped)
  const subtotalInCents = shippedLines.reduce(
    (total, line) => total + line.unitPriceInCents * line.quantity,
    0,
  )

  return subtotalInCents * (1 + vatRate)
}

export { calc, shippedTotalInCents }
