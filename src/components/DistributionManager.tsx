import { DistributionType, type Interval, type Payment } from "@/models";
import { AddPayment, PaymentManager } from "@/components";

interface DistributionManagerProps {
  content: Payment | Interval;
}

export const DistributionManager = ({ content }: DistributionManagerProps) => {
  if (content.type === DistributionType.Interval) {
    return <AddPayment interval={content} />;
  }
  return <PaymentManager payment={content} />;
};
