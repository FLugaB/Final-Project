import React, { useEffect } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { Link } from 'react-router-dom'
import "./Navbar.css";

const Navbar = ({ navbarLinks }) => {

  const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  const height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

  useEffect(() => {
    document.addEventListener('scroll', function() {
      if (window.pageYOffset < (height - 10)) {
          document.getElementById('navigate').classList.remove("position-fixed");
      } else {
          document.getElementById('navigate').classList.add("position-fixed");
      }
    });

  }, [])

  return (
    <nav id="navigate" className="navigation-fixed">
      <ul className="justify-content-md-center d-flex">
          <li className=""><Link to="/">Forsythia</Link></li>
          <li><a href="#">About</a></li>
          <li><a href="#">Services</a></li>
          <li><a href="#">Team</a></li>
          <li><a href="#">Contact</a></li>
          <li><Link to="/login">Login</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
