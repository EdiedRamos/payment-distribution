import { Select } from "./Select";
import { usePayment } from "@/contexts";

export const PaymentTransaction = () => {
  const { handlePayTransactionEnd, handlePayTransactionConfirm } = usePayment();

  return (
    <div className="m-3">
      <h3 className="font-bold text-lg">Pagar</h3>
      <p>Selecciona el método de pago.</p>
      <div>
        <p>Estado</p>
        <Select
          options={[
            { id: "1", name: "Efectivo", default: true },
            { id: "2", name: "Tarjeta" },
          ]}
        />
      </div>
      <div className="flex justify-end gap-3">
        <button
          onClick={handlePayTransactionEnd}
          className="p-2 rounded-md border-2 border-blue-500"
        >
          Cancelar
        </button>
        <button
          onClick={handlePayTransactionConfirm}
          className="p-2 bg-orange-500 rounded-md text-white"
        >
          Guardar
        </button>
      </div>
    </div>
  );
};
