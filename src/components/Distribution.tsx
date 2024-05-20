import { DistributionManager } from "@/components";
import { usePayment } from "@/contexts";

export const Distribution = () => {
  const payment = usePayment();

  return (
    <div className="w-full h-[250px] overflow-auto">
      <div className="relative inline-flex gap-20 items-center ml-16">
        <div className="absolute border-2 w-full border-gray-200"></div>
        {payment.distributionContent.map((data) => (
          <DistributionManager key={data.id} content={data} />
        ))}
      </div>
    </div>
  );
};
