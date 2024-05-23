/**
 * According the UI I figured out just create one mixed array with two different concepts,
 * the first one is to represent a payment and the other one is to represent an interval "payment adder"
 * and with that I had a good UI without fighting with POSITIONS. Then for BACKEND purposes just I need
 * to create a helper to separate those concepts.
 */

import { DistributionManager } from "@/components";
import { usePayment } from "@/contexts";

export const Distribution = () => {
  const payment = usePayment();

  return (
    <div className="w-full h-[350px] overflow-auto">
      <div className="relative inline-flex gap-20 items-center ml-16">
        <div className="absolute border-2 w-full border-gray-200"></div>
        {payment.distributionContent.map((data) => (
          <DistributionManager key={data.id} content={data} />
        ))}
      </div>
    </div>
  );
};
