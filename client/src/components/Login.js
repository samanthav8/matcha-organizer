import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import "../styles/style.css"; 

function Login() {
  const { handleLogin } = useContext(UserContext);
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // handle login form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    handleLogin(formData, () => navigate("/home"), setError);
  };

  return (
    <div className="form-container">
      <form className="form-card" onSubmit={handleSubmit}>
        <h2 className="form-title">‧₊˚ ⋅  𓐐𓎩 ‧₊˚ ⋅My Matcha Collection‧₊˚ ⋅  𓐐𓎩 ‧₊˚ ⋅</h2>
        <h3 className="form-subtitle">Login</h3>

        <div className="form-group">
          <label>Username:</label>
          <input type="text" name="username" value={formData.username} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Password:</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>

        <div className="form-buttons">
          <button type="submit" className="button-small">Login</button>
          <button type="button" className="button-small" onClick={() => navigate("/signup")}>Create an Account</button>
        </div>

        {error && <p className="error-text">{error}</p>}
      </form>
    </div>
  );
}

export default Login;
