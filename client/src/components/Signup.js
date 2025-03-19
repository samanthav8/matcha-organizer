import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import "../styles/style.css"; 

function Signup() {
  const { handleSignup } = useContext(UserContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  // validation function for password
  const validatePassword = (password) => {
    if (password.length < 6) {
      return "Password must be at least 6 characters long";
    }
    if (!/[A-Z]/.test(password)) {
      return "Password must contain at least one uppercase letter";
    }
    if (!/[a-z]/.test(password)) {
      return "Password must contain at least one lowercase letter";
    }
    if (!/\d/.test(password)) {
      return "Password must contain at least one number";
    }
    return "";
  };


  //update form data
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "password") {
      setError(validatePassword(value));
    }
  };

  //handles signup redirects to login
  const handleSubmit = (e) => {
    e.preventDefault();
    const passwordError = validatePassword(formData.password);
    if (passwordError) {
      setError(passwordError);
      return;
    }
    setError("");

    handleSignup(formData, () => {
      alert("User created successfully! Please login.");
      navigate("/login");
    }, setError);
  };


  return (
    <div className="form-container">
      <form className="form-card" onSubmit={handleSubmit}>
        <h2 className="form-title">My Matcha Collection</h2>
        <h3 className="form-subtitle">Create an Account</h3>

        <div className="form-group">
          <label>Username:</label>
          <input type="text" name="username" value={formData.username} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Password:</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>

        <div className="form-buttons">
          <button type="submit" className="button-small">Sign Up</button>
          <button type="button" className="button-small" onClick={() => navigate("/login")}>Back to Login</button>
        </div>

        {error && <p className="error-text">{error}</p>}
      </form>
    </div>
  );

}

export default Signup;
