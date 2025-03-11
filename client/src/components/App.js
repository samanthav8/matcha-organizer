// src/components/App.js
import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import NavBar from "./NavBar";
import Home from "./Home";
import Login from "./Login";
import Signup from "./Signup";
import MatchasByBrands from "./MatchasByBrands";
import NewMatchaForm from "./NewMatchaForm";

function App() {
  const [user, setUser] = useState(null);
  const location = useLocation(); // 

  //checks session
  useEffect(() => {
    fetch("/check_session", { credentials: "include" })
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then(setUser)
      .catch(() => setUser(null));
  }, []);

  // hide navbar on login/logou pages
  const hideNavBar = !user || location.pathname === "/login" || location.pathname === "/signup";

  return (
    <div>
      {!hideNavBar && <NavBar setUser={setUser} />}
      <Routes>
        <Route path="/login" element={!user ? <Login setUser={setUser} /> : <Navigate to="/home" />} />
        <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/home" />} />
        <Route path="/brands-view" element={user ? <MatchasByBrands /> : <Navigate to="/login" />} />
        <Route path="/home" element={user ? <Home /> : <Navigate to="/login" />} />
        <Route path="/matchas/new" element={user ? <NewMatchaForm /> : <Navigate to="/login" />} />
        <Route path="/" element={<Navigate to={user ? "/home" : "/login"} />} />
      </Routes>
    </div>
  );
}

export default App;
