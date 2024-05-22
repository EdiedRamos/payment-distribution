import { toAbbreviateDate, withOneDecimal } from "@/utils";

import { Payment } from "@/models";
import { usePayment } from "@/contexts";

interface PaymentInfoProps {
  payment: Payment;
}

export const PaymentInfo = ({ payment }: PaymentInfoProps) => {
  const { handlePayTransaction } = usePayment();

  return (
    <div className="relative flex flex-col items-center text-center">
      <button
        onClick={() => handlePayTransaction(payment.id)}
        className="w-[50px] h-[50px] bg-orange-500 rounded-[50%]"
      ></button>
      <div className="absolute border-2 rounded-md p-2 min-w-[150px] top-14">
        <p className="font-bold">{payment.information.title}</p>
        <p className="text-sm">
          {withOneDecimal(payment.information.quantity)}{" "}
          {payment.information.currency.code} ({payment.information.percentage}
          %)
        </p>
        <p className="text-sm">
          {toAbbreviateDate(payment.information.dateToPay)}
        </p>
      </div>
    </div>
  );
};
