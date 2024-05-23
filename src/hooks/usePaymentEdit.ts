import { useEffect, useState, type ChangeEvent } from "react";
import type { Payment } from "@/models";
import { usePayment } from "@/contexts";
import { isDateGreaterOrEqual } from "@/utils";

interface UsePaymentEditProps {
  payment: Payment;
}

interface Validation {
  message: string;
  hasError: boolean;
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

  const [validation, setValidation] = useState<Validation>({
    message: "",
    hasError: false,
  });

  const handleChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.trim().length === 0) {
      setValidation({
        message: "El título no puede estar vacío",
        hasError: true,
      });
      return;
    }
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
      setValidation({
        message: "La fecha no puede ser menor a hoy",
        hasError: true,
      });
      return;
    }
    editEndDate(payment.id, event.target.value);
  };

  useEffect(() => {
    let timeoutId = setTimeout(
      () => setValidation({ message: "", hasError: false }),
      2000
    );
    return () => clearTimeout(timeoutId);
  }, [validation]);

  return {
    validation,
    handleChangeTitle,
    handleIncrement,
    handleDecrement,
    handleChangeDate,
    cantChangePercentage,
  };
};
