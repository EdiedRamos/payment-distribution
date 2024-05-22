import { Debt } from "@/models";
import { createContext } from "react";

interface DebtManagment {
  showAddModal: boolean;
  handleShow: () => void;
  handleHide: () => void;
  debts: Debt[];
  // addDebt: (debt: Debt) => void;
  addDebt: () => void;
}

export const DebtContext = createContext<DebtManagment | null>(null);
