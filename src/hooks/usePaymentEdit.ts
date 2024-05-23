import { useState, type ChangeEvent } from "react";
import type { Payment } from "@/models";
import { usePayment } from "@/contexts";
import { isDateGreaterOrEqual } from "@/utils";

interface UsePaymentEditProps {
  payment: Payment;
}

export const usePaymentEdit = ({ payment }: UsePaymentEditProps) => {
  const {
    paymentsLength,
    editTitle,
    addPercentage,
    subtractPercentage,
    editEndDate,
  } = usePayment();

  const cantChangePercentage = paymentsLength < 2;

  const [error, setError] = useState<boolean>(false);

  const handleChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    editTitle(payment.id, event.target.value);
  };

  const handleIncrement = () => {
    addPercentage(payment.id);
  };

  const handleDecrement = () => {
    subtractPercentage(payment.id);
  };

  const handleChangeDate = (event: ChangeEvent<HTMLInputElement>) => {
    if (!isDateGreaterOrEqual(event.target.value)) {
      setError(true);
      return;
    }
    setError(false);
    editEndDate(payment.id, event.target.value);
  };

  return {
    error,
    handleChangeTitle,
    handleIncrement,
    handleDecrement,
    handleChangeDate,
    cantChangePercentage,
  };
};
