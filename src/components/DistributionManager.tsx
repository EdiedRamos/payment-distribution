import { DistributionType, type Interval, type Payment } from "@/models";
import { AddPayment, PaymentInfo } from "@/components";

interface DistributionManagerProps {
  content: Payment | Interval;
}

export const DistributionManager = ({ content }: DistributionManagerProps) => {
  if (content.type === DistributionType.Interval) {
    return <AddPayment interval={content} />;
  }
  return <PaymentInfo payment={content} />;
};
