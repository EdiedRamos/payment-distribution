import { PaymentContext } from "./PaymentContext";

interface PaymentProviderProps {
  children: React.ReactNode;
}

export const PaymentProvider = ({ children }: PaymentProviderProps) => {
  return (
    <PaymentContext.Provider value={null}>{children}</PaymentContext.Provider>
  );
};
