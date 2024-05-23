import {
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
import {
  buildPayment,
  generateInterval,
  getNextToPayId,
  paymentCounter,
  toAbbreviateDate,
} from "@/utils";
import { debtService, distributionService } from "@/services";
import { useEffect, useState } from "react";

import { PaymentContext } from "./PaymentContext";
import { useParams } from "react-router";

interface PaymentProviderProps {
  children: React.ReactNode;
}

export const PaymentProvider = ({ children }: PaymentProviderProps) => {
  const { paymentId } = useParams<{ paymentId: string }>();
  const debt = debtService.getDebtById(paymentId ?? "");

  if (!debt) {
    return <div>not found</div>;
  }

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
    setDistributionContent((prev) => {
      const content = changeEndDate(prev, paymentId, newDate);
      distributionService.updateDistributionContent(debt.id, content);
      return content;
    });
  };

  const addPay = (intervalId: string) => {
    setDistributionContent((prev) => {
      const content = addPayment(debt, prev, intervalId);
      distributionService.updateDistributionContent(debt.id, content);
      return content;
    });
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
    const content = distributionService.getDistributionContentByDebtId(debt.id);
    if (!content) {
      const distribution: DistributionContent = [
        buildPayment(debt),
        generateInterval(),
      ];
      setDistributionContent(distribution);
      distributionService.updateDistributionContent(debt.id, distribution);
    } else {
      setDistributionContent(content);
    }
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
