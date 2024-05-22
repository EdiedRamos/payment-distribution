import type { DistributionContent, Interval, Payment } from "@/models";

import { DistributionType } from "@/models";

export function isInterval(content: Payment | Interval): content is Interval {
  return content.type === DistributionType.Interval;
}

export function isPayment(content: Payment | Interval): content is Payment {
  return content.type === DistributionType.Payment;
}

export function generateInterval(): Interval {
  return {
    id: crypto.randomUUID(),
    type: DistributionType.Interval,
  };
}

export function paymentCounter(content: DistributionContent): number {
  const countPayments = content.filter((content) => isPayment(content));
  return countPayments.length;
}

export function generateTitle(content: DistributionContent): string {
  return `Pago ${paymentCounter(content) + 1}`;
}

export function toRoundHalf(value: number): { first: number; second: number } {
  if (value % 2 === 0)
    return {
      first: value / 2,
      second: value / 2,
    };
  value++;
  return {
    first: value / 2,
    second: value / 2 - 1,
  };
}
