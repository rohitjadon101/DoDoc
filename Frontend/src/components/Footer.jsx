import React from "react";

const Footer = () => {
  return (
    <footer className="bg-dark text-white pt-5 pb-4">
      <div className="container text-center text-md-start">
        <div className="row text-center text-md-start">
          {/* Company Info */}
          <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3" id="about">
            <h5 className="mb-4 font-weight-bold text-warning">DoDoc</h5>
            <p>
              DoDoc is dedicated to real time collabarations of users on specific Document. 
              Let's collaborate on documents with!
            </p>
          </div>

          {/* Links */}
          <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
            <h5 className="text-uppercase mb-4 font-weight-bold text-warning">Quick Links</h5>
            <p><a href="/" className="text-white" style={{ textDecoration: "none" }}>Home</a></p>
            <p><a href="#about" className="text-white" style={{ textDecoration: "none" }}>About</a></p>
            <p><a href="#services" className="text-white" style={{ textDecoration: "none" }}>Services</a></p>
            <p><a href="#contact" className="text-white" style={{ textDecoration: "none" }}>Contact</a></p>
          </div>

          {/* Contact */}
          <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3" id="contact">
            <h5 className="text-uppercase mb-4 font-weight-bold text-warning">Contact</h5>
            <p><i className="fas fa-home me-3"></i> 123 Street, Bhopal, India</p>
            <p><i className="fas fa-envelope me-3"></i> xyz@DoDoc.com</p>
            <p><i className="fas fa-phone me-3"></i> +123 456 7890</p>
          </div>

          {/* Social Media */}
          <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
            <h5 className="text-uppercase mb-4 font-weight-bold text-warning">Follow Us</h5>
            <a href="/" className="text-white me-4"><i className="fab fa-facebook-f"></i>Facebook</a>
            <a href="/" className="text-white me-4"><i className="fab fa-twitter"></i>Twitter</a>
            <a href="/" className="text-white me-4"><i className="fab fa-instagram"></i>Instagram</a>
            <a href="/" className="text-white me-4"><i className="fab fa-linkedin"></i>LinkedIn</a>
          </div>
        </div>
      </div>
      <div className="text-center mt-3">
        <p>&copy; 2024 DoDoc. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;