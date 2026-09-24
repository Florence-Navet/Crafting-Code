import { IItem } from "./item";

export abstract class Item implements IItem {
  constructor(
    protected name: string,
    protected price: number
  ) {}

  getName(): string {
    return this.name;
  }

  abstract getPrice(quantity: number): number;
}