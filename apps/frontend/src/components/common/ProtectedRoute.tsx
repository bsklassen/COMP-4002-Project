import { Navigate } from "react-router-dom";
import { useUser } from "./usercontext/UserContext";
import type { ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { username } = useUser();
  if (!username) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

export default ProtectedRoute;
