import { Option } from "@/models";
import { Select } from "./Select";
import { isPaymentMethod } from "@/utils";
import { usePayment } from "@/contexts";
import { useRef } from "react";

export const PaymentTransaction = () => {
  const { handlePayTransactionEnd, handlePayTransactionConfirm } = usePayment();

  const selectedRef = useRef<Option | null>(null);

  const handleSave = () => {
    if (!selectedRef.current) return;
    if (!isPaymentMethod(selectedRef.current.name)) return;
    handlePayTransactionConfirm(selectedRef.current.name);
  };

  return (
    <div className="m-3">
      <h3 className="font-bold text-lg">Pagar</h3>
      <p>Selecciona el método de pago.</p>
      <div>
        <p className="my-2">Estado</p>
        <Select
          options={[
            {
              id: "1",
              name: "Efectivo",
              default: true,
            },
            { id: "2", name: "Tarjeta" },
          ]}
          selectedRef={selectedRef}
        />
      </div>
      <div className="flex justify-end gap-4 mt-2">
        <button
          onClick={handlePayTransactionEnd}
          className="p-2 rounded-md bg-red-500 hover:bg-red-600 text-white"
        >
          Cancelar
        </button>
        <button
          onClick={handleSave}
          className="p-2 bg-orange-500 hover:bg-orange-600 rounded-md text-white"
        >
          Guardar
        </button>
      </div>
    </div>
  );
};
