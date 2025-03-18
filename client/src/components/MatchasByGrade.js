// src/components/MatchasByGrade.js
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import NavBar from "./NavBar";
import { UserContext } from "../context/UserContext";
import "../styles/style.css";

function MatchasByGrade() {
  const { userGrades } = useContext(UserContext);

  return (
    <>
      <NavBar />
      <div className="matcha-page">
         <h2 className="matcha-title">Matchas by Grade</h2>
      </div>
      {userGrades.length > 0 ? (
        <div className="matcha-list">
          {userGrades.map((grade) => (
            <div key={grade.id} className="matcha-card">
              <h3>{grade.grade}</h3>
              <ul>
                {grade.matchas.map((matcha) => (
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

export default MatchasByGrade;
