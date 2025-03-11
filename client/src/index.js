import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./components/App";
import store from "./store"; 
import "./index.css";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  //provider makes redux available to all components in app
  //wrap app in router to use location
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
);
