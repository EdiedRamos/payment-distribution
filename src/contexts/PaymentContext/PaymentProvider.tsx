import { Debt, DistributionContent, DistributionType } from "@/models";
import { useEffect, useState } from "react";

import { Distribution } from "@/components";
import { PaymentContext } from "./PaymentContext";

interface PaymentProviderProps {
  children: React.ReactNode;
  debt: Debt;
}

export const PaymentProvider = ({ children, debt }: PaymentProviderProps) => {
  const [distributionContent, setDistributionContent] =
    useState<DistributionContent>([]);

  useEffect(() => {
    setDistributionContent([
      {
        type: DistributionType.Payment,
        id: "91c760dc-0779-452a-aa8c-6b133c31ddb1",
        information: {
          currency: debt.currency,
          quantity: debt.quantity,
          percentage: 100,
          dateToPay: "22 Ene, 2022",
          title: "Anticipo",
        },
      },
      {
        id: "11c760dc-0779-452a-aa8c-6b144c31ddb1",
        type: DistributionType.Interval,
      },
    ]);
  }, []);

  const values = {
    debt,
    distributionContent,
  };

  return (
    <PaymentContext.Provider value={values}>{children}</PaymentContext.Provider>
  );
};
