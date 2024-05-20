import {
  Currency,
  CurrencyInfo,
  DistributionContent,
  DistributionType,
  PaymentInfo,
} from "@/models";

import { PaymentContext } from "./PaymentContext";
import { currencyInfo } from "@/constants";
import { useState } from "react";

interface PaymentProviderProps {
  children: React.ReactNode;
  totalPayment: number;
  currency: CurrencyInfo;
}

const INFORMATION_MOCK: Omit<PaymentInfo, "id"> = {
  title: "Anticipo",
  quantity: 182,
  percentage: 100,
  dateToPay: "22 Ene, 2022",
  currency: currencyInfo[Currency.USD],
};

export const PaymentProvider = ({
  children,
  totalPayment,
  currency,
}: PaymentProviderProps) => {
  const [distributionContent, setDistributionContent] =
    useState<DistributionContent>([
      {
        id: crypto.randomUUID(),
        type: DistributionType.Payment,
        information: { id: crypto.randomUUID(), ...INFORMATION_MOCK },
      },
      { id: crypto.randomUUID(), type: DistributionType.Interval },
    ]);

  const values = {
    distributionContent,
    totalPayment,
    currency,
  };

  return (
    <PaymentContext.Provider value={values}>{children}</PaymentContext.Provider>
  );
};
