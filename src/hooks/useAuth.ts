import { useContext } from "react";
import { FakeAuthContext } from "../context/FakeAuthContext";

function useAuth() {
  const auth = useContext(FakeAuthContext);

  if (!auth) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return auth;
}

export default useAuth;
