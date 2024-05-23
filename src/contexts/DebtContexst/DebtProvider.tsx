import React, { useEffect, useState } from "react";

import { Debt } from "@/models";
import { DebtContext } from "./DebtContext";
import { debtService } from "@/services";

interface DebtProvider {
  children: React.ReactNode;
}

export const DebtProvider = ({ children }: DebtProvider) => {
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [debts, setDebts] = useState<Debt[]>([]);

  const addDebt = (debt: Debt) => {
    // TODO: Make a POST request for adding a new debt
    debtService.addDebt(debt);
    setDebts((prev) => [...prev, debt]);
    setShowAddModal(false);
  };

  const handleShow = () => setShowAddModal(true);
  const handleHide = () => setShowAddModal(false);

  useEffect(() => {
    // TODO: Make a GET request for getting all the debts
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
