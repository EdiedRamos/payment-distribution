import type { Interval, Payment } from "./interfaces";

export type DistributionContent = (Payment | Interval)[];

export type PaymentMethod = "Efectivo" | "Tarjeta";
