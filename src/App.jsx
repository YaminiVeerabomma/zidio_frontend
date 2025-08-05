// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import StudentForm from "./components/StudentForm"; 
import RecruiterForm from "./components/RecruiterForm";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/student" element={<StudentForm />} /> 
        <Route path="/recruiter" element={<RecruiterForm />} />
    </Routes>
  );
}

export default App;
