import { Control, Distribution } from "@/components";

import { Modal } from "./Modal";

export const PaymentAdmin = () => {
  return (
    <>
      <Modal show>
        <p>EdiedRamos</p>
      </Modal>
      <div className="border-2 rounded-lg bg-gray-50">
        <Control />
        <Distribution />
      </div>
    </>
  );
};
