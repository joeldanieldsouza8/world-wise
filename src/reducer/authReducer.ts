import { User } from "../types/userType";

export interface AuthState {
  user: User | null; // User crednetials
  isAuthenticated: boolean; // User authentication status
}

export type AuthAction =
  | { type: "login"; userPayload: User }
  | { type: "logout" };

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case "login": {
      return {
        ...state,
        user: action.userPayload,
        isAuthenticated: true,
      };
    }

    case "logout": {
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      };
    }

    default: {
      return state;
    }
  }
}

export { authReducer };
