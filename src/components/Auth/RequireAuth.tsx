import { Navigate, useLocation } from "react-router-dom";

import { useAuthState } from "contexts/AuthContext";

export default function RequireAuth({ children }: { children: JSX.Element }) {
  const { isAuthenticated } = useAuthState();
  const location = useLocation();

  if (!isAuthenticated)
    return <Navigate to="/auth/login" state={{ from: location }} />;

  return children;
}
