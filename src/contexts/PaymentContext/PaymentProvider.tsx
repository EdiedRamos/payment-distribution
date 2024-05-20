import { Debt, DistributionContent, DistributionType, Payment } from "@/models";
import {
  generateInterval,
  generateTitle,
  isInterval,
  isPayment,
} from "@/utils";
import { useEffect, useState } from "react";

import { PaymentContext } from "./PaymentContext";

interface PaymentProviderProps {
  children: React.ReactNode;
  debt: Debt;
}

export const PaymentProvider = ({ children, debt }: PaymentProviderProps) => {
  const [distributionContent, setDistributionContent] =
    useState<DistributionContent>([]);

  const addPay = (intervalId: string) => {
    const intervalIndex = distributionContent.findIndex(
      (distribution) => distribution.id === intervalId
    );

    if (intervalIndex < 1 || !isInterval(distributionContent[intervalIndex])) {
      return;
    }

    if (isPayment(distributionContent[intervalIndex - 1])) {
      setDistributionContent((prevDistribution) => {
        const leftPart = prevDistribution.slice(0, intervalIndex - 1);
        const rightPart = prevDistribution.slice(intervalIndex + 1);

        const leftPay = distributionContent[intervalIndex - 1] as Payment;

        const percentage = leftPay.information.percentage / 2;
        const quantity = leftPay.information.quantity / 2;

        const newPay: Payment = {
          id: crypto.randomUUID(),
          type: DistributionType.Payment,
          information: {
            currency: debt.currency,
            quantity,
            percentage,
            dateToPay: "22 Ene, 2022",
            title: generateTitle(prevDistribution),
          },
        };

        return [
          ...leftPart,
          {
            ...leftPay,
            information: { ...leftPay.information, percentage, quantity },
          },
          distributionContent[intervalIndex],
          newPay,
          generateInterval(),
          ...rightPart,
        ];
      });
    }
  };

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
      generateInterval(),
    ]);
  }, []);

  const values = {
    debt,
    distributionContent,
    addPay,
  };

  return (
    <PaymentContext.Provider value={values}>{children}</PaymentContext.Provider>
  );
};
