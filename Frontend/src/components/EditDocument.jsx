import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Cookies from "universal-cookie";
const cookies = new Cookies();

const EditDocument = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const referrer = location.state?.from || "/dashboard";

  const token = cookies.get("token");
  if (!token) return navigate("/login");

  const docID = cookies.get("docID");
  const [doc, setDoc] = useState(null);
  const [formData, setFormData] = useState({ title: "", content: "" });

  useEffect(() => {
    if (docID) {
      fetch(`http://localhost:5000/api/documents/getDoc/${docID}`, {
        headers: {Authorization: `Bearer ${token}`},
      })
        .then((res) => res.json())
        .then((data) => {
          setDoc(data);
          setFormData({ title: data.title, content: data.content });
        })
        .catch(() => alert("Network Error"));
    }
  }, [docID]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:5000/api/documents/editDocument/${docID}`, {
        method: "PUT",
        headers: {'Content-Type': 'application/json', Authorization: `Bearer ${token}`},
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        alert("Document edited!");
        navigate(referrer)
      } else {
        const data = await res.json();
        alert(data.message);
      }
    } catch (error) {
      alert("Network Error");
    }
  };


  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8 col-md-10">
          {/* Page Header */}
          <div className="mb-4 text-center">
            <h2 className="fw-bold text-primary">Edit Document</h2>
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
                  <Link to={referrer} className="btn btn-secondary me-3">Cancel</Link>
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
  );
};

export default EditDocument;