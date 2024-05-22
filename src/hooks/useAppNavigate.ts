import { URLS } from "@/constants";
import { useNavigate } from "react-router";

export const useAppNavigate = () => {
  const navigate = useNavigate();

  return {
    goToPayment: (paymentId: string) => {
      navigate("/" + URLS.payment.replace(":paymentId", paymentId));
    },
  };
};
