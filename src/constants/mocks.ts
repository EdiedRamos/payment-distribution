import { Currency, Debt } from "@/models";

import { currencyInfo } from "./currencyInfo";

export const DEBT_MOCK: Debt = {
  id: "0c955323-ddb2-4e6a-a78d-646825fcfdfa",
  currency: currencyInfo[Currency.USD],
  quantity: 182,
  paid: 0,
  isPaid: false,
};
