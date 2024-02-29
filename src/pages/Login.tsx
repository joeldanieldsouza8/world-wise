import { useEffect, useState } from "react";
import styles from "./Login.module.css";
import PageNav from "../components/layout/PageNav/PageNav";
import Button from "../components/common/Button/Button";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function Login() {
  // Local State
  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = useState("jack@example.com");
  const [password, setPassword] = useState("qwerty");

  const navigate = useNavigate();

  // Custom Hooks
  const { authState, login } = useAuth();
  const { isAuthenticated } = authState;

  useEffect(() => {
    // Programatically navigate to /app if user is already authenticated (logged in) - this is a common pattern in React apps to redirect users to a different page after they log in or log out (or when they are not authenticated) - this is a form of client-side routing (as opposed to server-side routing) - this is a good example of using the `useNavigate` hook
    if (isAuthenticated) {
      navigate("/app", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    // Guard clause
    if (!email || !password) {
      return;
    }

    login(email, password);
  }

  return (
    <main className={styles.login}>
      <PageNav />
      <form className={styles.form} onClick={handleLogin}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <Button type="primary">Login</Button>
        </div>
      </form>
    </main>
  );
}
