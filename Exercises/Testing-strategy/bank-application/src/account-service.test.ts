import { describe, expect, it } from 'vitest'
import { getBalance } from './account-service.ts'

describe('getBalance', () => {
  it('returns the account balance', () => {
    expect(getBalance()).toBe(1000)
  })
})
