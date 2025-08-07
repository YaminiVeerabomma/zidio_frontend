import React, { useState } from "react";
import axios from "axios";

import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const isPasswordValid = (password) => {
    const minLength = /.{12,}/;
    const uppercase = /[A-Z]/;
    const lowercase = /[a-z]/;
    const specialChar = /[!@#$%^&*(),.?":{}|<>]/;
    return (
      minLength.test(password) &&
      uppercase.test(password) &&
      lowercase.test(password) &&
      specialChar.test(password)
    );
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!isPasswordValid(password)) {
      setErrorMsg(
        "Password must be at least 12 characters and include uppercase, lowercase, and special character"
      );
      return;
    }

    try {
      const response = await axios.post("http://localhost:8889/api/auth/login", {
        email,
        password,
      })

      const token = response.data.token;
      localStorage.setItem("token", token);

      navigate("/dashboard"); // or your redirect path
    } catch (error) {
      setErrorMsg("Invalid email or password");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        {errorMsg && <p className="error">{errorMsg}</p>}
        <label>Email:</label>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Password:</label>
        <div className="password-container">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <span className="eye-icon" onClick={togglePassword}>
            {showPassword ? "🙈" : "👁️"}
          </span>
        </div>

        <small className="password-note">
          * Minimum 12 characters, with uppercase, lowercase & special character.
        </small>

        <button type="submit">Login</button>
      </form>

      <div className="redirect">
        <p>Don't have an account? <Link to="/register">Register here</Link></p>
      </div>
    </div>
  );
}

export default Login;