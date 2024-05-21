import type { ChangeEvent } from "react";
import type { Payment } from "@/models";
import { usePayment } from "@/contexts";

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
    editEndDate(payment.id, event.target.value);
  };

  return {
    handleChangeTitle,
    handleIncrement,
    handleDecrement,
    handleChangeDate,
    cantChangePercentage,
  };
};
