import React, { useContext, useState } from 'react';
import AppContext from '../../Context/AppContext';

import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: ''
  });

  const {register} = useContext(AppContext)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const {name,email,password} = form

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const res = await register(name, email, password);
  
      // Log the API response to see the structure
      console.log("API Response:", res);
  
      // Check if the registration was successful
      if (res?.sucess) {
        // alert("Registration successful! Please log in.");
        
        // Delay navigation to allow the alert to show
        setTimeout(() => {
          navigate("/login"); // Redirect to login after successful registration
        }, 1000); // Delay to allow the alert to be seen
      } else {
        // Log the failure message and show it in an alert
        console.log("Registration failed:", res?.message || "Unknown error");
        alert(res?.message || "Registration failed!");
      }
    } catch (error) {
      // Handle any errors during registration
      console.error("Error during registration:", error.message);
      alert("An error occurred during registration. Please try again.");
    }
   
  };
  
  
  

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100 bg-dark text-light">
      <div className="card p-4 shadow-lg" style={{ backgroundColor: "#1c1c1c", borderRadius: "1rem", width: "100%", maxWidth: "400px" }}>
        <h2 className="text-center mb-4" style={{ color: "yellow" }}>Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control bg-dark text-light border-warning"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control bg-dark text-light border-warning"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-4">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control bg-dark text-light border-warning"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>
          <button type="submit" className="btn btn-warning w-100 fw-bold">Register</button>
        </form>
      </div>
      

    </div>
    
  );
};

export default RegisterForm;
