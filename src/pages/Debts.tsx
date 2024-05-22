import { Currency, Debt } from "@/models";

import { currencyInfo } from "@/constants";
import { useAppNavigate } from "@/hooks/useAppNavigate";

const DEBTS_MOCK: Debt[] = [
  {
    id: "0c955323-ddb2-4e6a-a78d-646825fcfdfa",
    currency: currencyInfo[Currency.USD],
    quantity: 182,
    remaining: 0,
  },
  {
    id: "1c955323-ddb2-4e6a-a78d-646825fcfdfa",
    currency: currencyInfo[Currency.COP],
    quantity: 1250000,
    remaining: 1250000,
  },
  {
    id: "2c955323-ddb2-4e6a-a78d-646825fcfdfa",
    currency: currencyInfo[Currency.USD],
    quantity: 500,
    remaining: 500,
  },
  {
    id: "3c955323-ddb2-4e6a-a78d-646825fcfdfa",
    currency: currencyInfo[Currency.USD],
    quantity: 100,
    remaining: 100,
  },
];

export const Debts = () => {
  const { goToPayment } = useAppNavigate();

  return (
    <div className="container mx-auto flex justify-center flex-wrap gap-5 mt-5">
      {DEBTS_MOCK.map((debt, index) => (
        <div
          onClick={() => goToPayment(debt.id)}
          key={debt.id}
          className="bg-red-500 flex flex-col p-2 gap-2 text-white rounded-xl shadow-lg hover:cursor-pointer hover:opacity-90 w-[95%] sm:w-[350px]"
        >
          <p>Deuda: {index + 1}</p>
          <p>
            {debt.remaining}/{debt.quantity} {debt.currency.code}
          </p>
        </div>
      ))}
    </div>
  );
};
