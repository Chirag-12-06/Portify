import { Navigate, Outlet } from "react-router-dom";
import { useCurrentUser } from "../features/auth/hooks/useCurrentUser";
import LoadingScreen from "../components/common/LoadingScreen";
import { Routes } from "../lib/routes";

export default function ProtectedRoute() {
  const { data, isLoading, isError } = useCurrentUser();

  if (isLoading) {
     return <LoadingScreen />;
  }

  if (isError || !data?.success) {
    return <Navigate to={Routes.LOGIN} replace />;
  }

  return <Outlet />;
}