import React from "react";
import { useNavigate, Link } from "react-router-dom";
import Cookies from "universal-cookie";
const cookies = new Cookies();

const Header = () => {
  const navigate = useNavigate();
  const user = cookies.get('user') || null;

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          {/* Brand Logo */}
          <div className="navbar-brand" onClick={() => navigate(`${user ? '/dashboard' : '/'}`)}>
            <img
              src="https://cdn.dribbble.com/userupload/11519026/file/original-86d7471c702924275da02fc3f3c33856.png?resize=50x&vertical=center" // Replace with your logo URL
              alt="Logo"
              className="me-2"
              style={{ borderRadius: "50%" }}
            />
            DoDoc
          </div>
          
          {/* Mobile Menu Toggle */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          
          {/* Navigation Links */}
          <div className="collapse navbar-collapse" id="navbarNav">
            {user ? (
              <ul className="navbar-nav ms-auto d-flex gap-4">
                <li className="nav-item">
                  <Link to='/dashboard' className="nav-link">Home</Link>
                </li>
                <li className="nav-item">
                  <div className="d-flex">
                    <img src={user.profilePicture} className="rounded-circle bg-light" alt="profile" style={{ width: "40px", height: "40px" }} />
                    <Link className="nav-link text-light" to='/profile' >{user.fullName}</Link>
                  </div>
                </li>
              </ul>
            ) : (
              <div className="ms-auto">
                <Link className="btn btn-warning" to='/login' >Get Started</Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;