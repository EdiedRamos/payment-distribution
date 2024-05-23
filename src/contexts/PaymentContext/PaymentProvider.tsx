import {
  Debt,
  DistributionContent,
  DistributionType,
  PaymentMethod,
  PaymentModalInfo,
} from "@/models";
import {
  addPayment,
  changeEndDate,
  changePercentage,
  changeTitle,
  setPayment,
} from "./PaymentHelpers";
import { generateInterval, getNextToPayId, paymentCounter } from "@/utils";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router";

import { DEBT_MOCK } from "@/constants";
import { PaymentContext } from "./PaymentContext";

interface PaymentProviderProps {
  children: React.ReactNode;
}

export const PaymentProvider = ({ children }: PaymentProviderProps) => {
  const debt = DEBT_MOCK;

  const { paymentId } = useParams<{ paymentId: string }>();

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

  const handlePayTransactionConfirm = (paymentMethod: PaymentMethod) => {
    setDistributionContent((prev) =>
      setPayment(prev, paymentModalInfo.paymentId, paymentMethod)
    );
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
    nextToPayId: getNextToPayId(distributionContent),
  };

  return (
    <PaymentContext.Provider value={values}>{children}</PaymentContext.Provider>
  );
};
