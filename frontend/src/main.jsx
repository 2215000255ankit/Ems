// src/main.js
import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";   // ⬅️ note “.jsx”

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* ONE BrowserRouter for the entire app */}
    <BrowserRouter>
      {/* AuthProvider can sit inside BrowserRouter (safe) */}
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
