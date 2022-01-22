import React, { useEffect } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

import { statusLog } from '../../store/actionCreator/status'

import "./Navbar.css";

const Navbar = ({ navbarLinks }) => {

  const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  const height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

  const navigate = useNavigate();
  const dispatch = useDispatch()

  useEffect(() => {
    document.addEventListener('scroll', function() {
      if (window.pageYOffset < (height - 10)) {
          document.getElementById('navigate').classList.remove("position-fixed");
      } else {
          document.getElementById('navigate').classList.add("position-fixed");
      }
    });

  }, [])

  const tryLogout = () => {
    dispatch(statusLog())
    localStorage.clear();
    navigate('/login')
}

  return (
    <nav id="navigate" className="navigation-fixed">
      <ul className="justify-content-md-center d-flex">
          <li className=""><Link to="/">Forsythia</Link></li>
          <li><a href="#">About</a></li>
          <li><a href="#">Services</a></li>
          <li><a href="#">Team</a></li>
          <li><a href="#">Contact</a></li>
          {
            localStorage.getItem(`access_token`) ? 

            <li><Link to="/account">Account</Link></li>
            // <li><a href="" onClick={tryLogout}>Logout</a></li>

            :
            <li><Link to="/login">Login</Link></li>
          }
          
      </ul>
    </nav>
  );
};

export default Navbar;
