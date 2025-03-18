// src/components/NavBar.js
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import "../styles/style.css"; 

function NavBar() {
  //navigate function to redirect
  const { handleLogout } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    handleLogout();
    navigate("/login");
  };

  return (
    <div className="navbar-container">
      <h1 className="navbar-title">‧₊˚ ⋅  𓐐𓎩 ‧₊˚ ⋅My Matcha Collection‧₊˚ ⋅  𓐐𓎩 ‧₊˚ ⋅</h1>
      <div className="navbar-links">
        <Link className="button" to="/home">Home</Link>
        <Link className="button" to="/brands">Matchas by Brand</Link>
        <Link className="button" to="/grades">Matchas by Grade</Link>
        <Link className="button" to="/matchas/new">Add New Matcha</Link>
        <button className="button" onClick={handleLogoutClick}>Logout</button>
      </div>
    </div>
  );
}

export default NavBar;