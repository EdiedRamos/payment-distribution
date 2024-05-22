import { Outlet } from "react-router";
import { useAppNavigate } from "@/hooks";

export const PaymentHeader = () => {
  const { goToDebts } = useAppNavigate();

  return (
    <>
      <div className="bg-gray-50 border-b-2 flex justify-center">
        <button
          onClick={goToDebts}
          className="text-white bg-orange-500 p-3 m-2 rounded-md hover:bg-orange-600"
        >
          Ver deudas
        </button>
      </div>
      <Outlet />
    </>
  );
};
