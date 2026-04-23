import { Navigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import type { ReactNode } from "react";
 
interface ProtectedRouteProps {
  children: ReactNode;
}
 
function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isSignedIn, isLoaded } = useUser();
 
  // Wait for Clerk to load before redirecting
  if (!isLoaded) return null;
 
  if (!isSignedIn) return <Navigate to="/login" replace />;
 
  return <>{children}</>;
}
 
export default ProtectedRoute;
