// src/index.js
import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./components/App";
import { UserProvider } from "./context/UserContext";
import "./index.css";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <Router>
    <UserProvider>
      <App />
    </UserProvider>
  </Router>
);
