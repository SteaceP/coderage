import { createContext, useContext, useReducer, useEffect } from "react";
import Cookie from "utils/cookie";

type User = {
  email: string;
  username: string;
  id: number;
  token?: string;
  confirmed?: boolean;
  blocked?: boolean;
  provider?: string;
  created_at?: Date;
  updated_at?: Date;
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
if (process.env.NODE_ENV === "development") {
  DispatchContext.displayName = "DispatchContext";
  AuthStateContext.displayName = "AuthStateContext";
}

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
    loading: false,
  });

  //
  // Log in the user if token exists
  useEffect(() => {
    const token = Cookie.get("token");
    if (token === null || token === undefined) return;

    const getUserFromCookie = async (): Promise<User> => {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/users/me`,
        {
          method: "GET",
          headers: {
            credentials: "include",
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json;charset=UTF-8",
          },
        }
      );
      const data: User = await response.json();
      return data;
    };

    getUserFromCookie()
      .then((res) =>
        dispatch({
          type: "LOGIN",
          payload: {
            username: res.username,
            email: res.email,
            id: res.id,
            token: encodeURIComponent(token),
          },
        })
      )
      .catch((error) => {
        console.log(error);
      })
      .then(() => dispatch({ type: "STOP_LOADING" }));
  }, []);

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
