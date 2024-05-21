import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";

import { Payment } from "@/models";
import { usePaymentEdit } from "@/hooks";

interface PaymentInfoProps {
  payment: Payment;
}

export const PaymentEdit = ({ payment }: PaymentInfoProps) => {
  const {
    handleChangeTitle,
    cantChangePercentage,
    handleDecrement,
    handleIncrement,
    handleChangeDate,
  } = usePaymentEdit({ payment });

  return (
    <div className="relative flex flex-col items-center text-center">
      <div className="w-[50px] h-[50px] bg-blue-500 rounded-[50%]"></div>
      <div className="absolute bg-white border-2 rounded-md p-2 min-w-[150px] top-14">
        <form className="w-[150px]">
          <input
            className="border-2 p-1 rounded-md w-full font-bold"
            type="text"
            onChange={handleChangeTitle}
            value={payment.information.title}
            placeholder="Título"
          />
          <div className="flex justify-between border-2 rounded-md mt-1 p-1">
            <p className="font-bold">{payment.information.quantity}</p>
            <p className="font-bold text-gray-400">
              {payment.information.currency.code}
            </p>
          </div>
          <div className="flex mt-2 gap-4 justify-center items-center">
            <button
              disabled={cantChangePercentage}
              onClick={handleDecrement}
              type="button"
              className="w-[30px] h-[30px] text-orange-400"
            >
              <CiCircleMinus className="w-full h-full" />
            </button>
            <p className="font-medium">{payment.information.percentage}%</p>
            <button
              disabled={cantChangePercentage}
              onClick={handleIncrement}
              type="button"
              className="w-[30px] h-[30px] text-orange-400"
            >
              <CiCirclePlus className="w-full h-full" />
            </button>
          </div>
          <div>
            <p className="font-medium text-gray-500">Vence</p>
            <input
              onChange={handleChangeDate}
              className="bg-inherit focus:outline-none focus:ring-2 focus:ring-orange-400 focus:rounded-sm p-1"
              type="date"
            />
          </div>
        </form>
      </div>
    </div>
  );
};
