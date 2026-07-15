import { Navigate, Outlet } from "react-router-dom";
import { useCurrentUser } from "../features/auth/hooks/useCurrentUser";
import LoadingScreen from "../components/common/LoadingScreen";
import { Routes } from "../lib/routes";

export default function GuestRoute() {
  const { data, isLoading } = useCurrentUser();

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (data?.success) {
    return <Navigate to={Routes.DASHBOARD} replace />;
  }

  return <Outlet />;
}
