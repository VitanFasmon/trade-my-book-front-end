import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";

interface ProtectedRouteProps {
  redirectPath?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  redirectPath = "/login",
}) => {
  const { isAuthenticated } = useAuthStore();
  console.log("isAuthenticated:", isAuthenticated);

  return isAuthenticated ? <Outlet /> : <Navigate to={redirectPath} replace />;
};

export default ProtectedRoute;
