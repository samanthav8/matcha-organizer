// src/components/NavBar.js
import React from "react";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
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
          <Link to="/">Logout</Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
