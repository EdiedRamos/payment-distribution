import { PaymentContext } from "@/context/PaymentContext";
import { useContext } from "react";

export const usePayment = () => {
  const payment = useContext(PaymentContext);

  if (!payment) {
    throw new Error("usePayment must to be inside a payment context");
  }

  return payment;
};
