import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Cookies from "universal-cookie";
const cookies = new Cookies();

const ProfilePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = cookies.get('token');
    if(!token) return navigate('/login');
  })
  const user = cookies.get('user');

  const [allDocs, setAllDocs] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:5000/api/documents/getAllDocuments`)
    .then((res) => res.json())
    .then((data) => setAllDocs(data))
    .catch(() => alert("Network Error:"))
  })

  return (
    <div className="container py-5">
      {/* User Information */}
      <div className="row">
        <div className="col-md-4 text-center">
          <img
            src="https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"
            alt="Avatar"
            className="rounded-circle mb-3 w-25"
          />
          <h3>{user.name}</h3>
          <p className="text-muted">{user.email}</p>
          <button className="btn btn-primary">Edit Profile</button>
        </div>

        {/* Recent Documents */}
        <div className="col-md-8">
          <h2 className="mb-4 text-secondary">Recent Documents</h2>
          {allDocs.length > 0 ? (
            <ul className="list-group">
              {allDocs.map((doc) => (
                <li
                  key={doc._id}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  <span>{doc.title}</span>
                  <small className="text-muted">
                    Last modified: {doc.createdAt}
                  </small>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted">No recent documents available.</p>
          )}

          {/* Button to Create New Document */}
          <div className="mt-4">
            <Link to='/createDoc' className="btn btn-success btn-lg">+ Create New Document</Link>
          </div>
        </div>
      </div>
        
      <hr />
      <div className="mt-4 ">
        <h2 className="mb-4 text-secondary">All Documents</h2>
        <div className="row">
          {allDocs.map((doc) => (
            <div className="col-sm-6 col-md-4 col-lg-3 mb-4" key={doc._id}>
              <div className="card shadow-sm border-1">
                <div className="card-body">
                  <h5 className="card-title fw-bold text-primary">{doc.title}</h5>
                  <p className="badge bg-light text-secondary small">
                    Last updated on 28/12/2024
                  </p>
                  <div className="d-flex justify-content-between mt-3">
                    <button onClick={() => {
                      cookies.set('docID', doc._id)
                      navigate('/viewDoc')
                    }} className="btn btn-outline-primary btn-sm">Open</button>
                    <div>
                      <a href="#" className="btn btn-outline-secondary btn-sm me-2">Edit</a>
                      <a href="#" className="btn btn-outline-danger btn-sm">Delete</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
};

export default ProfilePage;