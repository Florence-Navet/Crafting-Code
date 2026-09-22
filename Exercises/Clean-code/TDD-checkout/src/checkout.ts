export class Checkout {
//   private scanned = false
private count = 0

  scan(name: string) {
    // this.scanned = true
    this.count++;
  }

  total() {
    // if (this.scanned) return 50
    return this.count * 50;
  }
}