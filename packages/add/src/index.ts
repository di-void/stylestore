import { times } from "./utils";

export function addTimes(a: number, b: number) {
  const sum = a + b;
  return sum + times(a, b);
}
