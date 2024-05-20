import { DistributionType } from "@/models";
import { FaPlus } from "react-icons/fa";
import { usePayment } from "@/contexts";

export const Distribution = () => {
  const payment = usePayment();

  return (
    <div className="w-full h-[250px] overflow-auto">
      <div className="relative inline-flex gap-20 items-center ml-16">
        <div className="absolute border-2 w-full border-gray-200"></div>
        {payment.distributionContent.map((data) => {
          if (data.type === DistributionType.Interval) {
            return (
              <button
                key={data.id}
                className="relative flex justify-center items-center w-[25px] h-[25px] bg-gray-200 rounded-[50%]"
                onClick={() => payment.addPay(data.id)}
              >
                <FaPlus size={12} className="text-orange-500" />
              </button>
            );
          }
          return (
            <div
              key={data.id}
              className="relative flex flex-col items-center text-center"
            >
              <button className="w-[50px] h-[50px] bg-orange-500 rounded-[50%]"></button>
              <div className="absolute border-2 rounded-md p-2 min-w-[150px] top-14">
                <p className="font-bold">{data.information.title}</p>
                <p className="text-sm">
                  {data.information.quantity} {data.information.currency.code} (
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
