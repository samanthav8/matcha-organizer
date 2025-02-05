import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./components/App";
import store from "./store"; 
import "./index.css";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  //provider makes redux available to all components in app
  <Provider store={store}>
    <App />
  </Provider>
);
