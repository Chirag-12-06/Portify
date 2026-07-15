import { createBrowserRouter } from "react-router-dom";

import GuestRoute from "./GuestRoute";
import ProtectedRoute from "./ProtectedRoute";

import LoginPage from "../features/auth/pages/LoginPage";
import DashboardPage from "../features/dashboard/pages/DashboardPage";
import ProfilePage from "../features/profile/pages/ProfilePage";

import { Routes } from "../lib/routes";

import DashboardLayout from "../layouts/DashboardLayout";

const router = createBrowserRouter([
  {
    element: <GuestRoute />,
    children: [
      {
        path: Routes.LOGIN,
        element: <LoginPage />,
      },
    ],
  },

  {
  element: <ProtectedRoute />,
  children: [
    {
      element: <DashboardLayout />,
      children: [
        {
          path: Routes.DASHBOARD,
          element: <DashboardPage />,
        },
        {
          path: Routes.PROFILE,
          element: <ProfilePage />,
        },
      ],
    },
  ],
}
]);

export default router;