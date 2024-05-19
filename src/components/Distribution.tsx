import { FaPlus } from "react-icons/fa";
import { useState } from "react";

enum Type {
  Interval,
  Payment,
}

interface PaymentInfo {
  id: string;
  title: string;
  quantity: number;
  percentage: number;
  dateToPay: string;
  currency: string;
}

interface Payment {
  id: string;
  type: Type.Payment;
  information: PaymentInfo;
}

interface Interval {
  id: string;
  type: Type.Interval;
}

type Distribution = (Payment | Interval)[];

const INFORMATION_MOCK: Omit<PaymentInfo, "id"> = {
  title: "Anticipo",
  quantity: 182,
  percentage: 100,
  dateToPay: "22 Ene, 2022",
  currency: "USD",
};

export const Distribution = () => {
  const [distribution, setDistribution] = useState<Distribution>([
    {
      id: crypto.randomUUID(),
      type: Type.Payment,
      information: { id: crypto.randomUUID(), ...INFORMATION_MOCK },
    },
    { id: crypto.randomUUID(), type: Type.Interval },
  ]);

  const handleDistribution = (actionId: string) => {
    console.log({ actionId });
    setDistribution((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        type: Type.Payment,
        information: { id: crypto.randomUUID(), ...INFORMATION_MOCK },
      },
      { id: crypto.randomUUID(), type: Type.Interval },
    ]);
  };

  return (
    <div className="w-full h-[250px] overflow-auto">
      <div className="relative inline-flex gap-20 items-center ml-16">
        <div className="absolute border-2 w-full -z-10 border-gray-200"></div>
        {distribution.map((data) => {
          if (data.type === Type.Interval) {
            return (
              <button
                onClick={() => handleDistribution(data.id)}
                className="flex justify-center items-center w-[25px] h-[25px] bg-gray-200 rounded-[50%]"
              >
                <FaPlus size={12} className="text-orange-500" />
              </button>
            );
          }
          return (
            <div className="relative flex flex-col items-center text-center">
              <button className="w-[50px] h-[50px] bg-orange-500 rounded-[50%]"></button>
              <div className="absolute border-2 rounded-md p-2 min-w-[150px] top-14">
                <p className="font-bold">{data.information.title}</p>
                <p className="text-sm">
                  {data.information.quantity} {data.information.currency} (
                  {data.information.percentage}%)
                </p>
                <p className="text-sm">{data.information.dateToPay}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
