import { PaymentEdit, PaymentInfo } from "@/components";

import type { Payment } from "@/models";
import { usePayment } from "@/contexts";

interface PaymentManagerProps {
  payment: Payment;
}

export const PaymentManager = ({ payment }: PaymentManagerProps) => {
  const { isEditing } = usePayment();
  return isEditing ? (
    <PaymentEdit payment={payment} />
  ) : (
    <PaymentInfo payment={payment} />
  );
};
