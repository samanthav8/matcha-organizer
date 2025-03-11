// src/components/NewMatchaForm.js
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function NewMatchaForm() {
  const navigate = useNavigate();

  const user = useSelector((state) => state.userData.user);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    origin: "",
    brand_id: "",
    grade_id: "",
  });

  const [brands, setBrands] = useState([]);
  const [grades, setGrades] = useState([]);



  useEffect(() => {
    fetch("http://127.0.0.1:5555/brands")
      .then((res) => res.json())
      .then((data) => {
        setBrands(data);
      })
      .catch((err) => console.error("Error fetching brands:", err));

    fetch("http://127.0.0.1:5555/grades")
      .then((res) => res.json())
      .then((data) => {
        setGrades(data);
      })
      .catch((err) => console.error("Error fetching grades:", err));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const dataToSend = { ...formData, user_id: user.id };

    fetch("http://127.0.0.1:5555/matchas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dataToSend),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error creating matcha");
        }
        return res.json();
      })
      .then((data) => {
        navigate("/home");
      })
      .catch((err) => {
        console.error("Error during matcha creation:", err);
      });
  };

  return (
    <div>
      <h2>Add New Matcha</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Matcha Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Price:</label>
          <input
            type="number"
            step="any"
            name="price"
            value={formData.price}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Origin:</label>
          <input
            type="text"
            name="origin"
            value={formData.origin}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Brand:</label>
          <select
            name="brand_id"
            value={formData.brand_id}
            onChange={handleChange}
          >
            <option value="">Select a Brand</option>
            {brands.map((brand) => (
              <option key={brand.id} value={brand.id}>
                {brand.name}
              </option>
            ))}
          </select>
          <button type="button" onClick={() => navigate("/brands/new")}>
            Add New Brand
          </button>
        </div>
        <div>
          <label>Grade:</label>
          <select
            name="grade_id"
            value={formData.grade_id}
            onChange={handleChange}
          >
            <option value="">Select a Grade</option>
            {grades.map((grade) => (
              <option key={grade.id} value={grade.id}>
                {grade.grade}
              </option>
            ))}
          </select>
          <button type="button" onClick={() => navigate("/grades/new")}>
            Add New Grade
          </button>
        </div>
        <button type="submit">Add Matcha</button>
      </form>
    </div>
  );
}

export default NewMatchaForm;
