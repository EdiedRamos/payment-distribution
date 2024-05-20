import type { DistributionContent, Interval, Payment } from "@/models";

import { DistributionType } from "@/models";

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

export function generateTitle(content: DistributionContent): string {
  const countPayments = content.filter((content) => isPayment(content));
  return `Pago ${countPayments.length + 1}`;
}
