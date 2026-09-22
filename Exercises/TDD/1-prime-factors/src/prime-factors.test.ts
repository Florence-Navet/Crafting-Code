import { describe, expect, it } from "vitest";

describe("prime factors kata", () => {
  it("runs the test suite", () => {
    expect(true).toBe(true);
  });
});

// describe('generate', () => {
describe("generate", () => {
  it("exists", () => {
    expect(typeof generate).toBe("function");
  });

  it("returns an empty list for 1", () => {
    expect(generate(1)).toEqual([]);
  });

  it("returns [2] for 2", () => {
    expect(generate(2)).toEqual([2]);
  });

  it("returns [3] for 3", () => {
    expect(generate(3)).toEqual([3]);
  });

  it("returns [2,2] for 4", () => {
    expect(generate(4)).toEqual([2, 2]);
  });

  it("returns [2,3] for 6", () => {
    expect(generate(6)).toEqual([2, 3]);
  });

  it("returns [2, 2, 2] for 8", () => {
    expect(generate(8)).toEqual([2, 2, 2]);
  });

    it("returns [3, 3] for 9", () => {
    expect(generate(9)).toEqual([3, 3]);
  });

  it("returns [2, 2, 3] for 12", () => {
    expect(generate(12)).toEqual([2, 2, 3]);
  });
});

function generate(n: number): number[] {
  // if (n == 2) return [2];
  // if (n == 3) return [3];
  const factors: number[] = [];
  let current = n;

  while (current % 2 === 0) {
    factors.push(2);
    current = current / 2;
  }
    
  while (current % 3 === 0) {
    factors.push(3);
    current = current / 3;
  }
  

  if (current > 1) factors.push(current);

  return factors;
}
