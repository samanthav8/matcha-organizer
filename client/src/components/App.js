// src/components/App.js
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavBar from "./NavBar";

function App() {
  return (
    <Router>
      <div>
        <NavBar />
      </div>
    </Router>
  );
}

export default App;
