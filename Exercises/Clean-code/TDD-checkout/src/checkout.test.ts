import { describe, expect, it } from "vitest";

import { Checkout } from "./checkout";

describe("checkout kata", () => {
  it("runs the test suite", () => {
    expect(true).toBe(true);
  });
});

it("totals 0 when nothing is scanned", () => {
  const checkout = new Checkout();
  expect(checkout.total()).toBe(0);
});

it("total 50 for oNe apple", () => {
  const checkout = new Checkout({ Apple: 50 });
  checkout.scan("Apple");
  expect(checkout.total()).toBe(50);
});

it("total 100 for Two apples", () => {
  const checkout = new Checkout({ Apple: 50 });
  checkout.scan("Apple");
  checkout.scan("Apple");
  expect(checkout.total()).toBe(100);
});

it("totals 20 for one egg", () => {
  const checkout = new Checkout({ Egg: 20 });
  checkout.scan("Egg");
  expect(checkout.total()).toBe(20);
});

it("totals 40 for two eggs", () => {
  const checkout = new Checkout();

  checkout.scan("Egg");
  checkout.scan("Egg");

  expect(checkout.total()).toBe(40);
});

it("totals 70 for one apple and one egg", () => {
  const checkout = new Checkout();

  checkout.scan("Apple");
  checkout.scan("Egg");

  expect(checkout.total()).toBe(70);
});

it("totals 130 for three apples", () => {
  const checkout = new Checkout();

  checkout.scan("Apple");
  checkout.scan("Apple");
  checkout.scan("Apple");

  expect(checkout.total()).toBe(130);
});

it("totals 30 for one carrot", () => {
  const checkout = new Checkout();

  checkout.scan("Carrot");

  expect(checkout.total()).toBe(30);
});

it("totals 45 for two carrots", () => {
  const checkout = new Checkout();

  checkout.scan("Carrot");
  checkout.scan("Carrot");

  expect(checkout.total()).toBe(45);
});

it("totals 40 for two eggs", () => {
  const checkout = new Checkout();

  checkout.scan("Egg");
  checkout.scan("Egg");

  expect(checkout.total()).toBe(40);
});

it("totals 40 for two eggs", () => {
  const checkout = new Checkout();

  checkout.scan("Egg");
  checkout.scan("Egg");

  expect(checkout.total()).toBe(40);
});

it("totals 15 for two Yoghourt", () => {
  const checkout = new Checkout();

  checkout.scan("Yoghourt");
  checkout.scan("Yoghourt");

  expect(checkout.total()).toBe(30);
});

// caisse vide 6 -> 0
// un item pomme 6 -> 50
// deux item pomme -> 100
// 1 oeuf -> 20
// 2 oeufs -> 40
// 1 pommme + 1 oeuf -> 30
// 3 pommes -> 130
//
//
