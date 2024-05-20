import { FaPen } from "react-icons/fa";
import { FaRegSave } from "react-icons/fa";
import { RiArrowDownWideLine } from "react-icons/ri";
import { usePayment } from "@/contexts";
import { useState } from "react";

export const Control = () => {
  const payment = usePayment();

  const [isUpdating, setIsUpdating] = useState(false);

  return (
    <div className="flex flex-wrap justify-between border-b-2 p-5 mb-5">
      <button className="flex text-orange-500 items-center gap-2">
        Pagos
        <RiArrowDownWideLine />
      </button>
      <div className="flex items-center flex-wrap gap-5">
        {isUpdating ? (
          <button
            className="flex items-center gap-2 bg-orange-500 text-white rounded-md p-2"
            onClick={() => setIsUpdating(false)}
          >
            Guardar <FaRegSave />
          </button>
        ) : (
          <button
            onClick={() => setIsUpdating(true)}
            className="flex items-center gap-2 text-orange-500 p-2"
          >
            Editar <FaPen />
          </button>
        )}

        <p>
          <span>Por cobrar</span>{" "}
          <span className="font-bold">
            {payment.totalPayment} {payment.currency.code}
          </span>
        </p>
      </div>
    </div>
  );
};
