// src/components/Login.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login({ setUser }) {
  //navigation function to redirect
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", password: "" });
  const [error, setError] = useState("");

  //handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //handle login form submit
  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    //login request sent to backend
    fetch("/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
      //include authetication cookies
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) throw new Error(data.error);
        setUser(data);
        navigate("/home");
      })
      .catch((err) => setError(err.message));
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>
        <button type="submit">Login</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button onClick={() => navigate("/signup")}>Create an Account</button>
    </div>
  );
}

export default Login;
