import { PaymentMethod, type PaymentMethodInfo } from "@/models";

type PaymentMethodInfoMap = Record<PaymentMethod, PaymentMethodInfo>;

export const paymentMethodInfo: PaymentMethodInfoMap = {
  [PaymentMethod.CARD]: {
    label: "Tarjeta",
  },
  [PaymentMethod.CASH]: {
    label: "Efectivo",
  },
};
