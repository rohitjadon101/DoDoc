import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

const RegisterPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({fullName: '', email: '', password: ''});
  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${backendUrl}/api/documents/register`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(formData)
      })
      if(res.ok){
        alert("user registered successfully!");
        navigate('/login');
      }
      else{
        const data = await res.json();
        alert(data.message);
      }
    } catch (error) {
      alert('Network Error:');
    }
  }

  return (
    <>
    <Header />
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body">
              <h2 className="text-center mb-4">Create an Account</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Full Name</label>
                  <input
                    value={formData.fullName}
                    onChange={handleChange}
                    name="fullName"
                    type="text"
                    id="name"
                    className="form-control"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email Address</label>
                  <input
                    value={formData.email}
                    onChange={handleChange}
                    name="email"
                    type="email"
                    id="email"
                    className="form-control"
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input
                    value={formData.password}
                    onChange={handleChange}
                    name="password"
                    type="password"
                    id="password"
                    className="form-control"
                    placeholder="Enter a password"
                    required
                  />
                </div>
                <div className="d-grid">
                  <button type="submit" className="btn btn-primary">Register</button>
                </div>
              </form>
              <p className="text-center mt-3">
                Already have an account? <p onClick={() => navigate('/login')}>Login here</p>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default RegisterPage;