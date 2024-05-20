import { Debt, DistributionContent } from "@/models";

import { PaymentContext } from "./PaymentContext";
import { useState } from "react";

interface PaymentProviderProps {
  children: React.ReactNode;
  debt: Debt;
}

export const PaymentProvider = ({ children, debt }: PaymentProviderProps) => {
  const [distributionContent, setDistributionContent] =
    useState<DistributionContent>([]);

  const values = {
    debt,
    distributionContent,
  };

  return (
    <PaymentContext.Provider value={values}>{children}</PaymentContext.Provider>
  );
};
