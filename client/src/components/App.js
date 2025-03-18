// src/components/App.js
import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Signup from "./Signup";
import MatchasByBrand from "./MatchasByBrand";
import MatchasByGrade from "./MatchasByGrade"; 
import NewMatchaForm from "./NewMatchaForm";
import MatchaDetails from "./MatchaDetails";
import EditMatchaForm from "./EditMatchaForm";
import "../styles/style.css"; 

function App() {
  const location = useLocation(); 

  // change title dynamically
  useEffect(() => {
    const pageTitles = {
      "/": "Matcha Organizer",
      "/login": "Login to My Matcha Collection",
      "/signup": "Signup for My Matcha Collection",
      "/brands": "My Matchas By Brands",
      "/grades": "My Matchas By Grades",
      "/home": "Welcome Matcha Loverㅤ♡",
      "/matchas/new": "Add New Matcha"
    };

    document.title = pageTitles[location.pathname] || "Matcha Organizer";
  }, [location]);

  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/brands" element={<MatchasByBrand />} />
        <Route path="/grades" element={<MatchasByGrade />} />
        <Route path="/matchas/:id" element={<MatchaDetails />} />
        <Route path="/home" element={<Home />} />
        <Route path="/matchas/new" element={<NewMatchaForm />} />
        <Route path="/matchas/:id/edit" element={<EditMatchaForm />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
