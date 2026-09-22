const MAX_NUMBER = 1000;

export function add(numbers: string): number {
  if (numbers === "") return 0;
  if (numbers.startsWith("//")) {
    let delimiter = numbers.charAt(2);
    let body = numbers.substring(4);
    if (numbers.charAt(2) === "[") {
      delimiter = numbers.substring(3, numbers.indexOf("]"));
      body = numbers.substring(numbers.indexOf("]") + 2);
    }
    if (numbers.charAt(2) === "[" && numbers.indexOf("][") !== -1) {
      const header = numbers.substring(2, numbers.indexOf("]\n") + 1);
      body = numbers.substring(numbers.indexOf("]\n") + 2);

      const declared = parseDelimeters(header);
      body = replaceDelimitersByComma(body, declared);
      delimiter = ",";
    }
    const parts = body.split(delimiter);
    return sum(parts);
  }

  const body = replaceDelimitersByComma(numbers, ["\n"]);
  const parts = body.split(",");
  return sum(parts);
}

function sum(parts: string[]): number {
  let total = 0;
  const negatives = [];
  for (const part of parts) {
    if (Number(part) < 0) {
      negatives.push(Number(part));
    }
    if (Number(part) <= MAX_NUMBER) {
      total += Number(part);
    }
  }
  if (negatives.length > 0) {
    throw new Error("negatives not allowed: " + negatives.join(", "));
  }
  return total;
}

function replaceDelimitersByComma(body: string, delimiters: string[]): string {
  for (const delimiter of delimiters) {
    body = body.split(delimiter).join(",");
  }
  return body;
}

function parseDelimeters(header: string): string[] {
  return header.substring(1, header.length - 1).split("][");
}
