import { DebtContext } from "./DebtContext";
import { useContext } from "react";

export const useDebt = () => {
  const context = useContext(DebtContext);
  if (!context) throw new Error("useDebt must to be inside DebtProvider");
  return context;
};
