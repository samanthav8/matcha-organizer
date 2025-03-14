// src/components/MatchasByBrand.js
import React, { useContext } from "react";
import { UserContext } from "../context/UserContext"; 

function MatchasByBrand() {
  const { brands } = useContext(UserContext);

  return (
    <div>

      <h2>Matchas by Brand</h2>

      <div>
        {brands.length > 0 ? (
          brands.map((brand) => (
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
                    <strong>{matcha.name}</strong> - ${matcha.price.toFixed(2)} - {matcha.origin}
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
