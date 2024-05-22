import { Debts, Payment } from "@/pages";
import { Navigate, createBrowserRouter } from "react-router-dom";

import { URLS } from "@/constants";

export const Router = createBrowserRouter([
  {
    path: URLS.root,
    element: <Navigate to={URLS.debts} />,
  },
  {
    path: URLS.debts,
    element: <Debts />,
  },
  {
    path: URLS.payment,
    element: <Payment />,
  },
]);
