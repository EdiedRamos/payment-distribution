import { Debt, DistributionContent, DistributionType, Payment } from "@/models";
import {
  generateInterval,
  generateTitle,
  isInterval,
  isPayment,
  paymentCounter,
} from "@/utils";
import { useEffect, useState } from "react";

import { PaymentContext } from "./PaymentContext";
import { changeTitle } from "./PaymentHelpers";

interface PaymentProviderProps {
  children: React.ReactNode;
  debt: Debt;
}

export const PaymentProvider = ({ children, debt }: PaymentProviderProps) => {
  const [distributionContent, setDistributionContent] =
    useState<DistributionContent>([]);

  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleEdit = () => {
    setIsEditing((prev) => !prev);
  };

  const editTitle = (paymentId: string, newTitle: string): void => {
    setDistributionContent((prev) => changeTitle(prev, paymentId, newTitle));
  };

  const addPercentage = (paymentId: string) => {
    alert(`INCREMENT ${paymentId}`);
  };

  const subtractPercentage = (paymentId: string) => {
    alert(`SUBTRACT ${paymentId}`);
  };

  const editEndDate = (paymentId: string, newDate: string) => {
    alert(`ENDDATE ${paymentId}`);
  };

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
            dateToPay: new Date(),
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
          dateToPay: new Date(),
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
    isEditing,
    handleEdit,
    editTitle,
    addPercentage,
    subtractPercentage,
    editEndDate,
    paymentsLength: paymentCounter(distributionContent),
  };

  return (
    <PaymentContext.Provider value={values}>{children}</PaymentContext.Provider>
  );
};
