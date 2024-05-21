import { Payment } from "@/models";
import { withOneDecimal } from "@/utils";

interface PaymentInfoProps {
  payment: Payment;
}

export const PaymentInfo = ({ payment }: PaymentInfoProps) => {
  return (
    <div className="relative flex flex-col items-center text-center">
      <button className="w-[50px] h-[50px] bg-orange-500 rounded-[50%]"></button>
      <div className="absolute border-2 rounded-md p-2 min-w-[150px] top-14">
        <p className="font-bold">{payment.information.title}</p>
        <p className="text-sm">
          {withOneDecimal(payment.information.quantity)}{" "}
          {payment.information.currency.code} ({payment.information.percentage}
          %)
        </p>
        <p className="text-sm">
          {payment.information.dateToPay.toLocaleString()}
        </p>
      </div>
    </div>
  );
};
