import React, { useState, useContext } from 'react'
import AppContext from '../../Context/AppContext'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' })
  const navigate = useNavigate()

  // Get the login function from context
  const { login } = useContext(AppContext)
  

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }
const{email,password} = form
const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const res = await login(email, password);
      console.log(res);  // Log the response for debugging
  
      if (res?.sucess) {
        // First show the success alert
        // alert(res.message);
  
        // Then navigate to the home page
        setTimeout(() => {
          navigate("/");  // Redirect after a short delay
        }, 1000);  // Delay to allow the alert to be seen
      } else {
        alert("Login failed: " + res.message);  // Handle unsuccessful login
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("An error occurred during login.");
    }
  };
  
  return (
    <div className="container d-flex justify-content-center align-items-center vh-100 bg-dark text-light">
      <div className="card p-4 shadow-lg" style={{ backgroundColor: "#1c1c1c", borderRadius: "1rem", width: "100%", maxWidth: "400px" }}>
        <h2 className="text-center mb-4" style={{ color: "yellow" }}>Login</h2>
        <form onSubmit={handleSubmit}>
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
          <button type="submit" className="btn btn-warning w-100 fw-bold">Login</button>
        </form>
      </div>
    </div>
  )
}

export default Login
