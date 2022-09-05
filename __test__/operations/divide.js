export function divide(a, b) {
  if (b === 0) throw Error("Can not divide by 0");
  return a / b;
}
