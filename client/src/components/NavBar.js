// src/components/NavBar.js
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

function NavBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    //dispatches action to clear user state and log out
    dispatch({ type: "LOGOUT_USER" });
    //navigate to login page once user logs out
    navigate("/login");
  };

  return (
    <nav>
      <ul>
        <li>
          <Link to="/home">Home</Link>
        </li>
        <li>
          <Link to="/brands-view">Matchas by Brand</Link>
        </li>
        <li>
          <Link to="/grades-view">Matchas by Grade</Link>
        </li>
        <li>
          <Link to="/matchas/new">Add New Matcha</Link>
        </li>
        <li>
          <button onClick={handleLogout}>Logout</button>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
