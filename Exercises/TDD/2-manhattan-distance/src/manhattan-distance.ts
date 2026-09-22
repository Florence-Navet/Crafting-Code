export function distance(a: [number, number], b: [number, number]): number  {

  // if (b[1] === 1) return 1;
  // return 0;
  return Math.abs(b[0] - a[0]) + Math.abs(b[1] - a[1]);
}
