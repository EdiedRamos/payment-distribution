import { ChangeEvent, useRef, useState, type FormEvent } from "react";
import { Select } from "./Select";
import { useDebt } from "@/contexts";
import { CurrencyInfo, Debt, Option } from "@/models";

const SelectOptions = [
  { id: "1", name: "COP" },
  { id: "2", name: "USD" },
];

// ! temporal here
function toCurrency(value: string): CurrencyInfo | null {
  const validCurrencies = ["COP", "USD"];
  if (!validCurrencies.includes(value)) return null;
  return {
    code: value,
  };
}

export const AddDebt = () => {
  const [quantity, setQuantity] = useState<string>("");

  const { addDebt } = useDebt();
  const currencyRef = useRef<Option | null>(null);

  const handleQuantity = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (!isNaN(Number(value))) {
      setQuantity(value);
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newDebt: Debt = {
      id: crypto.randomUUID(),
      currency: toCurrency(currencyRef.current?.name ?? "") ?? {
        code: "USD",
      },
      isPaid: false,
      paid: 0,
      quantity: Number(quantity),
    };
    addDebt(newDebt);
  };

  return (
    <div>
      <form
        className="flex flex-col items-center p-5 gap-3"
        onSubmit={handleSubmit}
      >
        <label>
          Cantidad
          <input
            required
            min={1}
            value={quantity}
            onChange={handleQuantity}
            type="number"
            placeholder="Ingrese cantidad"
          />
        </label>
        <Select selectedRef={currencyRef} options={SelectOptions} />
        <button className="text-white bg-orange-500 p-3 rounded-md hover:bg-orange-600">
          crear
        </button>
      </form>
    </div>
  );
};
