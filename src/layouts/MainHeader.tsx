import { AddDebt, Modal } from "@/components";

import { Outlet } from "react-router";
import { useDebt } from "@/contexts";

export const MainHeader = () => {
  const { showAddModal, handleHide, handleShow } = useDebt();
  return (
    <>
      <Modal show={showAddModal} onClose={handleHide}>
        <AddDebt />
      </Modal>
      <div className="bg-gray-50 border-b-2 flex justify-center">
        <button
          onClick={handleShow}
          className="text-white bg-orange-500 p-3 m-2 rounded-md hover:bg-orange-600"
        >
          Agregar Pago
        </button>
      </div>
      <Outlet />
    </>
  );
};
