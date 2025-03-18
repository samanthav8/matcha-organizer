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

function App() {
  const location = useLocation(); 

  // change title dynamically
  useEffect(() => {
    const pageTitles = {
      "/": "Matcha Organizer",
      "/login": "Login | Matcha Organizer",
      "/signup": "Signup | Matcha Organizer",
      "/brands-view": "Matcha Brands",
      "/grades-view": "Matcha Grades",
      "/home": "Welcome Matcha Lover!",
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
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
