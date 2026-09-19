import { describe, expect, it } from 'vitest'

describe('demo', () => {
  it('runs the test suite', () => {
    expect(true).toBe(true)
  })

  it('returns factorielle(0)=1', () => {
    const result = factorielle(0);
    expect(result).toEqual(1)
  })

  it('returns factorielle(1)=1', () => {
    const result = factorielle(1);
    expect(result).toEqual(1)
  })

  it('returns factorielle(2)=2 (2x1)', () => {
    const result = factorielle(2);
    expect(result).toEqual(2);
  })

  it('returns factorielle(3)=6 (3x2x1)', () => {
    const result = factorielle(3);
    expect(result).toEqual(6);
  })
})

const factorielle = (n: number) => {
  if (n<=1){
    return 1;
  }

  let result = 1
  for (let i=1; i<=n; i++){
    result*=i
  }
  return result
};