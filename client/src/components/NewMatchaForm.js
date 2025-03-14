// src/components/NewMatchaForm.js
import React, { useState, useContext } from "react";
import NavBar from "./NavBar";
import { UserContext } from "../context/UserContext";

function NewMatchaForm() {
  const { user, brands, setBrands, grades, setGrades } = useContext(UserContext);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    origin: "",
    brand_id: "",
    grade_id: "",
    newBrand: "",
    newBrandWebsite: "",
    newGrade: "",
  });

  const [showNewBrandInput, setShowNewBrandInput] = useState(false);
  const [showNewGradeInput, setShowNewGradeInput] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (!user) return alert("You must be logged in to add matcha.");
  
    const matchaData = {
      name: formData.name,
      price: parseFloat(formData.price),
      origin: formData.origin,
      user_id: user.id,
      brand_id: formData.brand_id,
      grade_id: formData.grade_id,
    };
  
    fetch("/matchas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(matchaData),
      credentials: "include",
    })
      .then((res) => res.json())
      .then((newMatcha) => {
        alert("Matcha added successfully!");
  
        const updatedGrades = grades.map((grade) => {
          if (grade.id === newMatcha.grade_id) {
            return { ...grade, matchas: [...grade.matchas, newMatcha] };
          }
          return grade;
        });
  
        setGrades(updatedGrades);
  
        setFormData({ name: "", price: "", origin: "", brand_id: "", grade_id: "" });
      })
      .catch((err) => alert("Error adding matcha."));
  };
  


  const handleAddBrand = () => {
    if (!formData.newBrand || !formData.newBrandWebsite) return alert("Brand name and website required!");

    fetch("/brands", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: formData.newBrand, website: formData.newBrandWebsite }),
      credentials: "include",
    })
      .then((res) => res.json())
      .then((newBrand) => {
        setBrands([...brands, newBrand]);
        setFormData({ ...formData, brand_id: newBrand.id, newBrand: "", newBrandWebsite: "" });
        setShowNewBrandInput(false);
      })
      .catch(() => alert("Error adding brand."));
  };

  const handleAddGrade = () => {
    if (!formData.newGrade) return alert("Grade name required!");

    fetch("/grades", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ grade: formData.newGrade }),
      credentials: "include",
    })
      .then((res) => res.json())
      .then((newGrade) => {
        setGrades([...grades, newGrade]);
        setFormData({ ...formData, grade_id: newGrade.id, newGrade: "" });
        setShowNewGradeInput(false);
      })
      .catch(() => alert("Error adding grade."));
  };

  return (
    <div>
      <NavBar />
      <h2>Add New Matcha</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>

        <div>
          <label>Price:</label>
          <input type="number" name="price" value={formData.price} onChange={handleChange} required />
        </div>

        <div>
          <label>Origin:</label>
          <input type="text" name="origin" value={formData.origin} onChange={handleChange} required />
        </div>

        <div>
          <label>Brand:</label>
          <select name="brand_id" value={formData.brand_id} onChange={handleChange} required>
            <option value="">Select a brand</option>
            {brands.map((brand) => (
              <option key={brand.id} value={brand.id}>
                {brand.name}
              </option>
            ))}
            <option value="new">Add a new brand</option>
          </select>
        </div>

        {formData.brand_id === "new" && (
          <div>
            <input type="text" name="newBrand" placeholder="New Brand Name" value={formData.newBrand} onChange={handleChange} />
            <input type="text" name="newBrandWebsite" placeholder="Brand Website" value={formData.newBrandWebsite} onChange={handleChange} />
            <button type="button" onClick={handleAddBrand}>Save Brand</button>
          </div>
        )}

        <div>
          <label>Grade:</label>
          <select name="grade_id" value={formData.grade_id} onChange={handleChange} required>
            <option value="">Select a grade</option>
            {grades.map((grade) => (
              <option key={grade.id} value={grade.id}>
                {grade.grade}
              </option>
            ))}
            <option value="new">Add a new grade</option>
          </select>
        </div>

        {formData.grade_id === "new" && (
          <div>
            <input type="text" name="newGrade" placeholder="New Grade" value={formData.newGrade} onChange={handleChange} />
            <button type="button" onClick={handleAddGrade}>Save Grade</button>
          </div>
        )}

        <button type="submit">Add Matcha</button>
      </form>
    </div>
  );
}

export default NewMatchaForm;
