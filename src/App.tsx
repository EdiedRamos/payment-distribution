import { Currency } from "@/models";
import { Distribution } from "@/components";
import { PaymentProvider } from "@/contexts";
import { currencyInfo } from "@/constants";

const App = () => {
  return (
    <PaymentProvider totalPayment={182} currency={currencyInfo[Currency.USD]}>
      <Distribution />
    </PaymentProvider>
  );
};

export default App;
