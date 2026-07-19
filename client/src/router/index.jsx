import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import NotFoundPage from "../pages/NotFoundPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export default router;
