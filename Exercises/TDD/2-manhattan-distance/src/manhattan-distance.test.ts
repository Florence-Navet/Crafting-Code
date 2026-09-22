import { describe, expect, it } from "vitest";
import { distance } from "./manhattan-distance";
  
describe("manhattan distance kata", () => {
  it("runs the test suite", () => {
    expect(true).toBe(true);
  });
});

describe("distance", () => {
  it("exists", () => {
    expect(typeof distance).toBe("function");
  });


    it("returns 0 for the same point", () => {
    expect(distance([0, 0], [0, 0])).toBe(0);
  });

      it("returns 1 for one step on y", () => {
    expect(distance([0, 0], [0, 1])).toBe(1);
  });

    it("returns 3 for three steps on y", () => {
    expect(distance([0, 0], [0, 3])).toBe(3);
  });

    it("returns 4 for four steps on x", () => {
    expect(distance([0, 0], [4, 0])).toBe(4);
  });

  it("returns 2 for two steps down on y", () => {
    expect(distance([0, 0], [0, -2])).toBe(2);
  });

    it("returns 6 for negative x and y", () => {
    expect(distance([0, 0], [-4, -2])).toBe(6);
  });

    it("returns 7 from (3, 4) back to the origin", () => {
    expect(distance([3, 4], [0, 0])).toBe(7);
  });


    it("returns 4 from (-1, -1) to (1, 1)", () => {
    expect(distance([-1, -1], [1, 1])).toBe(4);
  });


    it("returns 15 from (2, -5) to (-3, 5)", () => {
    expect(distance([2, -5], [-3, 5])).toBe(15);
  });

  it("returns 1 for one step on x", () => {
    expect(distance([0, 0], [1, 0])).toBe(1);
  });

  it("retuns 7 from the origin to  (3, 4)",  () => {
    expect(distance([0,0], [3,4])).toBe(7);
  })
});

// # TODO — Kata distance de Manhattan
//(0,0)(0,0) test 1
//(0,0)(0,1) test 2
//(0,0)(0,3) test 3
//(0,0)(4,0) test 4
//(0,0)(0,-2) test 5
//(0,0)(-4,-2) test 6
// pas plus long que le cas en court,
// le cas en court ne doit gérer le cas suivant
//sinon il est trop généraliste





