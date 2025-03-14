// src/components/NavBar.js
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

function NavBar() {
  //navigate function to redirect
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    fetch("/logout", { method: "DELETE", credentials: "include" })
      .then(() => {
        setUser(null);
        //clear last page
        localStorage.removeItem("lastPage"); 
        navigate("/login");
      });
  };

  return (
    <nav>
      <ul>
        <li><Link to="/home">Home</Link></li>
        <li><Link to="/brands-view">Matchas by Brand</Link></li>
        <li><Link to="/matchas/new">Add New Matcha</Link></li>
        <li><button onClick={handleLogout}>Logout</button></li>
      </ul>
    </nav>
  );
}

export default NavBar;