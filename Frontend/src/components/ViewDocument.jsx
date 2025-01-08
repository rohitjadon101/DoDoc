import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import Cookies from "universal-cookie";
import Header from "./Header";
import Footer from "./Footer";
const cookies = new Cookies();

const ViewDocument = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const referrer = location.state?.from || "/dashboard";

  const token = cookies.get("token");
  if (!token) return navigate("/login");

  const [doc, setDoc] = useState(null);
  const docID = cookies.get('docID');
  
  useEffect(() => {
    if (docID) {
      fetch(`http://localhost:5000/api/documents/getDoc/${docID}`,{
        headers: {Authorization: `Bearer ${token}`},
      })
      .then((res) => {
          if (!res.ok) throw new Error('Failed to fetch place');
          return res.json();
      })
      .then((data) => setDoc(data))
      .catch((error) => console.error("Error fetching data:", error));
    }
}, [docID]);

  return (
    <>
    <Header />
    <div className="container py-5 min-vh-100">
    {doc && <div>
      {/* Document Header */}
      <div className="row mb-4">
        <div className="col">
          <div className="d-flex justify-content-between align-items-center">
            <h1 className="fw-bold text-primary">{doc.title}</h1>
            <div>
              <Link to={referrer} className="btn btn-secondary me-2">Back to List</Link>
              <button className="btn btn-warning me-2" onClick={() => {
                navigate('/editDoc', {state: {from: '/viewDoc'}})
              }}>Edit</button>
            </div>
          </div>
          <p className="text-muted fs-6">Created on {new Date(doc.createdAt).toLocaleDateString()}</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="row">
        <div className="col">
          <div className="card shadow-lg border-0 mb-4">
            <div className="card-body p-4">
              <p className="text-dark fs-5 lh-lg">{doc.content}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    }
    </div>
    <Footer />
    </>
  );
};

export default ViewDocument;