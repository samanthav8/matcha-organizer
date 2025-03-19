// src/components/EditMatchaForm.js
import React, { useState, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import { UserContext } from "../context/UserContext";
import "../styles/style.css"; 

function EditMatchaForm() {
  const { id } = useParams();
  const { userBrands, userGrades, updateMatcha } = useContext(UserContext);
  const navigate = useNavigate();

  // find the matcha in userBrands or userGrades
  let matcha = null;
  for (let brand of userBrands) {
    matcha = brand.matchas.find((selectedMatcha) => selectedMatcha.id.toString() === id);
    if (matcha) break;
  }
  if (!matcha) {
    for (let grade of userGrades) {
      matcha = grade.matchas.find((selectedMatcha) => selectedMatcha.id.toString() === id);
      if (matcha) break;
    }
  }

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    origin: "",
    brand_id: "",
    grade_id: "",
  });

  useEffect(() => {
    if (matcha) {
      setFormData({
        name: matcha.name,
        price: matcha.price,
        origin: matcha.origin,
        brand_id: matcha.brand_id.toString(),
        grade_id: matcha.grade_id.toString(),
      });
    }
  }, [matcha]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateMatcha(matcha.id, formData, () => {
      alert("Matcha successfully updated!");
      navigate(`/matchas/${matcha.id}`);
    });
  };

  return (
    <div>
      <NavBar />
      <div className="form-container">
        <form className="form-card" onSubmit={handleSubmit}>
          <h3 className="form-subtitle">Edit Matcha</h3>

          <div className="form-group">
            <label>Matcha Name:</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Price:</label>
            <input type="number" name="price" value={formData.price} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Origin:</label>
            <input type="text" name="origin" value={formData.origin} onChange={handleChange} required />
          </div>
{/* 
          <div className="form-group">
            <label>Brand:</label>
            <select name="brand_id" value={formData.brand_id} onChange={handleChange} required>
              {brands.map((brand) => (
                <option key={brand.id} value={brand.id}>{brand.name}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Grade:</label>
            <select name="grade_id" value={formData.grade_id} onChange={handleChange} required>
              {grades.map((grade) => (
                <option key={grade.id} value={grade.id}>{grade.grade}</option>
              ))}
            </select>
          </div> */}

          <button type="submit" className="button-small">Save Changes</button>
        </form>
      </div>
    </div>
  );
}

export default EditMatchaForm;
