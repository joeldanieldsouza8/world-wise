import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import { CitiesProvider } from "./context/CitiesContext.tsx";
import { FakeAuthProvider } from "./context/FakeAuthContext.tsx";
import ProtectedRoute from "./pages/ProtectedRoute.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <FakeAuthProvider>
      <CitiesProvider>
        <ProtectedRoute>
          <App />
        </ProtectedRoute>
      </CitiesProvider>
    </FakeAuthProvider>
  </React.StrictMode>
);
