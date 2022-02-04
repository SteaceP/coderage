import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import AUTH_LOGIN_MUTATION from "../graphql/mutation/mutation.auth.login";
import AUTH_REGISTER_MUTATION from "../graphql/mutation/mutation.auth.register";
import Cookie from "js-cookie";

const AuthContext = createContext();

AuthContext.displayName = "AuthContext";

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [authError, setAuthError] = useState("");
  const [login] = useMutation(AUTH_LOGIN_MUTATION);
  const [register] = useMutation(AUTH_REGISTER_MUTATION);
  const navigate = useNavigate();

  const localLogin = (email, password) => {
    login({
      variables: {
        email,
        password,
      },
      onCompleted: ({ login }) => {
        if (process.env.NODE_ENV !== "development") {
          Cookie.set("token", login.jwt, {
            secure: true,
            domain: "coderage.pro",
            sameSite: "strict",
            expires: 15,
          });
          
          Cookie.set("token", login.jwt);
        }
        setCurrentUser(login.user);
        navigate("/");
      },
      onError: (error) => {
        setAuthError(error.message);
      },
    });
  };

  const localSignup = (username, email, password) => {
    register({
      variables: {
        email,
        password,
        username,
      },
      onCompleted: ({ register }) => {
        if (process.env.NODE_ENV !== "development") {
          Cookie.set("token", register.jwt, {
            secure: true,
            domain: "coderage.pro",
            sameSite: "strict",
            expires: 15,
          });
          
          Cookie.set("token", register.jwt);
          setCurrentUser(register.user);
          navigate("/");
        } else {
          Cookie.set("token", register.jwt);
          setCurrentUser(register.user);
        }
      },
      onError: (error) => {
        setAuthError(error.message);
      },
    });
  };

  const logout = () => {
    setCurrentUser(null);
    Cookie.remove("token");
  };

  //TODO: Log the user back in automatically if he's already been connected and the cookie is not expired.
  //TODO: If it's expired, redirect to login page with a message telling to relog due to bla bla (or refresh the token directly?)
  //TODO: Need a logic, strapi don't support it...
  useEffect(() => {
    const token = Cookie.get("token");

    if (token) {
      setCurrentUser(true); // Make a cookie with more than just the token?
    }
  }, [currentUser]);

  let value = {
    currentUser,
    localLogin,
    authError,
    setAuthError,
    localSignup,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export let useAuth = () => {
  return useContext(AuthContext);
};