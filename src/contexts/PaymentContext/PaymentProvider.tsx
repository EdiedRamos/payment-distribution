import {
  Debt,
  DistributionContent,
  DistributionType,
  PaymentModalInfo,
} from "@/models";
import {
  addPayment,
  changeEndDate,
  changePercentage,
  changeTitle,
} from "./PaymentHelpers";
import { generateInterval, paymentCounter } from "@/utils";
import { useEffect, useState } from "react";

import { PaymentContext } from "./PaymentContext";

interface PaymentProviderProps {
  children: React.ReactNode;
  debt: Debt;
}

export const PaymentProvider = ({ children, debt }: PaymentProviderProps) => {
  const [distributionContent, setDistributionContent] =
    useState<DistributionContent>([]);

  const [paymentModalInfo, setPaymentModalInfo] = useState<PaymentModalInfo>({
    showModal: false,
    paymentId: "",
  });
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleEdit = () => {
    setIsEditing((prev) => !prev);
  };

  const editTitle = (paymentId: string, newTitle: string): void => {
    setDistributionContent((prev) => changeTitle(prev, paymentId, newTitle));
  };

  const addPercentage = (paymentId: string) => {
    setDistributionContent((prev) =>
      changePercentage(debt, prev, paymentId, 1)
    );
  };

  const subtractPercentage = (paymentId: string) => {
    setDistributionContent((prev) =>
      changePercentage(debt, prev, paymentId, -1)
    );
  };

  const editEndDate = (paymentId: string, newDate: string) => {
    setDistributionContent((prev) => changeEndDate(prev, paymentId, newDate));
  };

  const addPay = (intervalId: string) => {
    setDistributionContent((prev) => addPayment(debt, prev, intervalId));
  };

  const handlePayTransactionStart = (paymentId: string) => {
    setPaymentModalInfo({
      showModal: true,
      paymentId,
    });
  };

  const handlePayTransactionEnd = () => {
    setPaymentModalInfo({
      showModal: false,
      paymentId: "",
    });
  };

  const handlePayTransactionConfirm = () => {
    console.log("PENDING: ", paymentModalInfo.paymentId);
    handlePayTransactionEnd();
  };

  useEffect(() => {
    setDistributionContent([
      {
        type: DistributionType.Payment,
        id: "91c760dc-0779-452a-aa8c-6b133c31ddb1",
        isPaid: false,
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
    handlePayTransactionStart,
    handlePayTransactionEnd,
    handlePayTransactionConfirm,
    paymentModalInfo,
    paymentsLength: paymentCounter(distributionContent),
  };

  return (
    <PaymentContext.Provider value={values}>{children}</PaymentContext.Provider>
  );
};
