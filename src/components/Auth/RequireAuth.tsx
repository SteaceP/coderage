import { Navigate, useLocation } from "react-router-dom";

import { useAuthState } from "contexts/AuthContext";

export default function RequireAuth({ children }: { children: JSX.Element }) {
  const { authenticated } = useAuthState();
  const location = useLocation();

  if (!authenticated) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/auth/login" state={{ from: location }} />;
  }

  return children;
}
