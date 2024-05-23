import { FaPlus } from "react-icons/fa";
import { Interval } from "@/models";
import { usePayment } from "@/contexts";

interface AddPaymenetProps {
  interval: Interval;
}

export const AddPayment = ({ interval }: AddPaymenetProps) => {
  const payment = usePayment();

  return (
    <button
      disabled={payment.isEditing}
      className={`${
        payment.isEditing ? "invisible" : ""
      } relative flex justify-center items-center w-[25px] h-[25px] bg-gray-200 rounded-[50%]`}
      onClick={() => payment.addPay(interval.id)}
    >
      <FaPlus size={12} className="text-orange-500" />
    </button>
  );
};
