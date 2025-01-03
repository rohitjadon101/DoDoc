import React from "react";

const Header = () => {
  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          {/* Brand Logo */}
          <a className="navbar-brand" href="/">
            <img
              src="https://cdn.dribbble.com/userupload/11519026/file/original-86d7471c702924275da02fc3f3c33856.png?resize=50x&vertical=center" // Replace with your logo URL
              alt="Logo"
              className="me-2"
              style={{ borderRadius: "50%" }}
            />
            DoDoc
          </a>
          
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
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link" href="/">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#about">About</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#services">Services</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#contact">Contact</a>
              </li>
            </ul>
            {/* Optional Button */}
            <div className="ms-3">
              <a className="btn btn-warning" href="/login">Get Started</a>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;