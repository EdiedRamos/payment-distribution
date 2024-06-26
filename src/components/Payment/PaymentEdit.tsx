import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";

import { Payment } from "@/models";
import { toYearMonthDay } from "@/utils";
import { usePaymentEdit } from "@/hooks";

interface PaymentInfoProps {
  payment: Payment;
}

export const PaymentEdit = ({ payment }: PaymentInfoProps) => {
  const {
    validation,
    handleChangeTitle,
    cantChangePercentage,
    handleDecrement,
    handleIncrement,
    handleChangeDate,
  } = usePaymentEdit({ payment });

  return (
    <div className="relative flex flex-col items-center text-center">
      <div
        className={`${
          payment.isPaid ? "bg-green-500" : "bg-blue-500"
        } w-[50px] h-[50px] rounded-[50%]`}
      ></div>
      <div
        className={`${
          validation.hasError ? "border-red-500" : ""
        } absolute bg-white border-2 rounded-md p-2 min-w-[150px] top-14`}
      >
        <form className="w-[150px]">
          <input
            disabled={payment.isPaid}
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
          {!payment.isPaid && (
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
          )}
          {!payment.isPaid && (
            <div>
              <p className="font-medium text-gray-500">Vence</p>
              <input
                disabled={payment.isPaid}
                onChange={handleChangeDate}
                value={toYearMonthDay(payment.information.dateToPay)}
                className="bg-inherit focus:outline-none focus:ring-2 focus:ring-orange-400 focus:rounded-sm p-1"
                type="date"
              />
            </div>
          )}
        </form>
        {validation.hasError && (
          <p className="text-red-500 font-medium">{validation.message}</p>
        )}
      </div>
    </div>
  );
};
