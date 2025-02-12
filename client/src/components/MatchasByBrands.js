// src/components/MatchasByBrand.js
import React, { useState } from "react";
import { Link } from "react-router-dom";

function MatchasByBrand({ userMatchas }) {
  const [filteredBrand, setFilteredBrand] = useState("All");

  // new array of user brans
  const userBrands = [];
  for (let i = 0; i < userMatchas.length; i++) {
    const brandName = userMatchas[i].brand && userMatchas[i].brand.name;
    // check if brandname exists
    if (brandName && userBrands.indexOf(brandName) === -1) {
      userBrands.push(brandName);
    }
  }
  userBrands.sort();

  // drop down event listened
  const handleBrandChange = (e) => {
    setFilteredBrand(e.target.value);
  };

  // group matchas
  const groupedMatchas = {};
  for (let j = 0; j < userMatchas.length; j++) {
    const bName = (userMatchas[j].brand && userMatchas[j].brand.name) || "Null";
    if (!groupedMatchas[bName]) {
      groupedMatchas[bName] = [];
    }
    groupedMatchas[bName].push(userMatchas[j]);
  }

  const groupedKeys = Object.keys(groupedMatchas);
  groupedKeys.sort();

  return (
    <div>
      <h2>My Matchas by Brand</h2>
      <div>
        <label htmlFor="brandSelect">Filter by Brand: </label>
        <select id="brandSelect" value={filteredBrand} onChange={handleBrandChange}>
          <option value="All">All</option>
          {userBrands.map((brandName, index) => (
            <option key={index} value={brandName}>
              {brandName}
            </option>
          ))}
        </select>
      </div>

      {filteredBrand === "All" ? (
        groupedKeys.map((brandName) => (
          <div key={brandName}>
            <h3>{brandName}</h3>
            <ul>
              {groupedMatchas[brandName].map((matcha) => (
                <li key={matcha.id}>
                  <Link to={`/matchas/${matcha.id}`}>{matcha.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))
      ) : (
        <div>
          <h3>{filteredBrand}</h3>
          <ul>
            {userMatchas
              .filter((matcha) => matcha.brand && matcha.brand.name === filteredBrand)
              .map((matcha) => (
                <li key={matcha.id}>
                  <Link to={`/matchas/${matcha.id}`}>{matcha.name}</Link>
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default MatchasByBrand;
