import { MONTH_NAMES } from "@/constants";

export function withOneDecimal(value: number): number {
  return Math.round(value * 10) / 10;
}

export function toYearMonthDay(date: Date): string {
  return date.toISOString().split("T")[0];
}

export function toAbbreviateDate(date: Date): string {
  return `${date.getDay()} ${
    MONTH_NAMES.ABBREVIATE[date.getMonth()]
  } ${date.getFullYear()}`;
}
