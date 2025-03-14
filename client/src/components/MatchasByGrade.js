// src/components/MatchasByGrade.js
import React, { useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import NavBar from "./NavBar";

function MatchasByGrade() {
  const { grades } = useContext(UserContext);

  return (
    <div>
      <NavBar />
      <h2>Matchas by Grade</h2>

      {grades.length === 0 ? (
        <p>No matchas found for this user.</p>
      ) : (
        grades.map((grade) => (
          <div key={grade.id}>
            <h3>{grade.grade}</h3>
            <ul>
              {grade.matchas.map((matcha) => (
                <li key={matcha.id}>
                  {matcha.name} - ${matcha.price} ({matcha.origin})
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
}

export default MatchasByGrade;

