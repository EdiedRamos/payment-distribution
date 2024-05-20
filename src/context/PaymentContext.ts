import type { CurrencyInfo } from "@/interfaces";
import { createContext } from "react";

interface PaymentManagment {
  totalPayment: number;
  currency: CurrencyInfo;
}

export const PaymentContext = createContext<PaymentManagment | null>(null);
