import React, { useState } from "react";
import axios from "axios";
import "./RecruiterForm.css";

const RecruiterForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    companyName: "",
    phone: "",
    companydiscription: "",
    companyWebsite: "",
    designation: "HR",
  });

  const [wordCount, setWordCount] = useState(0);
  const [error, setError] = useState("");

  const designations = [
    "HR",
    "HIRING_MANAGER",
    "TECHNICAL_RECRUITER",
    "TEAM_LEAD",
    "PROJECT_MANAGER",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "companydiscription") {
      // Calculate word count
      const words = value.trim().split(/\s+/).filter(Boolean);
      setWordCount(words.length);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (wordCount < 300) {
      setError("Company Description must be at least 300 words.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/api/recruiters", formData);
      alert("Recruiter registered successfully!");
      console.log(response.data);
      setFormData({
        name: "",
        email: "",
        companyName: "",
        phone: "",
        companydiscription: "",
        companyWebsite: "",
        designation: "HR",
      });
      setWordCount(0);
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error registering recruiter.");
    }
  };

  return (
    <div className="form-container">
      <h2>Recruiter Registration</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="companyName"
          placeholder="Company Name"
          value={formData.companyName}
          onChange={handleChange}
          required
        />

        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          required
        />

        <textarea
          name="companydiscription"
          placeholder="Company Description (min 300 words)"
          value={formData.companydiscription}
          onChange={handleChange}
          required
          rows={8}
        ></textarea>
        <small>{wordCount} words</small>
        {error && <p className="error">{error}</p>}

        <input
          type="url"
          name="companyWebsite"
          placeholder="Company Website"
          value={formData.companyWebsite}
          onChange={handleChange}
        />

        <select
          name="designation"
          value={formData.designation}
          onChange={handleChange}
          required
        >
          {designations.map((d) => (
            <option key={d} value={d}>
              {d.replace(/_/g, " ")}
            </option>
          ))}
        </select>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default RecruiterForm;
