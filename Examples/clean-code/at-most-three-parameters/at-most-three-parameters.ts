type Invoice = { reference: string }

declare const dueDate: Date

// ❌ Bad — seven positional parameters. The call site is a row of anonymous
// values, and nothing stops `currency` and `notes` from being swapped.
declare function createInvoiceBad(
  customerId: string,
  amountInCents: number,
  currency: string,
  dueDate: Date,
  taxRate: number,
  notes: string,
  isDraft: boolean,
): Invoice

const badInvoice = createInvoiceBad('cus_42', 12000, 'EUR', dueDate, 0.2, '', true)

// ✅ Good — one named value. Every argument labels itself, optional fields are
// optional, and the flag became a status that can grow a third case.
type NewInvoice = {
  customerId: string
  amountInCents: number
  currency: 'EUR' | 'USD'
  dueDate: Date
  taxRate: number
  status: 'draft' | 'issued'
  notes?: string
}

declare function createInvoice(invoice: NewInvoice): Invoice

const goodInvoice = createInvoice({
  customerId: 'cus_42',
  amountInCents: 12000,
  currency: 'EUR',
  dueDate,
  taxRate: 0.2,
  status: 'draft',
})

export { badInvoice, goodInvoice }
