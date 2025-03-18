// src/components/MatchasByBrand.js
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import NavBar from "./NavBar";
import { UserContext } from "../context/UserContext";
import "../styles/style.css";

function MatchasByBrand() {
  const { userBrands } = useContext(UserContext);

  return (
    <>
      <NavBar />
      <div className="matcha-page">
         <h2 className="matcha-title">Matchas by Brand</h2>
      </div>
      {userBrands.length > 0 ? (
        <div className="matcha-list">
          {userBrands.map((brand) => (
            <div key={brand.id} className="matcha-card">
              <h3>{brand.name}</h3>
              <p>
                <a href={brand.website} target="_blank" rel="noopener noreferrer" className="matcha-link">
                  {brand.website}
                </a>
              </p>
              <ul>
                {brand.matchas.map((matcha) => (
                  <li key={matcha.id} className="matcha-item">
                    {matcha.name} - ${matcha.price} - {matcha.origin}
                    <Link to={`/matchas/${matcha.id}`}>
                      <button className="button-small">See Details</button>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-matcha">No matchas found for this user.</p>
      )}
    </>
  );
}

export default MatchasByBrand;
