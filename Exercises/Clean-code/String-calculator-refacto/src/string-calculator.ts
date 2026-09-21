export function add(numbers: string): number {
  if (numbers === '') return 0;
  if (numbers.startsWith('//')) {
    let delimiter = numbers.charAt(2);
    let body = numbers.substring(4);
    if (numbers.charAt(2) === '[') {
      delimiter = numbers.substring(3, numbers.indexOf(']'));
      body = numbers.substring(numbers.indexOf(']') + 2);
    }
    if (numbers.charAt(2) === '[' && numbers.indexOf('][') !== -1) {
      const h = numbers.substring(2, numbers.indexOf(']\n') + 1);
      body = numbers.substring(numbers.indexOf(']\n') + 2);
      const declared = h.substring(1, h.length - 1).split('][');
      for (const one of declared) {
        body = body.split(one).join(',');
      }
      delimiter = ',';
    }
    const parts = body.split(delimiter);
    let total = 0;
    for (const part of parts) {
      total += Number(part);
    }
    return total;
  }
  if (numbers.includes(',') || numbers.includes('\n')) {
    const pList = numbers.split(',');
    let t = 0;
    const negatives = [];
    for (const p of pList) {
      const subParts = p.split('\n');
      for (const subPart of subParts) {
        if (Number(subPart) < 0) {
          negatives.push(Number(subPart));
        }
        if (Number(subPart) <= 1000) {
          t += Number(subPart);
        }
      }
    }
    if (negatives.length > 0) {
      throw new Error('negatives not allowed: ' + negatives.join(', '));
    }
    return t;
  }
  return Number(numbers);
}
