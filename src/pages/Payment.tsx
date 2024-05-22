import { DEBT_MOCK } from "@/constants";
import { PaymentAdmin } from "@/components";
import { PaymentProvider } from "@/contexts";

export const Payment = () => {
  return (
    <PaymentProvider debt={DEBT_MOCK}>
      <PaymentAdmin />
    </PaymentProvider>
  );
};
