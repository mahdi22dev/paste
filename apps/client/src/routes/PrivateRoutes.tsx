import { useAuth } from "@/providers/AuthGuard";
import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { BounceLoader } from "react-spinners";

const PrivateRoutes = () => {
  const { isAuthenticated, protectedloading, verfiyToken } = useAuth();

  useEffect(() => {
    verfiyToken();
  }, []);

  if (protectedloading) {
    return (
      <div>
        <BounceLoader size={70} color="#e390eb" />
      </div>
    );
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/auth/signin" />;
};
export default PrivateRoutes;
