import { Currency } from "@/enums";
import type { CurrencyInfo } from "@/interfaces";

type CurrencyInfoMap = Record<Currency, CurrencyInfo>;

export const currencyInfo: CurrencyInfoMap = {
  [Currency.USD]: {
    code: "USD",
  },
  [Currency.COP]: {
    code: "COP",
  },
};
