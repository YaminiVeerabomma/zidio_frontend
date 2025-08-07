import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./Register.css";

function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "STUDENT",
  });

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!isPasswordValid(formData.password)) {
      setErrorMsg(
        "Password must be at least 12 characters with uppercase, lowercase, and special character."
      );
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8889/api/auth/register",
        formData
      );

      const token = response.data.token;
      localStorage.setItem("token", token);
      navigate("/login");
    } catch (error) {
      console.error("Registration error:", error);

      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setErrorMsg(error.response.data.message);
      } else {
        setErrorMsg("Registration failed. Please try again.");
      }
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        {errorMsg && <p className="error">{errorMsg}</p>}

        <label>Username:</label>
        <input
          type="text"
          name="username"
          required
          placeholder="Enter username"
          value={formData.username}
          onChange={handleChange}
        />

        <label>Email:</label>
        <input
          type="email"
          name="email"
          required
          placeholder="Enter email"
          value={formData.email}
          onChange={handleChange}
        />

        <label>Password:</label>
        <div className="password-container">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            required
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
          />
          <span className="eye-icon" onClick={togglePassword}>
            {showPassword ? "🙈" : "👁️"}
          </span>
        </div>

        <small className="password-note">
          * Minimum 12 characters, including uppercase, lowercase & special character.
        </small>

        <label>Role:</label>
        <select name="role" value={formData.role} onChange={handleChange}>
          <option value="STUDENT">Student</option>
          <option value="RECRUITER">Recruiter</option>
        </select>

        <button type="submit">Register</button>
      </form>

      <div className="redirect">
        <p>
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
