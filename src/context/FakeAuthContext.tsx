import { createContext, useReducer } from "react";
import { authReducer, AuthAction, AuthState } from "../reducer/authReducer";

const initialState = {
  user: null, // User crednetials
  isAuthenticated: false, // User authentication status
};

// Create a context
const FakeAuthContext = createContext<{
  authState: AuthState;
  dispatch: React.Dispatch<AuthAction>;
  login: (email: string, password: string) => void;
  logout: () => void;
}>({
  authState: initialState,
  dispatch: () => null,
  login: () => {},
  logout: () => {},
});

// Fake user - NEVER EVER DO THIS IN REAL APP
const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

// Create a provider
function FakeAuthProvider({ children }: { children: React.ReactNode }) {
  const [authState, dispatch] = useReducer(authReducer, initialState);

  function login(email: string, password: string) {
    if (email === FAKE_USER.email && password === FAKE_USER.password) {
      dispatch({ type: "login", userPayload: FAKE_USER });
    }
  }

  function logout() {
    dispatch({ type: "logout" });
  }

  const contextValue = {
    authState,
    dispatch,
    login,
    logout,
  };

  return (
    <FakeAuthContext.Provider value={contextValue}>
      {children}
    </FakeAuthContext.Provider>
  );
}

export { FakeAuthContext, FakeAuthProvider };
