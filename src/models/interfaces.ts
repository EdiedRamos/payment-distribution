import { DistributionType } from "@/models";

export interface Debt {
  id: string;
  quantity: number;
  remaining: number;
  currency: CurrencyInfo;
}

export interface CurrencyInfo {
  code: string;
}

export interface Interval {
  id: string;
  type: DistributionType.Interval;
}

export interface PaymentInfo {
  title: string;
  quantity: number;
  percentage: number;
  dateToPay: Date;
  currency: CurrencyInfo;
}

export interface Payment {
  id: string;
  type: DistributionType.Payment;
  isPaid: boolean;
  information: PaymentInfo;
}
