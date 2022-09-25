import { createContext, useContext, useReducer, useEffect } from "react";
import Cookie from "utils/cookie";

export type APIResponse = {
  email: string;
  username: string;
  id: number;
  token: string;
  confirmed?: boolean;
  created_at?: Date;
  updated_at?: Date;
  blocked?: boolean;
  provider?: string;
} | null;

export type AuthState = {
  user: APIResponse;
  isLoading: boolean;
  isAuthenticated: boolean;
  error?: string;
};

type Action =
  | { type: "login"; payload: APIResponse }
  | { type: "register"; payload: APIResponse }
  | { type: "updateUser"; payload: APIResponse }
  | { type: "logout" }
  | { type: "error"; error: string }
  | { type: "setLoading"; payload: boolean };

const AuthStateContext = createContext<AuthState>({
  user: null,
  isLoading: true,
  isAuthenticated: false,
});

const reducer = (state: AuthState, action: Action): AuthState => {
  switch (action.type) {
    case "login":
      return {
        user: action.payload,
        isLoading: true,
        isAuthenticated: true,
      };
    case "logout":
      Cookie.remove("token");
      return {
        ...state,
        user: null,
        isLoading: false,
        isAuthenticated: false,
      };
    case "register":
      return {
        ...state,
        user: action.payload,
        isLoading: true,
        isAuthenticated: true,
      };
    case "updateUser":
      return {
        ...state,
        user: action.payload,
      };
    case "error":
      return {
        user: null,
        isLoading: false,
        isAuthenticated: false,
        error: action.error,
      };
    case "setLoading":
      return {
        ...state,
        isLoading: action.payload,
      };
    default:
      throw new Error("Unknown action type");
  }
};

type AuthProviderProps = {
  children: React.ReactNode;
};

type Reducer<State, Action> = (prevState: State, action: Action) => State;

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer<Reducer<AuthState, Action>>(reducer, {
    user: null,
    isLoading: false,
    isAuthenticated: false,
  });

  // Log in the user if token exists
  useEffect(() => {
    let ignore = false;

    const token = Cookie.get("token");
    if (!token) return;

    const getUserFromCookie = async (): Promise<APIResponse> => {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/users/me`,
        {
          method: "GET",
          headers: {
            "credentials": "include",
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json;charset=UTF-8",
          },
        }
      );
      const data: APIResponse = await response.json();
      return data;
    };

    if (!ignore) {
      getUserFromCookie()
        .then(user => {
          if (user) {
            dispatch({ type: "login", payload: user });
          }
        })
        .then(() => dispatch({ type: "setLoading", payload: false }))
        .catch(error => {
          console.log(error.message);
        });
    }

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <AuthStateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </AuthStateContext.Provider>
  );
};
const DispatchContext = createContext((payload: Action) => {});

export const useAuthState = () => {
  const context = useContext(AuthStateContext);
  return context;
};

export const useAuthDispatch = () => {
  const context = useContext(DispatchContext);
  return context;
};

export const useAuth = () => {
  return [useAuthState(), useAuthDispatch()];
};

//? Devtools Naming
if (process.env.NODE_ENV === "development") {
  DispatchContext.displayName = "DispatchContext";
  AuthStateContext.displayName = "AuthStateContext";
}
