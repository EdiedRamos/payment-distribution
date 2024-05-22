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

export interface PaymentMethodInfo {
  label: string;
}

export interface Transaction {
  id: string;
  date: Date;
  method: PaymentMethodInfo;
}

export interface Payment {
  id: string;
  type: DistributionType.Payment;
  isPaid: boolean;
  transaction?: Transaction;
  information: PaymentInfo;
}

export interface PaymentModalInfo {
  showModal: boolean;
  paymentId: string;
}

// TODO: Organize content by context

export interface Option {
  id: string;
  name: string;
  default?: boolean;
}
