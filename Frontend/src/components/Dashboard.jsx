import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import Header from "./Header";
import Footer from "./Footer";
const cookies = new Cookies();
const backendUrl = import.meta.env.VITE_BACKEND_URL;

const Dashboard = () => {
  const navigate = useNavigate();

  const token = cookies.get("token");
  if (!token) return navigate("/login");

  const user = cookies.get('user') || null;

  const [allDocs, setAllDocs] = useState([]);
  useEffect(() => {
    if(user){
      fetch(`${backendUrl}/api/documents/getAllDocuments`, {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then((res) => res.json())
      .then((data) => setAllDocs(data))
      .catch(() => alert("Network Error:"))
    }
  }, [user])

  return (
    <>
    <Header />
    <main className="bg-light py-5 px-5 min-vh-100">
        <div>
            <h2 className="mb-4 text-secondary">All Documents</h2>
            <div className="row">
            {allDocs.length > 0 ? (
                allDocs.map((doc) => (
                <div className="col-sm-6 col-md-4 col-lg-3 mb-4" key={doc._id}>
                    <div className="card shadow-sm border-1">
                    <div className="card-body">
                        <h5 className="card-title fw-bold text-primary">{doc.title}</h5>
                        <p className="badge bg-light text-secondary small">
                        Created on : {new Date(doc.createdAt).toLocaleDateString()}
                        </p>
                        <div className="d-flex gap-2 mt-3">
                        <button onClick={() => {
                            cookies.set('docID', doc._id)
                            navigate('/viewDoc', {state: {from: '/dashboard'}})
                        }} className="btn btn-outline-primary btn-sm">Open</button>

                        <button onClick={() => {
                            cookies.set('docID', doc._id)
                            navigate('/editDoc', {state: {from: '/dashboard'}})
                        }} className="btn btn-outline-secondary btn-sm">Edit</button>
                        </div>
                    </div>
                    </div>
                </div>
                ))
            ) : (<div>No Documents are available</div>)}
            </div>
        </div>
    </main>
    <Footer />
    </>
  );
};

export default Dashboard;