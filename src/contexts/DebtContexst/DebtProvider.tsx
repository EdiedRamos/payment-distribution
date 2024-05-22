import { Currency, Debt } from "@/models";
import React, { useEffect, useState } from "react";

import { DebtContext } from "./DebtContext";
import { currencyInfo } from "@/constants";
import { debtService } from "@/services";

interface DebtProvider {
  children: React.ReactNode;
}

export const DebtProvider = ({ children }: DebtProvider) => {
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [debts, setDebts] = useState<Debt[]>([]);

  // const addDebt = (debt: Debt) => {
  const addDebt = () => {
    const debt = {
      id: crypto.randomUUID(),
      currency: currencyInfo[Currency.USD],
      quantity: 182,
      paid: 0,
      isPaid: false,
    };
    // debtService.addDebt(debt);
    setDebts((prev) => [...prev, debt]);
    setShowAddModal(false);
  };

  const handleShow = () => setShowAddModal(true);
  const handleHide = () => setShowAddModal(false);

  useEffect(() => {
    setDebts(debtService.getAllDebts());
  }, []);

  const values = {
    showAddModal,
    debts,
    handleShow,
    handleHide,
    addDebt,
  };

  return <DebtContext.Provider value={values}>{children}</DebtContext.Provider>;
};
