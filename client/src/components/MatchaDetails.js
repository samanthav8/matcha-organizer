import React, { useContext } from "react";
import { useParams,useNavigate } from "react-router-dom";
import "../styles/style.css"; 
import NavBar from "./NavBar";
import { UserContext } from "../context/UserContext";

function MatchaDetails() {
  const { id } = useParams();
  const { userBrands, userGrades } = useContext(UserContext);
  const navigate = useNavigate();


  // set matcha to null
  let matcha = null;
  //look for matcha within brands
  for (let brand of userBrands) {
    matcha = brand.matchas.find((selectedMatcha) => selectedMatcha.id.toString() === id);
    if (matcha) break;
  }

  // if not found in userbrands try usergrades
  if (!matcha) {
    for (let grade of userGrades) {
      matcha = grade.matchas.find((selectedMatcha) => selectedMatcha.id.toString() === id);
      if (matcha) break;
    }
  }
  //return error if no matcha is found
  if (!matcha) return <p className="error">Matcha not found</p>;
  return (
    <div>
      <NavBar />
      <div className="matcha-details-container">
        <div className="matcha-details-card">
          <p className="matcha-details-text"> ˖⊹ ࣪ 🍵 ˖⊹ ࣪ ˖ ˖⊹ ࣪ 🍵 ˖⊹ ࣪ ˖ ˖⊹ ࣪ 🍵 ˖⊹ ࣪ ˖ ˖⊹ ࣪ 🍵 ˖⊹ ࣪ ˖</p>
          <h2 className="matcha-details-title">{matcha.name}</h2>
          <p className="matcha-details-text"><strong>Price:</strong> ${matcha.price}</p>
          <p className="matcha-details-text"><strong>Origin:</strong> {matcha.origin}</p>
          <p className="matcha-details-text"> ˖⊹ ࣪ 🍵 ˖⊹ ࣪ ˖ ˖⊹ ࣪ 🍵 ˖⊹ ࣪ ˖ ˖⊹ ࣪ 🍵 ˖⊹ ࣪ ˖ ˖⊹ ࣪ 🍵 ˖⊹ ࣪ ˖</p>
          <button className="button-small" onClick={() => navigate(`/matchas/${matcha.id}/edit`)}>
          Edit Matcha
        </button>
        </div>
      </div>
    </div>
  );
}

export default MatchaDetails;
