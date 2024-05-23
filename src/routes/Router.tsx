import { Debts, Payment } from "@/pages";
import { MainHeader, PaymentHeader } from "@/layouts";
import { Navigate, createBrowserRouter } from "react-router-dom";

import { DebtProvider } from "@/contexts";
import { URLS } from "@/constants";

export const Router = createBrowserRouter([
  {
    path: URLS.root,
    element: <Navigate to={URLS.debts} />,
  },
  {
    path: URLS.debts,
    element: (
      <DebtProvider>
        <MainHeader />
      </DebtProvider>
    ),
    children: [{ index: true, element: <Debts /> }],
  },
  {
    path: URLS.payment,
    element: <PaymentHeader />,
    children: [{ index: true, element: <Payment /> }],
  },
  {
    path: URLS.all,
    element: <Navigate to={URLS.debts} />,
  },
]);
