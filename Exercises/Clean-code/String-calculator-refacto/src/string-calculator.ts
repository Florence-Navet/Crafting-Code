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
      const headers = numbers.substring(2, numbers.indexOf(']\n') + 1);
      body = numbers.substring(numbers.indexOf(']\n') + 2);
      const declared = headers.substring(1, headers.length - 1).split('][');
      for (const one of declared) {
        body = body.split(one).join(',');
      }
      delimiter = ',';
    }
    const parts = body.split(delimiter);
    let total = 0;
    const negatives = [];
    for (const part of parts) {
      if (Number(part) < 0) {
        negatives.push(Number(part));
      }
      if (Number(part) <= 1000) {
        total += Number(part);
      }
    }
    if (negatives.length > 0) {
      throw new Error('negatives not allowed: ' + negatives.join(', '));
    }
    return total;
  }
  if (numbers.includes(',') || numbers.includes('\n')) {
    const parts = numbers.split(',');
    let total = 0;
    const negatives = [];
    for (const part of parts) {
      const subParts = part.split('\n');
      for (const subPart of subParts) {
        if (Number(subPart) < 0) {
          negatives.push(Number(subPart));
        }
        if (Number(subPart) <= 1000) {
          total += Number(subPart);
        }
      }
    }
    if (negatives.length > 0) {
      throw new Error('negatives not allowed: ' + negatives.join(', '));
    }
    return total;
  }
  return Number(numbers);
}
