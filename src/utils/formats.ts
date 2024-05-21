export function withOneDecimal(value: number): number {
  return Math.round(value * 10) / 10;
}

export function toYearMonthDay(date: Date): string {
  return date.toISOString().split("T")[0];
}
