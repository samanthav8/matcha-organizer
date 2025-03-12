// src/components/Signup.js
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //local state for form inputs
  const [formData, setFormData] = useState({ name: "", password: "" });
  const [error, setError] = useState("");

  //updates form data when user types
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //handles signup
  const handleSignup = (e) => {
    e.preventDefault();
    setError("");

    //POST request to users to create new user
    fetch("http://localhost:5555/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Signup failed");
        }
        return res.json();
      })
      .then((data) => {
        //dispatch action to automatically sign user in
        dispatch({ type: "SET_USER", payload: data });
        //navigate to home after signing up
        navigate("/home");
      })
      .catch((err) => {
        console.error("Error during signup:", err);
        setError("Signup failed. Please try again.");
      });
  };

  return (
    <div>
      <h2>Create an Account</h2>
      <form onSubmit={handleSignup}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div>
        <button onClick={() => navigate("/login")}>Back to Login</button>
      </div>
    </div>
  );
}

export default Signup;