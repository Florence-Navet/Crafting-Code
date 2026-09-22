import { describe, expect, it } from 'vitest'

import { Checkout } from './checkout'


describe('checkout kata', () => {
  it('runs the test suite', () => {
    expect(true).toBe(true)
  })


})

  it('totals 0 when nothing is scanned', () => {
    const checkout = new Checkout()
    expect(checkout.total()).toBe(0)
  })


    it('total 50 for oNe apple', () => {
    const checkout = new Checkout({Apple : 50})
    checkout.scan('Apple')
    expect(checkout.total()).toBe(50)
  })

      it('total 100 for Two apples', () => {
    const checkout = new Checkout({Apple : 100})
    checkout.scan('Apple')
    checkout.scan('Apple')
    expect(checkout.total()).toBe(100)
  })


// caisse vide 6 -> 0
// un item pomme 6 -> 50
// deux item pomme -> 100
// 1 oeuf -> 20
// 2 oeufs -> 40
// 1 pommme + 1 oeuf -> 30
// 3 pommes -> 130
// 
// 