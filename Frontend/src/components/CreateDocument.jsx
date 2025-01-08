import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import Header from "./Header";
import Footer from "./Footer";
const cookies = new Cookies();

const CreateDocument = () => {
  const navigate = useNavigate();

  const token = cookies.get("token");
  if (!token) return navigate("/login");

  const user = cookies.get('user');

  const [formData, setFormData] = useState({title: '', content: ''});
  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:5000/api/documents/createDocument/${user._id}`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json', Authorization: `Bearer ${token}`},
        body: JSON.stringify(formData)
      })
      if(res.ok){
        alert("Document saved!");
        navigate('/profile')
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
        <div className="col-lg-8 col-md-10">
          {/* Page Header */}
          <div className="mb-4 text-center">
            <h2 className="fw-bold text-primary">Create New Document</h2>
            <p className="text-muted">Fill in the details below to create a new document.</p>
          </div>

          {/* Form */}
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                {/* Document Title */}
                <div className="mb-4">
                  <label htmlFor="documentTitle" className="form-label fw-bold">
                    Document Title
                  </label>
                  <input
                    value={formData.title}
                    onChange={handleChange}
                    name="title"
                    type="text"
                    id="documentTitle"
                    className="form-control"
                    placeholder="Enter document title"
                  />
                </div>

                {/* Document Content */}
                <div className="mb-4">
                  <label htmlFor="documentContent" className="form-label fw-bold">
                    Document Content
                  </label>
                  <textarea
                    value={formData.content}
                    onChange={handleChange}
                    name="content"
                    id="documentContent"
                    className="form-control"
                    rows="10"
                    placeholder="Start typing your document here..."
                  ></textarea>
                </div>

                {/* Action Buttons */}
                <div className="d-flex justify-content-end mt-4">
                  <Link to='/profile' className="btn btn-secondary me-3">Cancel</Link>
                  <button type="submit" className="btn btn-primary">
                    Save Document
                  </button>
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

export default CreateDocument;