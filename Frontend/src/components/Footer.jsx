import React from "react";
import { LuInstagram } from "react-icons/lu";
import { FaMeta, FaXTwitter  } from "react-icons/fa6";
import { FaLinkedinIn, FaGithub  } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-3">
    <ul className="nav justify-content-center border-bottom pb-3 mb-3">
      <li className="nav-item"><a href="#" className="nav-link px-2"><LuInstagram /></a></li>
      <li className="nav-item"><a href="#" className="nav-link px-2"><FaMeta /></a></li>
      <li className="nav-item"><a href="#" className="nav-link px-2"><FaLinkedinIn /></a></li>
      <li className="nav-item"><a href="#" className="nav-link px-2"><FaGithub /></a></li>
      <li className="nav-item"><a href="#" className="nav-link px-2"><FaXTwitter /></a></li>
    </ul>
    <div>
      <h5 className="font-weight-bold text-warning text-center">DoDoc</h5>
      <p className="text-center">
        DoDoc is dedicated to real time collabarations of users on specific Document.
        Let's collaborate on documents with!
      </p>
    </div>
    <p className="text-center text-secondary">All Rights Reserved ©2025</p>
  </footer>
  );
};

export default Footer;