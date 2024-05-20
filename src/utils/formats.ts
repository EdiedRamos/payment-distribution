export function withOneDecimal(value: number): number {
  return Math.round(value * 10) / 10;
}
