import { PaymentAdmin } from "@/components";
import { PaymentProvider } from "@/contexts";

export const Payment = () => {
  return (
    <PaymentProvider>
      <PaymentAdmin />
    </PaymentProvider>
  );
};
