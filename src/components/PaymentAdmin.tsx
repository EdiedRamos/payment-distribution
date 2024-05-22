import { Control, Distribution } from "@/components";

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
        <p>EdiedRamos</p>
      </Modal>
      <div className="border-2 rounded-lg bg-gray-50">
        <Control />
        <Distribution />
      </div>
    </>
  );
};
