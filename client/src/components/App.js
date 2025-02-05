// src/components/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
//useSelector gets data from redux store
import { useSelector } from "react-redux";
import NavBar from "./NavBar";
import Home from "./Home";
import Login from "./Login";
import Signup from "./Signup";

function App() {
  //reading user state from redux
  const user = useSelector((state) => state.user);

  return (
    <Router>
      <div>
        {/*navbar only shows if the user is true*/}
        {user && <NavBar />}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/home" />} />
          <Route path="/home" element={user ? <Home /> : <Navigate to="/login" />} />
          <Route path="/" element={user ? <Navigate to="/home" /> : <Navigate to="/login" />} />
        </Routes>

      </div>
    </Router>
  );
}

export default App;
