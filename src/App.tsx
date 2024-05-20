import { DEBT_MOCK } from "@/constants";
import { PaymentAdmin } from "@/components";
import { PaymentProvider } from "@/contexts";

const App = () => {
  return (
    <PaymentProvider debt={DEBT_MOCK}>
      <PaymentAdmin />
    </PaymentProvider>
  );
};

export default App;
