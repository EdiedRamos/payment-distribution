import { FaPen } from "react-icons/fa";
import { FaRegSave } from "react-icons/fa";
import { RiArrowDownWideLine } from "react-icons/ri";
import { usePayment } from "@/contexts";
import { withOneDecimal } from "@/utils";

export const Control = () => {
  const payment = usePayment();

  if (payment.debt.isPaid) {
    return (
      <div className="bg-green-500 border-b-2 rounded-t-md p-5 mb-3">
        <p className="text-center text-white font-medium">PAGO COMPLETO</p>
      </div>
    );
  }

  const debtRemaining = withOneDecimal(
    payment.debt.quantity - payment.debt.paid
  );

  const buttonText = payment.isEditing ? "Guardar" : "Editar";

  const buttonIcon = payment.isEditing ? <FaRegSave /> : <FaPen />;

  const buttonHandle = payment.isEditing
    ? payment.handleSave
    : payment.handleEdit;

  return (
    <div className="flex flex-wrap justify-between border-b-2 p-5 mb-5">
      <button className="flex text-orange-500 items-center gap-2">
        Pagos
        <RiArrowDownWideLine />
      </button>
      <div className="flex items-center flex-wrap gap-5">
        <button
          disabled={payment.debt.isPaid}
          className="flex items-center gap-2 bg-orange-500 text-white rounded-md p-2"
          onClick={buttonHandle}
        >
          {buttonText} {buttonIcon}
        </button>
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
