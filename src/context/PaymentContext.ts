import type { CurrencyInfo, DistributionContent } from "@/models";

import { createContext } from "react";

interface PaymentManagment {
  totalPayment: number;
  currency: CurrencyInfo;
  distributionContent: DistributionContent;
}

export const PaymentContext = createContext<PaymentManagment | null>(null);
