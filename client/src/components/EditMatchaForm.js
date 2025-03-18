// src/components/EditMatchaForm.js
import React from "react";
import NavBar from "./NavBar";
import "../styles/style.css"; 

function EditMatchaForm() {
  return (
    <div>
      <NavBar />
      <div className="form-container">
        <form className="form-card">
          <h3 className="form-subtitle">‧₊˚ ⋅ 𓐐𓎩 ‧₊˚ ⋅ Edit Matcha ‧₊˚ ⋅ 𓐐𓎩 ‧₊˚ ⋅</h3>

          <div className="form-group">
            <label>Matcha Name:</label>
            <input type="text" name="name" required />
          </div>

          <div className="form-group">
            <label>Price:</label>
            <input type="number" name="price" required />
          </div>

          <div className="form-group">
            <label>Origin:</label>
            <input type="text" name="origin" required />
          </div>

          <div className="form-group">
            <label>Brand:</label>
            <select name="brand_id" required>
              <option value="">Select a brand</option>
            </select>
          </div>

          <div className="form-group">
            <label>Grade:</label>
            <select name="grade_id" required>
              <option value="">Select a grade</option>
            </select>
          </div>

          <div className="form-buttons">
            <button type="submit" className="button-small">Save Changes</button>
            <button type="button" className="button-small">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditMatchaForm;
