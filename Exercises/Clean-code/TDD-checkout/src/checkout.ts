export class Checkout {
  //   private scanned = false
  private amount = 0;
  private appleCount = 0;
  private carrotCount = 0;

  private applyApplePromotion() {
    if (this.appleCount === 3) {
      this.amount -= 20;
    }
  }

  private applyCarrotPromotion() {
    if (this.carrotCount === 2) {
      this.amount -= 15;
    }
  }

  scan(name: string) {
    if (name === "Egg") {
      this.amount += 20;
      return;
    }
    if (name === "Yoghourt") {
      this.amount += 15;
      return;
    }
    if (name === "Carrot") {
      this.carrotCount++;
      this.amount += 30;
      this.applyCarrotPromotion();
      return;
    }
    if (name === "Apple") {
      this.appleCount++;
      this.amount += 50;
      this.applyApplePromotion();
      return;
    }

    // this.scanned = true
  }

  total() {
    // if (this.scanned) return 50
    // return this.count * 50;
    return this.amount;
  }
}
