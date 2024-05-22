import type { Debt, DistributionContent } from "@/models";

import { createContext } from "react";

interface PaymentManagment {
  debt: Debt;
  distributionContent: DistributionContent;
  isEditing: boolean;
  paymentsLength: number;
  addPay: (intervalId: string) => void;
  handleEdit: () => void;
  editTitle: (paymentId: string, newTitle: string) => void;
  addPercentage: (paymentId: string) => void;
  subtractPercentage: (paymentId: string) => void;
  editEndDate: (paymentId: string, newDate: string) => void;
  handlePay: (paymentId: string) => void;
  showPaymentModal: boolean;
}

export const PaymentContext = createContext<PaymentManagment | null>(null);
