import { DEBT_MOCK } from "@/constants";
import { Payment } from "@/components";
import { PaymentProvider } from "@/contexts";

const App = () => {
  return (
    <PaymentProvider debt={DEBT_MOCK}>
      <Payment />
    </PaymentProvider>
  );
};

export default App;
