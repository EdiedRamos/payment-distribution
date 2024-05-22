import { Outlet } from "react-router";

export const MainHeader = () => {
  return (
    <>
      <div className="bg-gray-50 border-b-2 flex justify-center">
        <button className="text-white bg-orange-500 p-3 m-2 rounded-md hover:bg-orange-600">
          Agregar Pago
        </button>
      </div>
      <Outlet />
    </>
  );
};
