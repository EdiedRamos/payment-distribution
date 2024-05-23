import { toAbbreviateDate, withOneDecimal } from "@/utils";

import { GiTakeMyMoney } from "react-icons/gi";
import { LuPartyPopper } from "react-icons/lu";
import { Payment } from "@/models";
import { usePayment } from "@/contexts";

interface PaymentInfoProps {
  payment: Payment;
}

export const PaymentInfo = ({ payment }: PaymentInfoProps) => {
  const { handlePayTransactionStart, nextToPayId } = usePayment();

  return (
    <div className="relative flex flex-col items-center text-center font-medium">
      <button
        disabled={nextToPayId !== payment.id}
        onClick={() => handlePayTransactionStart(payment.id)}
        className={`w-[50px] h-[50px] ${
          payment.isPaid
            ? "bg-green-500"
            : payment.id !== nextToPayId
            ? "bg-gray-200"
            : "bg-orange-500"
        }  rounded-[50%]`}
      >
        {payment.isPaid && <LuPartyPopper className="w-full h-6 text-white" />}
        {payment.id === nextToPayId && (
          <GiTakeMyMoney className="w-full h-6 text-white" />
        )}
      </button>
      <div className="absolute bg-gray-100 border-2 rounded-md p-2 min-w-[150px] top-14">
        <p className="font-bold">{payment.information.title}</p>
        <p className="text-sm">
          {withOneDecimal(payment.information.quantity)}{" "}
          {payment.information.currency.code} ({payment.information.percentage}
          %)
        </p>
        {payment.isPaid && payment.transaction ? (
          <p className="bg-green-500 rounded-md p-1 text-white text-sm mt-1">
            Pagado {toAbbreviateDate(payment.transaction.date)} con{" "}
            {payment?.transaction?.method}
          </p>
        ) : (
          <p className="text-sm">
            {toAbbreviateDate(payment.information.dateToPay)}
          </p>
        )}
      </div>
    </div>
  );
};
