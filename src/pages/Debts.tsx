import { useAppNavigate } from "@/hooks";
import { useDebt } from "@/contexts";

export const Debts = () => {
  const { goToPayment } = useAppNavigate();
  const { debts } = useDebt();

  return (
    <div className="container mx-auto flex justify-center flex-wrap gap-5 mt-5">
      {debts.map((debt, index) => (
        <div
          onClick={() => goToPayment(debt.id)}
          key={debt.id}
          className={`${
            debt.isPaid
              ? "bg-green-500"
              : debt.paid > 0
              ? "bg-orange-500"
              : "bg-slate-500"
          } flex flex-col p-2 gap-2 text-white rounded-xl shadow-lg hover:cursor-pointer hover:opacity-90 w-[95%] sm:w-[350px]`}
        >
          <p>Deuda: {index + 1}</p>
          <p>
            {debt.paid}/{debt.quantity} {debt.currency.code}
          </p>
        </div>
      ))}
    </div>
  );
};
