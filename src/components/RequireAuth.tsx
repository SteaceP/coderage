import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

//TODO: Show a modal(or something else) when the user is redirected, will be better for UX
//TODO: Change this to something more secure before going to prod. <-- (Wrote this before version 6 upgrade...)

export default function RequireAuth({ children }: { children: JSX.Element }) {
  const { currentUser } = useAuth();
  const location = useLocation();

  if (!currentUser) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/auth/login" state={{ from: location }} />;
  }

  return children;
}
