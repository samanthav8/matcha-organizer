// src/components/NavBar.js
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

function NavBar() {
  //navigate function to redirect
  const { handleLogout } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    handleLogout();
    navigate("/login");
  };

  return (
    <nav>
      <ul>
        <li><Link to="/home">Home</Link></li>
        <li><Link to="/brands">Matchas by Brand</Link></li>
        <li><Link to="/grades">Matchas by Grade</Link></li>
        <li><Link to="/matchas/new">Add New Matcha</Link></li>
        <li><button onClick={handleLogoutClick}>Logout</button></li>
      </ul>
    </nav>
  );
}

export default NavBar;