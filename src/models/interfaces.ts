import { DistributionType } from "@/models";

export interface CurrencyInfo {
  code: string;
}

export interface Interval {
  id: string;
  type: DistributionType.Interval;
}

export interface PaymentInfo {
  id: string;
  title: string;
  quantity: number;
  percentage: number;
  dateToPay: string;
  currency: CurrencyInfo;
}

export interface Payment {
  id: string;
  type: DistributionType.Payment;
  information: PaymentInfo;
}
