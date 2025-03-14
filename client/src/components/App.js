// src/components/App.js
import React, { useContext, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { UserContext } from "../context/UserContext"; 
import NavBar from "./NavBar";
import Home from "./Home";
import Login from "./Login";
import Signup from "./Signup";
import MatchasByBrand from "./MatchasByBrand";
import NewMatchaForm from "./NewMatchaForm";

function App() {
  const { user, setUser, brands, setBrands } = useContext(UserContext);
  const location = useLocation(); 


  //change title dynamically
  useEffect(() => {
    const pageTitles = {
      "/": "Matcha Organizer",
      "/login": "Login | Matcha Organizer",
      "/signup": "Signup | Matcha Organizer",
      "/brands-view": "Matcha Brands",
      "/home": "Welcome Matcha Lover!",
    };

    document.title = pageTitles[location.pathname] || "Matcha Organizer";
  }, [location]);

  // check session on load
  useEffect(() => {
    fetch("/check_session", { credentials: "include" })
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((data) => {
        setUser(data);
        setBrands(data.brands || []);
      })
      .catch(() => {
        setUser(null);
        setBrands([]);
      });
  }, []);

  // if user is on login or sign up hide navbar
  const hideNavBar = !user || location.pathname === "/login" || location.pathname === "/signup";

  return (
    <div>
      {!hideNavBar && <NavBar />} {/* navbar only when a user is logged in*/}
      <Routes>
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/home" />} />
        <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/home" />} />
        <Route path="/brands-view" element={user ? <MatchasByBrand /> : <Navigate to="/login" />} />
        <Route path="/home" element={user ? <Home /> : <Navigate to="/login" />} />
        <Route path="/matchas/new" element={user ? <NewMatchaForm /> : <Navigate to="/login" />} />
        <Route path="/" element={<Navigate to={user ? "/home" : "/login"} />} />
      </Routes>

    </div>
  );
}

export default App;