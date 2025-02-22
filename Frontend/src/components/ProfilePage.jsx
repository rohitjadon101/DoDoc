import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Cookies from "universal-cookie";
import Footer from "./Footer";
import Header from "./Header";
const cookies = new Cookies();
const backendUrl = import.meta.env.VITE_BACKEND_URL;

const ProfilePage = () => {
  const navigate = useNavigate();

  const token = cookies.get("token");
  if (!token) return navigate("/login");

  const user = cookies.get("user");

  const [allDocs, setAllDocs] = useState([]);
  useEffect(() => {
    fetch(`${backendUrl}/api/documents/getUserDocs/${user._id}`, {
      headers: {Authorization: `Bearer ${token}`},
    })
      .then((res) => res.json())
      .then((data) => setAllDocs(data))
      .catch(() => alert("Network Error:"));
  });

  const handleDelete = (docID) => {
    fetch(`${backendUrl}/api/documents/deleteDoc/${docID}`, {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json', Authorization: `Bearer ${token}`},
    })
    .then((res) => {
      if(res.ok){
        alert("Document deleted!")
      }
      else{
        alert("something went wrong")
      }
    })
    .catch(() => alert("Network Error:"));
  }

  return (
    <>
    <Header />
    <div className="container py-5">
      {/* User Information */}
      <div className="d-flex flex-column align-items-center mb-4">
        <img
          src={user.profilePicture}
          alt="Avatar"
          className="rounded-circle mb-3 shadow-lg"
          style={{ width: "100px", height: "100px" }}
        />
        <h3 className="fw-bold text-primary">{user.fullName}</h3>
        <p className="text-muted mb-3">{user.email}</p>
        <div className="d-flex gap-2">
          <Link to='/editProfile' className="btn btn-outline-primary">Edit Profile</Link>
          <button className="btn btn-outline-danger" onClick={() => {
            alert('logged out Successfully!')
            cookies.remove('token');
            cookies.remove('user');
            navigate('/');
          }}>
            <i className="bi bi-box-arrow-right"></i> Logout
          </button>
        </div>
      </div>

      <hr />

      {/* Documents Section */}
      <div>
        <div className="d-flex gap-4 align-items-center mb-4">
          <h2 className="text-secondary">Your Documents</h2>
          <Link to="/createDoc" className="btn btn-success">
            <i className="bi bi-plus-lg"></i>+ New
          </Link>
        </div>
        <div className="row g-4">
          {allDocs.length > 0 ? (
            allDocs.map((doc) => (
              <div className="col-sm-6 col-md-4 col-lg-3" key={doc._id}>
                <div className="card shadow-sm border-0 h-100">
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title text-primary fw-bold">{doc.title}</h5>
                    <p className="text-muted small">
                      <i className="bi bi-clock"></i> Created on {new Date(doc.createdAt).toLocaleDateString()}
                    </p>
                    <div className="mt-auto d-flex justify-content-between">
                      <button
                        onClick={() => {
                          cookies.set('docID', doc._id);
                          navigate("/viewDoc", {state: {from: '/profile'}});
                        }}
                        className="btn btn-outline-primary btn-sm"
                      >
                        Open
                      </button>
                      <div className="d-flex gap-2">
                        <button className="btn btn-outline-secondary btn-sm" onClick={() => {
                          cookies.set('docID', doc._id)
                          navigate('/editDoc', { state: { from: "/profile" } })
                        }}>
                          Edit
                        </button>
                        <button className="btn btn-outline-danger btn-sm" onClick={() => handleDelete(doc._id)}>
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-muted">No documents available.</div>
          )}
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default ProfilePage;