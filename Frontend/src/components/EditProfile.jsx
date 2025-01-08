import React, { useState } from "react";
import Cookies from "universal-cookie";
import { useNavigate, Link } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
const cookies = new Cookies();

const EditProfile = () => {
  const navigate = useNavigate();

  const token = cookies.get("token");
  if (!token) return navigate("/login");

  const user = cookies.get('user');

  const [formData, setFormData] = useState({fullName: user.fullName, email: user.email});
  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:5000/api/documents/editProfile/${user._id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json', Authorization: `Bearer ${token}`},
        body: JSON.stringify(formData)
      })
      if(res.ok){
        alert("Profile edited successfully!");
        navigate('/profile');
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
              <h2 className="text-center mb-4">Edit Profile</h2>
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
                <div className="d-flex justify-content-end mt-4">
                    <Link to='/profile' className="btn btn-secondary me-3">Cancel</Link>
                    <button type="submit" className="btn btn-primary">Save Changes</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default EditProfile;