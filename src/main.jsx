import React from "react";
import ReactDOM from "react-dom/client";
import axios from "axios";
import App from "./App";
import { AuthContextProvider } from "./context/AuthContext";

axios.defaults.baseURL = import.meta.env.VITE_API || "http://localhost:3000";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthContextProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
  </AuthContextProvider>
);
