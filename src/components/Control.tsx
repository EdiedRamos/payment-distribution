import { FaPen } from "react-icons/fa";
import { FaRegSave } from "react-icons/fa";
import { RiArrowDownWideLine } from "react-icons/ri";
import { usePayment } from "@/contexts";
import { withOneDecimal } from "@/utils";

export const Control = () => {
  const payment = usePayment();

  const debtRemaining = withOneDecimal(
    payment.debt.quantity - payment.debt.paid
  );

  return (
    <div className="flex flex-wrap justify-between border-b-2 p-5 mb-5">
      <button className="flex text-orange-500 items-center gap-2">
        Pagos
        <RiArrowDownWideLine />
      </button>
      <div className="flex items-center flex-wrap gap-5">
        {payment.isEditing ? (
          <button
            className="flex items-center gap-2 bg-orange-500 text-white rounded-md p-2"
            onClick={payment.handleEdit}
          >
            Guardar <FaRegSave />
          </button>
        ) : (
          <button
            onClick={payment.handleEdit}
            className="flex items-center gap-2 text-orange-500 p-2"
          >
            Editar <FaPen />
          </button>
        )}

        <p>
          <span>Por cobrar</span>{" "}
          <span className="font-bold">
            {debtRemaining} {payment.debt.currency.code}
          </span>
        </p>
      </div>
    </div>
  );
};
