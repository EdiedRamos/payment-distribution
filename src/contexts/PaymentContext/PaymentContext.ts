import type { Debt, DistributionContent } from "@/models";

import { createContext } from "react";

interface PaymentManagment {
  debt: Debt;
  distributionContent: DistributionContent;
  addPay: (intervalId: string) => void;
  isEditing: boolean;
  handleEdit: () => void;
  paymentsLength: number;
}

export const PaymentContext = createContext<PaymentManagment | null>(null);
