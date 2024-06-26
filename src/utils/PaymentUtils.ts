import type {
  Debt,
  DistributionContent,
  Interval,
  Payment,
  PaymentMethod,
} from "@/models";

import { DistributionType } from "@/models";
import { PAYMENT_METHODS } from "@/constants";

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

export function completedPayments(content: DistributionContent): number {
  return content.reduce((acc, curr) => {
    if (isInterval(curr)) return acc;
    return acc + (curr.isPaid ? curr.information.quantity : 0);
  }, 0);
}

export function getNextToPayId(content: DistributionContent): string | null {
  for (const payment of content) {
    if (isPayment(payment) && !payment.isPaid) {
      return payment.id;
    }
  }
  return null;
}

export function generateTitle(content: DistributionContent): string {
  return `Pago ${paymentCounter(content) + 1}`;
}

export function toRoundHalf(value: number): { first: number; second: number } {
  return {
    first: Math.ceil(value / 2),
    second: Math.floor(value / 2),
  };
}

export function getQuantityFromPercentage(
  total: number,
  percentage: number
): number {
  return (total * percentage) / 100;
}

export function isPaymentMethod(value: string): value is PaymentMethod {
  return PAYMENT_METHODS.includes(value as PaymentMethod);
}

export function buildPayment(debt: Debt, title?: string): Payment {
  return {
    type: DistributionType.Payment,
    id: crypto.randomUUID(),
    isPaid: false,
    information: {
      currency: debt.currency,
      quantity: debt.quantity,
      percentage: 100,
      dateToPay: new Date(),
      title: title ?? "Anticipo",
    },
  };
}

export function isDateGreaterOrEqual(date: string): boolean {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const newDate = new Date(date);
    newDate.setHours(0, 0, 0, 0);
    return newDate >= today;
  } catch {
    return false;
  }
}
