import { useEffect, useState } from "react";

import { Debt } from "@/models";
import { debtService } from "@/services";

export const useDebt = () => {
  const [debts, setDebts] = useState<Debt[]>([]);

  useEffect(() => {
    setDebts(debtService.getAllDebts());
  }, []);

  return {
    debts,
  };
};
