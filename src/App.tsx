import { Currency } from "@/models";
import { Payment } from "@/components";
import { PaymentProvider } from "@/contexts";
import { currencyInfo } from "@/constants";

const App = () => {
  return (
    <PaymentProvider totalPayment={182} currency={currencyInfo[Currency.USD]}>
      <Payment />
    </PaymentProvider>
  );
};

export default App;
