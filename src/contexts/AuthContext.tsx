import { createContext, useContext, useReducer, useEffect } from "react";
import Cookie from "js-cookie";
import axios from "axios";

type User = {
  email: string;
  username: string;
  userID: number;
  confirmed: boolean;
} | null;

type AuthState = {
  authenticated: boolean;
  user: User;
  loading: boolean;
};

type Action =
  | { type: "LOGIN"; payload: User }
  | { type: "REGISTER"; payload: User }
  | { type: "LOGOUT" }
  | { type: "STOP_LOADING" };

type Dispatch = React.Dispatch<Action>;

const AuthStateContext = createContext<AuthState>({
  authenticated: false,
  user: null,
  loading: true,
});

const DispatchContext = createContext(null);

//? Devtools Naming
AuthStateContext.displayName = "AuthAuthStateContext";
DispatchContext.displayName = "DispatchContext";

const reducer = (state: AuthState, action: Action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        authenticated: true,
        loading: true,
        user: action.payload,
      };
    case "LOGOUT":
      Cookie.remove("token");
      return {
        ...state,
        authenticated: false,
        user: null,
      };
    case "REGISTER":
      return {
        ...state,
        authenticated: true,
        loading: true,
        user: {
          ...state.user,
          ...action.payload,
        },
      };
    case "STOP_LOADING":
      return {
        ...state,
        loading: false,
      };
    default:
      throw new Error("Unknown action type");
  }
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, {
    user: null,
    authenticated: false,
    loading: true,
  });

  return (
    <AuthStateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </AuthStateContext.Provider>
  );
};

export const useAuthState = () => useContext(AuthStateContext);
export const useAuthDispatch: () => Dispatch = () =>
  useContext(DispatchContext);
