import type { CurrencyInfo } from "@/models";
import { createContext } from "react";

interface PaymentManagment {
  totalPayment: number;
  currency: CurrencyInfo;
}

export const PaymentContext = createContext<PaymentManagment | null>(null);
