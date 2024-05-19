import { useState } from "react";

enum Type {
  Interval,
  Payment,
}

interface Distribution {
  id: string;
  type: Type;
}

export const Distribution = () => {
  const [distribution, setDistribution] = useState<Distribution[]>([
    { id: crypto.randomUUID(), type: Type.Payment },
    { id: crypto.randomUUID(), type: Type.Interval },
  ]);

  const handleDistribution = (actionId: string) => {
    console.log({ actionId });
    setDistribution((prev) => [
      ...prev,
      { id: crypto.randomUUID(), type: Type.Payment },
      { id: crypto.randomUUID(), type: Type.Interval },
    ]);
  };

  return (
    <div className="w-[500px]  overflow-auto">
      <div className="relative inline-flex gap-10 items-center overflow-auto">
        <div className="absolute border-2 w-full -z-10"></div>
        {distribution.map((data) => {
          if (data.type === Type.Interval) {
            return (
              <button
                onClick={() => handleDistribution(data.id)}
                className="w-[20px] h-[20px] bg-orange-400 rounded-[50%]"
              ></button>
            );
          }
          return (
            <button className="w-[40px] h-[40px] bg-blue-400 rounded-[50%]"></button>
          );
        })}
      </div>
    </div>
  );
};
