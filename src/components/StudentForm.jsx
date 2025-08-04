import React, { useState } from "react";
import axios from "axios";
import "./StudentForm.css";

const StudentForm = () => {
  const [student, setStudent] = useState({
    name: "",
    email: "",
    phone: "",
    qualification: "",
    gender: "MALE",
    graduationYear: "",
    skills: [],
    experienceLevel: "FRESHER",
    resumeURL: "",
    githubURL: "",
    linkdenURL: "",
    preferredJobLocations: [],
    expectedSalary: "",
    noticePeriod: "IMMEDIATE",
  });

  const [skillInput, setSkillInput] = useState("");
  const [locationInput, setLocationInput] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent({ ...student, [name]: value });
  };

  const addSkill = () => {
    const trimmed = skillInput.trim();
    if (trimmed && !student.skills.includes(trimmed)) {
      setStudent({ ...student, skills: [...student.skills, trimmed] });
      setSkillInput("");
    }
  };

  const removeSkill = (index) => {
    setStudent({
      ...student,
      skills: student.skills.filter((_, i) => i !== index),
    });
  };

  const addLocation = () => {
    if (locationInput && !student.preferredJobLocations.includes(locationInput)) {
      setStudent({
        ...student,
        preferredJobLocations: [...student.preferredJobLocations, locationInput],
      });
      setLocationInput("");
    }
  };

  const removeLocation = (index) => {
    setStudent({
      ...student,
      preferredJobLocations: student.preferredJobLocations.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...student,
      graduationYear: new Date(student.graduationYear),
    };

    try {
      await axios.post("http://localhost:8080/api/students", payload);
      alert("Student Registered Successfully!");
    } catch (err) {
      console.error(err);
      alert("Error registering student.");
    }
  };

  return (
    <form className="student-form" onSubmit={handleSubmit}>
      <h2>Student Registration</h2>

      <input type="text" name="name" placeholder="Name" value={student.name} onChange={handleChange} required />
      <input type="email" name="email" placeholder="Email" value={student.email} onChange={handleChange} required />
      <input type="text" name="phone" placeholder="Phone" value={student.phone} onChange={handleChange} required />
      <input type="text" name="qualification" placeholder="Qualification" value={student.qualification} onChange={handleChange} />

      <label>Gender:</label>
      <select name="gender" value={student.gender} onChange={handleChange}>
        <option value="MALE">Male</option>
        <option value="FEMALE">Female</option>
        <option value="OTHER">Other</option>
      </select>

      <label>Graduation Year:</label>
      <input type="date" name="graduationYear" value={student.graduationYear} onChange={handleChange} />

      <label>Skills:</label>
      <div className="tag-input">
        <input type="text" placeholder="Add Skill" value={skillInput} onChange={(e) => setSkillInput(e.target.value)} />
        <button type="button" onClick={addSkill}>Add</button>
        <div className="tags">
          {student.skills.map((skill, i) => (
            <span key={i} onClick={() => removeSkill(i)}>{skill} ❌</span>
          ))}
        </div>
      </div>

      <label>Experience Level:</label>
      <select name="experienceLevel" value={student.experienceLevel} onChange={handleChange}>
        <option value="FRESHER">Fresher</option>
        <option value="INTERMEDIATE">Intermediate</option>
        <option value="EXPERIENCED">Experienced</option>
      </select>

      <input type="text" name="resumeURL" placeholder="Resume URL" value={student.resumeURL} onChange={handleChange} />
      <input type="text" name="githubURL" placeholder="GitHub URL" value={student.githubURL} onChange={handleChange} />
      <input type="text" name="linkdenURL" placeholder="LinkedIn URL" value={student.linkdenURL} onChange={handleChange} />

      <label>Preferred Locations:</label>
      <div className="tag-input">
        <select value={locationInput} onChange={(e) => setLocationInput(e.target.value)}>
          <option value="">Select Location</option>
          <option value="HYDERABAD">Hyderabad</option>
          <option value="BANGALORE">Bangalore</option>
          <option value="CHENNAI">Chennai</option>
          <option value="MUMBAI">Mumbai</option>
          <option value="DELHI">Delhi</option>
          <option value="PUNE">Pune</option>
        </select>
        <button type="button" onClick={addLocation}>Add</button>
        <div className="tags">
          {student.preferredJobLocations.map((loc, i) => (
            <span key={i} onClick={() => removeLocation(i)}>{loc} ❌</span>
          ))}
        </div>
      </div>

      <input type="number" name="expectedSalary" placeholder="Expected Salary" value={student.expectedSalary} onChange={handleChange} />

      <label>Notice Period:</label>
      <select name="noticePeriod" value={student.noticePeriod} onChange={handleChange}>
        <option value="IMMEDIATE">Immediate</option>
        <option value="ONE_MONTH">1 Month</option>
        <option value="TWO_MONTHS">2 Months</option>
        <option value="THREE_MONTHS">3 Months</option>
      </select>

      <button type="submit">Submit</button>
    </form>
  );
};

export default StudentForm;
