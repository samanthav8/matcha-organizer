// src/components/Signup.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  // Local state for form inputs
  const [formData, setFormData] = useState({ name: "", password: "" });
  const [error, setError] = useState("");

  // Updates form data when user types
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handles signup
  const handleSignup = (e) => {
    e.preventDefault();
    setError("");

    // Send signup request to backend
    fetch("/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) return res.json().then((data) => Promise.reject(data.error));
        return res.json();
      })
      .then(() => {
        // Redirect to login after successful signup
        navigate("/login");
      })
      .catch((err) => setError(typeof err === "string" ? err : "An unexpected error occurred"));
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