export interface IItem {
  getName(): string;
  getPrice(quantity: number): number;
}