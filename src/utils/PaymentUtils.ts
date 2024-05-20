import { DistributionType, Interval, Payment } from "@/models";

export function isInterval(content: Payment | Interval) {
  return content.type === DistributionType.Interval;
}

export function isPayment(content: Payment | Interval) {
  return content.type === DistributionType.Payment;
}

export function generateInterval(): Interval {
  return {
    id: crypto.randomUUID(),
    type: DistributionType.Interval,
  };
}
