type Discount = { kind: 'percentage' | 'amount'; value: number }

type OrderLine = {
  unitPriceInCents: number
  quantity: number
  discount: Discount | null
}

type Order = {
  isCancelled: boolean
  customer: { isActive: boolean }
  lines: OrderLine[]
}

// ❌ Bad — six levels deep. The `else` branches that explain the failures are
// pages away from the condition that caused them, and the per-line pricing
// rules are tangled up with the order-level checks.
function totalInCentsBad(order: Order | null): number {
  if (order !== null) {
    if (order.customer.isActive) {
      if (!order.isCancelled) {
        if (order.lines.length > 0) {
          let total = 0
          for (const line of order.lines) {
            let priceInCents = line.unitPriceInCents * line.quantity
            if (line.discount !== null) {
              if (line.discount.kind === 'percentage') {
                priceInCents -= (priceInCents * line.discount.value) / 100
              } else {
                priceInCents -= line.discount.value
              }
            }
            total += priceInCents
          }
          return total
        } else {
          throw new Error('Order has no lines')
        }
      } else {
        throw new Error('Order is cancelled')
      }
    } else {
      throw new Error('Customer is inactive')
    }
  } else {
    throw new Error('Order is missing')
  }
}

// ✅ Good — guard clauses flatten the order-level checks, and extracting the
// per-line pricing removes the remaining levels: each function now holds one
// level of nesting and one level of abstraction.
function totalInCents(order: Order | null): number {
  if (order === null) throw new Error('Order is missing')
  if (!order.customer.isActive) throw new Error('Customer is inactive')
  if (order.isCancelled) throw new Error('Order is cancelled')
  if (order.lines.length === 0) throw new Error('Order has no lines')

  return order.lines.reduce((total, line) => total + lineTotalInCents(line), 0)
}

function lineTotalInCents(line: OrderLine): number {
  const grossInCents = line.unitPriceInCents * line.quantity

  if (line.discount === null) return grossInCents
  if (line.discount.kind === 'amount') return grossInCents - line.discount.value

  return grossInCents - (grossInCents * line.discount.value) / 100
}

export { totalInCentsBad, totalInCents }
