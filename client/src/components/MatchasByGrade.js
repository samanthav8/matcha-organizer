// src/components/MatchasByGrade.js
import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import NavBar from "./NavBar";

function MatchasByGrade() {
  const { userGrades } = useContext(UserContext);

  return (
    <div>
      <NavBar />
      <h2>Matchas by Grade</h2>

      {userGrades.length === 0 ? (
        <p>No matchas found for this user.</p>
      ) : (
        userGrades.map((grade) => (
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
