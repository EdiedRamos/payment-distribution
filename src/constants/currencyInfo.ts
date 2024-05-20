import { Currency } from "@/enums";
import type { CurrencyInfo } from "@/interfaces";

type currencyInfo = Record<Currency, CurrencyInfo>;

export const currencyInfo: currencyInfo = {
  [Currency.USD]: {
    code: "USD",
  },
  [Currency.COP]: {
    code: "COP",
  },
};
