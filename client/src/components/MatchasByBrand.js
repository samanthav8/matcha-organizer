// src/components/MatchasByBrand.js
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import NavBar from "./NavBar";
import { UserContext } from "../context/UserContext"; 

function MatchasByBrand() {
  const { userBrands } = useContext(UserContext);

  return (
    <div>
      <NavBar/>
      <h2>Matchas by Brand</h2>

      <div>
        {userBrands.length > 0 ? (
          userBrands.map((brand) => (
            <div key={brand.id}>
              <h3>{brand.name}</h3>
              <p>
                <a href={brand.website} target="_blank" rel="noopener noreferrer">
                  {brand.website}
                </a>
              </p>
              <ul>
                {brand.matchas.map((matcha) => (
                  <li key={matcha.id}>
                    <strong>{matcha.name}</strong> - ${matcha.price} - {matcha.origin}
                    <Link to={`/matchas/${matcha.id}`}>
                      <button>See Details</button>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))
        ) : (
          <p>No matchas found for this user.</p>
        )}
      </div>
    </div>
  );
}

export default MatchasByBrand;
