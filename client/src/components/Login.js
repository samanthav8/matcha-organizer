// src/components/Login.js
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //local state for form inputs
  const [formData, setFormData] = useState({ name: "", password: "" });
  const [error, setError] = useState("");

  //updates form data when user types
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  //handles login form
  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    //POST request to login endpoint
    fetch("http://localhost:5555/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Login failed");
        }
        return res.json();
      })
      .then((data) => {
        //dispatches action to set user with returned user data
        dispatch({ type: "SET_USER", payload: data });
        //navigate to home page after login
        navigate("/home");
      })
      .catch((err) => {
        console.error("Error during login:", err);
        setError("Invalid credentials. Please try again.");
      });
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
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
        <button type="submit">Login</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div>
        <button onClick={() => navigate("/signup")}>Create an Account</button>
      </div>
    </div>
  );
}

export default Login;
