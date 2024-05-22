import { Control, Distribution, PaymentTransaction } from "@/components";

import { Modal } from "./Modal";
import { usePayment } from "@/contexts";

export const PaymentAdmin = () => {
  const { paymentModalInfo, handlePayTransactionEnd } = usePayment();

  return (
    <>
      <Modal
        show={paymentModalInfo.showModal}
        onClose={handlePayTransactionEnd}
      >
        <PaymentTransaction />
      </Modal>
      <div className="border-2 rounded-lg bg-gray-50">
        <Control />
        <Distribution />
      </div>
    </>
  );
};
