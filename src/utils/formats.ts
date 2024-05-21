import { MONTH_NAMES } from "@/constants";

export function withOneDecimal(value: number): number {
  return Math.round(value * 10) / 10;
}

export function toYearMonthDay(date: Date): string {
  return date.toISOString().split("T")[0];
}

export function toAbbreviateDate(date: Date): string {
  return `${date.getDate()} ${
    MONTH_NAMES.ABBREVIATE[date.getMonth()]
  } ${date.getFullYear()}`;
}

export function toLocaleDate(date: string): Date {
  const [year, month, day] = date.split("-").map(Number);
  const newDate = new Date(Date.UTC(year, month - 1, day));
  newDate.setMinutes(newDate.getMinutes() + newDate.getTimezoneOffset());
  return newDate;
}
