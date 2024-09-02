import { useAuth } from "@/providers/AuthGuard";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = () => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Outlet /> : <Navigate to="/auth/signin" />;
};
export default PrivateRoutes;
