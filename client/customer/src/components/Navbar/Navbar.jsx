import React, { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import "./Navbar.css";

const Navbar = ({ navbarLinks }) => {
  const [menuClicked, setMenuClicked] = useState(false);

  const toggleMenu = () => {
    setMenuClicked(!menuClicked);
  };

  return (
    <nav className="navbar">
      <span className="navbar__logo">travell</span>
      {menuClicked ? (
        <FiX size={25} className={"navbar__menu"} onClick={toggleMenu} />
      ) : (
        <FiMenu
          size={25}
          className={"navbar__menu"}
          onClick={toggleMenu}
        />
      )}
      <ul
        className={
          menuClicked ? "navbar__list navbar__list--active" : "navbar__list"
        }
      >
        {navbarLinks.map((item, index) => {
          return (
            <li className="navbar__item" key={index}>
              <a className="navbar__link" href={item.url}>
                {item.title}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Navbar;
