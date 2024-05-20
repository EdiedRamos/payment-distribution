import { Currency, type CurrencyInfo } from "@/models";

type CurrencyInfoMap = Record<Currency, CurrencyInfo>;

export const currencyInfo: CurrencyInfoMap = {
  [Currency.USD]: {
    code: "USD",
  },
  [Currency.COP]: {
    code: "COP",
  },
};
